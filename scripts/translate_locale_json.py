import argparse
import json
import re
from pathlib import Path

from deep_translator import GoogleTranslator


ROOT = Path(__file__).resolve().parents[1]
LOCALES_DIR = ROOT / "lib" / "i18n" / "locales"

SKIP_VALUES = {
    "Pomerol International",
    "Pomerol International Trading (Zhuhai) Co., Ltd",
    "Nicole Fan",
    "+86 13923387986",
    "13923387986@163.com",
    "tel:+8613923387986",
    "mailto:13923387986@163.com",
}

MARKER_TEMPLATE = "@@IDX{index:04d}@@"
MARKER_REGEX = re.compile(r"@@IDX(\d{4})@@")
MAX_PAYLOAD_CHARS = 4500


def should_skip(value: str):
    return (
        value in SKIP_VALUES
        or value.startswith("/")
        or value.startswith("tel:")
        or value.startswith("mailto:")
    )


def collect_targets(source, target, path=(), out=None, page_prefix=None):
    if out is None:
        out = []

    joined_path = ".".join(map(str, path))

    if page_prefix and joined_path and not (
        joined_path == page_prefix or joined_path.startswith(f"{page_prefix}.")
    ):
        if not page_prefix.startswith(joined_path):
            return out

    if isinstance(source, str) and isinstance(target, str):
        if source == target and not should_skip(source):
            out.append((path, source))
        return out

    if isinstance(source, list) and isinstance(target, list):
        for index, (source_item, target_item) in enumerate(zip(source, target)):
            collect_targets(source_item, target_item, path + (index,), out, page_prefix)
        return out

    if isinstance(source, dict) and isinstance(target, dict):
        for key in source.keys():
            collect_targets(source[key], target.get(key), path + (key,), out, page_prefix)
        return out

    return out


def assign_value(obj, path, value):
    current = obj
    for key in path[:-1]:
        current = current[key]
    current[path[-1]] = value


def split_translated_payload(payload: str, expected_count: int):
    matches = list(MARKER_REGEX.finditer(payload))
    if len(matches) != expected_count:
        return None

    results = {}
    for index, match in enumerate(matches):
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(payload)
        results[int(match.group(1))] = payload[start:end].strip()

    if len(results) != expected_count:
        return None

    return [results[index] for index in range(expected_count)]


def translate_batch(translator: GoogleTranslator, texts):
    payload = "\n".join(f"{MARKER_TEMPLATE.format(index=index)} {text}" for index, text in enumerate(texts))
    translated_payload = translator.translate(payload)
    parsed = split_translated_payload(translated_payload, len(texts))

    if parsed and all(item for item in parsed):
        return parsed

    return [translator.translate(text) for text in texts]


def make_batches(targets, max_count):
    batches = []
    current = []
    current_chars = 0

    for path, text in targets:
        marker = MARKER_TEMPLATE.format(index=len(current))
        item_chars = len(marker) + len(text) + 2

        if current and (len(current) >= max_count or current_chars + item_chars > MAX_PAYLOAD_CHARS):
            batches.append(current)
            current = []
            current_chars = 0
            marker = MARKER_TEMPLATE.format(index=len(current))
            item_chars = len(marker) + len(text) + 2

        current.append((path, text))
        current_chars += item_chars

    if current:
        batches.append(current)

    return batches


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("locale", choices=["es", "pt", "ru"])
    parser.add_argument("--page-prefix", help="Only translate one subtree, e.g. pages.about")
    parser.add_argument("--chunk-size", type=int, default=40)
    args = parser.parse_args()

    source = json.loads((LOCALES_DIR / "en.json").read_text(encoding="utf-8"))
    target_path = LOCALES_DIR / f"{args.locale}.json"
    target = json.loads(target_path.read_text(encoding="utf-8"))

    targets = collect_targets(source, target, page_prefix=args.page_prefix)
    if not targets:
        print("No untranslated strings found.")
        return

    translator = GoogleTranslator(source="en", target=args.locale)

    processed = 0
    for batch in make_batches(targets, args.chunk_size):
        translated_values = translate_batch(translator, [value for _, value in batch])
        for (path, _), translated in zip(batch, translated_values):
            assign_value(target, path, translated)
        processed += len(batch)
        print(f"{args.locale}: {processed}/{len(targets)}")

    target["locale"] = args.locale
    target_path.write_text(f"{json.dumps(target, ensure_ascii=False, indent=2)}\n", encoding="utf-8")
    print(f"Updated {target_path.name}")


if __name__ == "__main__":
    main()

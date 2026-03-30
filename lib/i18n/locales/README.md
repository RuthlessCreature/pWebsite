Edit the `*.json` files in this folder for translated site content.

Supported locale dictionaries:
- `zh-cn.json`
- `zh-tw.json`
- `en.json`
- `ja.json`
- `ru.json`
- `es.json`
- `pt.json`

Quick translation helper:
- install once: `python -m pip install deep-translator`
- auto-fill unchanged English strings in one locale: `python scripts/translate_locale_json.py es`
- limit translation to one subtree: `python scripts/translate_locale_json.py pt --page-prefix pages.about`

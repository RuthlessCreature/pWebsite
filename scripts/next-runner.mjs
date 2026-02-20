import { realpathSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const nextArgs = process.argv.slice(2);

if (nextArgs.length === 0) {
  console.error("Usage: node scripts/next-runner.mjs <next-command>");
  process.exit(1);
}

const cwd = process.cwd();
const canonicalCwd = realpathSync.native(cwd);

if (canonicalCwd !== cwd) {
  process.chdir(canonicalCwd);
}

const nextCli = resolve("node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextCli, ...nextArgs], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit"
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});

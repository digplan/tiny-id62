#!/usr/bin/env node
import { encode, decode } from "./index.js";

const [,, cmd, arg] = process.argv;

if (!cmd) {
  console.log("Usage:");
  console.log("  tiny-id62 encode <id>");
  console.log("  tiny-id62 decode <string>");
  process.exit(1);
}

if (cmd === "encode") {
  if (!arg) {
    console.error("Missing id");
    process.exit(1);
  }
  console.log(encode(arg));
  process.exit(0);
}

if (cmd === "decode") {
  if (!arg) {
    console.error("Missing string");
    process.exit(1);
  }
  console.log(decode(arg));
  process.exit(0);
}

console.error("Unknown command:", cmd);
process.exit(1);

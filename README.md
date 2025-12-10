# tiny-id62

Tiny reversible Base62 encoder packing timestamp + id into a short string. Supports both numbers and strings for the id.

## Install

npm install tiny-id62

## Usage (JS)

import { encode, decode } from "tiny-id62";

// Encode with number
const code1 = encode(42);
console.log(code1);
console.log(decode(code1)); // { timestamp: ..., id: 42 }

// Encode with string
const code2 = encode("user-123");
console.log(code2);
console.log(decode(code2)); // { timestamp: ..., id: "user-123" }

## CLI

npx tiny-id62 encode 123
npx tiny-id62 encode "user-123"
npx tiny-id62 decode <code>

# tiny-id62

Tiny reversible Base62 encoder packing timestamp + personId into a short string.

## Install

npm install tiny-id62

## Usage (JS)

import { encode, decode } from "tiny-id62";

const code = encode(42);
console.log(code);

console.log(decode(code));

## CLI

npx tiny-id62 encode 123
npx tiny-id62 decode <code>

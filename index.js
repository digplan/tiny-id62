const CH = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function encodeBase62(n) {
  if (n === 0n) return "0";
  let s = "";
  while (n > 0n) {
    s = CH[Number(n % 62n)] + s;
    n /= 62n;
  }
  return s;
}

function decodeBase62(s) {
  let x = 0n;
  for (const c of s) x = x * 62n + BigInt(CH.indexOf(c));
  return x;
}

function encodeString(s) {
  let x = 0n;
  for (const c of s) x = x * 256n + BigInt(c.charCodeAt(0));
  return encodeBase62(x);
}

function decodeString(s) {
  let x = decodeBase62(s);
  let result = "";
  while (x > 0n) {
    result = String.fromCharCode(Number(x % 256n)) + result;
    x /= 256n;
  }
  return result;
}

export function encode(id) {
  const t = BigInt(Math.floor(Date.now() / 1000));
  const tStr = encodeBase62(t);
  
  if (typeof id === "string") {
    return "z" + tStr + encodeString(id);
  }
  
  const numId = BigInt(Number(id));
  const x = (t << 20n) | (numId & ((1n << 20n) - 1n));
  return encodeBase62(x);
}

export function decode(str) {
  if (str[0] === "z") {
    const rest = str.slice(1);
    let tEnd = 1;
    const maxTs = BigInt(Math.floor(Date.now() / 1000) + 86400);
    while (tEnd < rest.length) {
      const ts = decodeBase62(rest.slice(0, tEnd));
      if (ts > maxTs) break;
      tEnd++;
    }
    tEnd--;
    const timestamp = Number(decodeBase62(rest.slice(0, tEnd)));
    const idStr = rest.slice(tEnd);
    return {
      timestamp,
      id: decodeString(idStr)
    };
  }
  
  let x = decodeBase62(str);
  return {
    timestamp: Number(x >> 20n),
    id: Number(x & ((1n << 20n) - 1n))
  };
}

const CH = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function encode(personId) {
  const t = Math.floor(Date.now() / 1000);
  let x = (BigInt(t) << 20n) | BigInt(personId);
  let s = "";
  while (x > 0n) {
    s = CH[Number(x % 62n)] + s;
    x /= 62n;
  }
  return s;
}

export function decode(str) {
  let x = 0n;
  for (const c of str) x = x * 62n + BigInt(CH.indexOf(c));
  return {
    timestamp: Number(x >> 20n),
    personId: Number(x & ((1n << 20n) - 1n))
  };
}

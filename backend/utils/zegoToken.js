const { randomBytes, createCipheriv } = require("crypto");

function makeNonce() {
  const min = -(2 ** 31);
  const max = 2 ** 31 - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function aesGcmEncrypt(plainText, key) {
  if (![16, 24, 32].includes(key.length)) {
    throw new Error("Invalid ZEGOCLOUD server secret length.");
  }

  const nonce = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, nonce);
  cipher.setAutoPadding(true);

  const encrypted = cipher.update(plainText, "utf8");
  const encryptBuf = Buffer.concat([encrypted, cipher.final(), cipher.getAuthTag()]);
  return { encryptBuf, nonce };
}

function generateToken04(appId, userId, secret, effectiveTimeInSeconds, payload = "") {
  if (!appId || typeof appId !== "number") {
    throw new Error("Invalid ZEGOCLOUD app id.");
  }
  if (!userId || typeof userId !== "string" || userId.length > 64) {
    throw new Error("Invalid user id for token generation.");
  }
  if (!secret || typeof secret !== "string" || secret.length !== 32) {
    throw new Error("ZEGOCLOUD server secret must be a 32-byte string.");
  }
  if (!(effectiveTimeInSeconds > 0)) {
    throw new Error("Invalid token expiry duration.");
  }

  const VERSION_FLAG = "04";
  const createTime = Math.floor(Date.now() / 1000);
  const tokenInfo = {
    app_id: appId,
    user_id: userId,
    nonce: makeNonce(),
    ctime: createTime,
    expire: createTime + effectiveTimeInSeconds,
    payload,
  };

  const plainText = JSON.stringify(tokenInfo);
  const { encryptBuf, nonce } = aesGcmEncrypt(plainText, secret);

  const b1 = new Uint8Array(8);
  const b2 = new Uint8Array(2);
  const b3 = new Uint8Array(2);
  const b4 = new Uint8Array(1);

  new DataView(b1.buffer).setBigInt64(0, BigInt(tokenInfo.expire), false);
  new DataView(b2.buffer).setUint16(0, nonce.byteLength, false);
  new DataView(b3.buffer).setUint16(0, encryptBuf.byteLength, false);
  new DataView(b4.buffer).setUint8(0, 1);

  const buf = Buffer.concat([
    Buffer.from(b1),
    Buffer.from(b2),
    Buffer.from(nonce),
    Buffer.from(b3),
    Buffer.from(encryptBuf),
    Buffer.from(b4),
  ]);

  const dv = new DataView(Uint8Array.from(buf).buffer);
  return VERSION_FLAG + Buffer.from(dv.buffer).toString("base64");
}

module.exports = { generateToken04 };

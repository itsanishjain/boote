import * as Crypto from "expo-crypto";

export async function getSecureRandom() {
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  return randomBytes;
}

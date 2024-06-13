import { EncryptJWT, base64url, jwtDecrypt } from "jose";
import { cookies } from "next/headers";

// JSON Web Tokens

export const checkJwt = async (): Promise<string | undefined> => {
  const authCookie = cookies().get("auth");
  if (!authCookie) {
    return undefined;
  }
  const jwt = authCookie.value;

  const secretBase64 = process.env.JWT_SECRET;
  if (!secretBase64) {
    throw new Error(`Missing JWT_SECRET env. variable`);
  }
  const secret = base64url.decode(secretBase64);

  const { payload } = await jwtDecrypt(jwt, secret);
  return payload.sub;
};

export const createJwtForUser = async (userId: string) => {
  const secretBase64 = process.env.JWT_SECRET;
  if (!secretBase64) {
    throw new Error(`Missing JWT_SECRET env. variable`);
  }
  const secret = base64url.decode(secretBase64);
  const jwt = await new EncryptJWT()
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setExpirationTime("30 day")
    .setSubject(userId)
    .encrypt(secret);

  return jwt;
};

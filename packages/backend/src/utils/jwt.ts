import { sign, verify } from 'jsonwebtoken';

export async function signJwt(id: string | undefined) {
  if (!id) return;
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRATION}s`
  });
}

export async function verifyJwt(token: string, secretKey: string = process.env.JWT_SECRET) {
  return verify(token, secretKey);
}

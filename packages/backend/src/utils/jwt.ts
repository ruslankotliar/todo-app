import { sign, verify } from 'jsonwebtoken';

export async function signJwt(id: string, email: string) {
  return sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRATION}s`
  });
}

export async function verifyJwt(token: string, secretKey: string = process.env.JWT_SECRET) {
  return verify(token, secretKey as string);
}

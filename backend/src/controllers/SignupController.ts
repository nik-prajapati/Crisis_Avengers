import { Request, Response } from 'express';
import User from '../models/User';
import * as argon2 from 'argon2';
import { SignJWT, EncryptJWT } from 'jose';

// JWT config
const fallbackSigningSecret =
  'd7b5dae336250ab03418ca0fdcd0019d695110b500de83df6e1272b1bf9de3b6';
const fallbackEncryptionSecret =
  '5c7eea01c3dece03ebe9b847259c88865981b30a6e73b9b4f8aeaed01b912491';
const signingSecret = process.env.JWT_SIGNING_SECRET || fallbackSigningSecret;
const encryptionSecret =
  process.env.JWT_ENCRYPTION_SECRET || fallbackEncryptionSecret;
const signingKey = Buffer.from(signingSecret);
const encryptionKey = Buffer.from(encryptionSecret);
const jwsAlg = 'HS512';
const jweAlg = 'A256KW';
const jweEnc = 'A256GCMKW';
const tokenLifetime = '1d';

export default async function LoginController(req: Request, res: Response) {
  const {
    email,
    password,
    roleString,
  }: { email: string; password: string; roleString: string } = req.body;
  const role = Number(roleString);
  // change this line when schema changes
  const user = await User.findOne({ email: email }).exec();
  if (user === null) {
    res.json({ error: true, message: "User doesn't exist" });
  } else {
    const verified = await argon2.verify(user.hash, password);
    if (verified) {
      if (user.role === role) {
        // sign and encrpyt a JWT and send it to the client
        const payload = {
          id: user._id,
          email: user.email,
          role: user.role,
        };
        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: jwsAlg })
          .setExpirationTime(tokenLifetime)
          .sign(signingKey);
        const encryptedToken = await new EncryptJWT({ token })
          .setProtectedHeader({ alg: jweAlg, enc: jweEnc })
          .setExpirationTime(tokenLifetime)
          .encrypt(encryptionKey);
        res.json({ error: false, message: 'Logged in', encryptedToken });
      }
    } else {
      res.json({ error: true, message: "Account doesn't exist" });
    }
  }
}

import { Request, Response } from 'express';
import User from '../models/user';
import * as argon2 from 'argon2';
import { SignJWT, EncryptJWT } from 'jose';
import RescueAgency from '../models/rescue_agency';

// JWT config
const fallbackSigningSecret =
  'd7b5dae336250ab03418ca0fdcd0019d695110b500de83df6e1272b1bf9de3b6';
const fallbackEncryptionSecret =
  '5c7eea01c3dece03ebe9b847259c88865981b30a6e73b9b4f8aeaed01b912491';
const signingSecret = process.env.JWT_SIGNING_SECRET || fallbackSigningSecret;
const encryptionSecret =
  process.env.JWT_ENCRYPTION_SECRET || fallbackEncryptionSecret;
const signingKey = Buffer.from(signingSecret, 'hex');
const encryptionKey = Buffer.from(encryptionSecret, 'hex');
const jwsAlg = 'HS256';
const jweAlg = 'A256KW';
const jweEnc = 'A256GCM';
const tokenLifetime = '1d';

export default async function SignupController(req: Request, res: Response) {
  const {
    email,
    password,
    name,
    description,
    location,
    address,
    type,
    phoneNumbers,
  }: // more data will be required while signing up
  // no role here, as role = 1 (only rescue agencies will be allowed to sign up)
  {
    email: string;
    password: string;
    name: string;
    description?: string;
    location: string;
    address: string;
    type: string;
    phoneNumbers: string[];
  } = req.body;
  // change this line when schema changes
  const user = await User.findOne({ email: email }).exec();
  if (user !== null) {
    res.json({ error: true, message: 'Agency already registered' });
  } else {
    const hash = await argon2.hash(password);
    const user = await (await User.create({ email, hash, role: 1 })).save();
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
    res.cookie('token', encryptedToken, {
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: 24 * 60 * 60,
      sameSite: 'none'
    });
    const [lat, long] = location.split(',');
    await (
      await RescueAgency.create({
        _id: user._id,
        name: name,
        location: { latitude: lat, longitude: long },
        type: type,
        address: address,
        phone: phoneNumbers,
        ...(description ? { description: description } : {}),
      })
    ).save();
    res.json({ error: false, message: 'Signed up and logged in successfully' });
  }
}

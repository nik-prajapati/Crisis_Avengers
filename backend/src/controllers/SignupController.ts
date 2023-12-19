import { Request, Response } from 'express';
import User from '../models/user';
import * as argon2 from 'argon2';
import { SignJWT, EncryptJWT } from 'jose';
import RescueAgency from '../models/rescue_agency';
import nodemailer from 'nodemailer';

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

const otpStore = new Map<string, string>();
const otpExpirationTime = 3 * 60 * 1000;
const generateOTP = () => {
  // Generate a random six-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default async function SignupController(req: Request, res: Response) {
  const {
    email,
    otp,
    password,
    name,
    description,
    location,
    address,
    type,
    phonesNumbers,
  }: // more data will be required while signing up
  // no role here, as role = 1 (only rescue agencies will be allowed to sign up)
  {
    email: string;
    otp: string;
    password: string;
    name: string;
    description?: string;
    location: string;
    address: string;
    type: string;
    phonesNumbers: string[];
  } = req.body;
  // change this line when schema changes
  const user = await User.findOne({ email: email }).exec();
  if (user !== null) {
    res.json({ error: true, message: 'Agency already registered' });
  } else {
    const correctOtp = otpStore.get(email);
    if (!correctOtp) {
      return res
        .status(401)
        .json({ error: true, message: 'No OTP / OTP expired' });
    } else if (otp !== correctOtp) {
      return res.status(401).json({ error: true, message: 'Incorrect OTP' });
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
        signed: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
      });
      const [lat, long] = location.split(',');
      await (
        await RescueAgency.create({
          _id: user._id,
          name: name,
          location: { latitude: lat, longitude: long },
          type: type,
          address: address,
          email: email,
          phone: phonesNumbers,
          ...(description ? { description: description } : {}),
        })
      ).save();
      return res.json({
        error: false,
        message: 'Signed up and logged in successfully',
        user,
      });
    }
  }
}

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email }: { email: string } = req.body;
    if (!email)
      return res
        .status(401)
        .json({ error: true, message: 'No email received' });

    const otp = generateOTP();
    sendMail(
      email,
      'OTP - ApadaRelief Registration',
      `Your OTP for the registration is ${otp}`
    );

    otpStore.set(email, otp);

    setTimeout(() => {
      otpStore.delete(email);
    }, otpExpirationTime);

    return res.status(200).json({ error: false, message: 'OTP sent', otp });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: 'Server error' });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crisis.avengers.spit@gmail.com',
    pass: 'atnnjtbqmqgztoik',
  },
});

function sendMail(to: string, subject: string, text: string) {
  try {
    const mailOptions = {
      from: 'crisis.avengers.spit@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

export { sendOtp };

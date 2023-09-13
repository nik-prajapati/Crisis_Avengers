import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  if (req.signedCookies && req.signedCookies.token) {
    res.cookie('token', req.signedCookies.token, {
      httpOnly: true,
      // secure: true,
      signed: true,
      expires: new Date(0),
    });
  }
  res.json({ error: false, message: 'Logged out sucessfully' });
});

export default router;

import { Router } from 'express';
import signupRouter from './signup';
import loginRouter from './login';
import checkAuth from './checkauth';
import logout from './logout';
import getagencies from './getagencies';
//
// import isAuthenticated from '../utils/isAuthenticated';
// import isRescueAgency from '../utils/isRescueAgency';

const router = Router();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/checkauth', checkAuth);
router.use('/logout', logout);
router.use('/getagencies', getagencies);

// error route
router.all('*', (req, res) => {
  // res.send(req.user);
  res.status(404).json({ error: true, message: "Endpoint doesn't exist" });
});

export default router;

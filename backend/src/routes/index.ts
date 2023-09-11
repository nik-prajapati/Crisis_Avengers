import { Router } from 'express';
import signupRouter from './signup';
import loginRouter from './login';

const router = Router();

router.use('/signup', signupRouter);
router.use('/login', loginRouter);

// error route
router.all('*', (req, res) => {
  res.status(404).send({ message: 'Endpoint does not exist' });
});

export default router;

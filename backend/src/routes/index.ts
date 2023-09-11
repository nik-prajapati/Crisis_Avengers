import { Router } from 'express';
import signupRouter from './signup';
import loginRouter from './login';

const router = Router();

router.post('/signup', signupRouter);
router.post('/login', loginRouter);

// error route
router.all('*', (req, res) => {
  res.status(404).send({ message: 'Endpoint does not exist' });
});

export default router;

import { Router } from 'express';

const router = Router();

router.all('*', (req, res) => {
  res.status(404).send({ message: 'Endpoint does not exist' });
});

export default router;

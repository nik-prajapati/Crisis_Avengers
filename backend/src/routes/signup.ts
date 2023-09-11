import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.status(404).send({ message: 'Endpoint does not exist' });
  });

export default router;

import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import Request from '../models/request';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated, async (req, res) => {
  if (!req.user) return;

  const requests = await Request.find(
    req.user.role === 1
      ? { rescue_requester_id: req.user.id }
      : { govt_requester_id: req.user.id }
  );
  res.json({ requests: requests });
});

export default router;

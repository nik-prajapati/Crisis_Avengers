import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import Request from '../models/request';
import isRescueAgency from '../utils/isRescueAgency';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated, isRescueAgency, async (req, res) => {
  if (!req.user) return;
  const requests = await Request.find({ requestee_id: req.user.id });
  
  res.json({ requests: requests });
});

export default router;

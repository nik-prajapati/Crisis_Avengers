import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import Request from '../models/request';
import isRescueAgency from '../utils/isRescueAgency';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated, isRescueAgency, async (req, res) => {
  console.log('user:')
  console.log(req.user)
  if (!req.user) return;
  const requests = await Request.find({ requestee_id: req.user.id });
  console.log(requests);
  res.json({ requests: requests });
});

export default router;

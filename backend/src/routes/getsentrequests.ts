import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import Request from '../models/request';

const router = Router();

router.get('/', isAuthenticated, async (req, res) => {
  if (!req.user) return;

  let requests;
  if (req.user.role === 1) {
    requests = await Request.aggregate([
      {
        $match: { rescue_requester_id: req.user.id },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'requestee_id',
          foreignField: '_id',
          as: 'requestee_id',
        },
      },
    ]);
  } else {
    requests = await Request.aggregate([
      {
        $match: { govt_requester_id: req.user.id },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'requestee_id',
          foreignField: '_id',
          as: 'requestee_id',
        },
      },
    ]);
  }
  console.log(requests);
  res.json({ requests: requests });
});

export default router;

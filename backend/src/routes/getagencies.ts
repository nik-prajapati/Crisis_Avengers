/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import RescueAgency from '../models/rescue_agency';
import haversineDistance from '../utils/haversine';
import axios from 'axios';
import Resource from '../models/resource';

const router = Router();

// get all agencies within a particular radius (in meters)
router.get('/', async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  console.log(req.query);
  if (
    typeof latitude !== 'string' ||
    typeof longitude !== 'string' ||
    (typeof radius !== 'string' && typeof radius !== 'undefined')
  ) {
    res.json({ error: true, message: 'Invalid query parameters' });
  } else {
    const lat = Number(latitude);
    const long = Number(longitude);
    const rad = radius ? Number(radius) : 500000;
    console.log(lat, long, rad);
    const agencies = await RescueAgency.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [long, lat],
          },
          maxDistance: rad,
          spherical: true,
          distanceField: 'distance',
        },
      },
      {
        $lookup: {
          from: 'resources',
          localField: '_id',
          foreignField: 'agency_id',
          as: 'resources',
        },
      },
    ]);
    console.log(agencies);
    res.send(agencies);
  }
});

export default router;

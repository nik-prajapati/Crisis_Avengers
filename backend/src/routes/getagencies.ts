import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import RescueAgency from '../models/rescue_agency';
import haversineDistance from '../utils/haversine';

const router = Router();

// get all agencies within a particular radius (in kilometers)
router.get('/', isAuthenticated, async (req, res) => {
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
    const rad = radius ? Number(radius) : 50;
    let agencies = await RescueAgency.find().exec();
    agencies = agencies.filter((agency) => {
      agency.location.latitude;
      return (
        haversineDistance(
          { latitude: lat, longitude: long },
          {
            latitude: agency.location.latitude,
            longitude: agency.location.longitude,
          }
        ) <= rad
      );
    });
    res.json({ error: false, agencies });
  }
});

export default router;

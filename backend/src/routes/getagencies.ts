import { Router } from 'express';
import isAuthenticated from '../utils/isAuthenticated';
import RescueAgency from '../models/rescue_agency';
import haversineDistance from '../utils/haversine';
import axios from 'axios';

const router = Router();

const API_KEY =
  process.env.MAPQUEST_API_KEY || 'nuGdfaEudQgh4rlkNX49JgnTKbGnBBVm';

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
    const dist: number[] = [];
    for (let i = 0; i < agencies.length; i += 49) {
      try {
        const response = await axios.post(
          `https://www.mapquestapi.com/directions/v2/routematrix?key=${API_KEY}`,
          {
            locations: [
              `${latitude},${longitude}`,
              ...agencies
                .slice(i, i + 49 < agencies.length ? i + 49 : undefined)
                .map(
                  (agency) =>
                    `${agency.location.latitute},${agency.location.longitude}`
                ),
            ],
            options: {
              manyToOne: true,
            },
          }
        );
        dist.push(...response.data.distance.slice(1));
        // console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    res.json({
      error: false,
      agencies: agencies
        .map((agency, idx) => {
          return { ...agency, distance: dist[idx] };
        })
        .sort((a, b) => a.distance - b.distance),
    });
  }
});

export default router;

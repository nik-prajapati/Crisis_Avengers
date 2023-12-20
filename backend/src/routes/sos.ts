import { Request, Response, Router } from 'express';
import Sos from '../models/sos';
import RescueAgency from '../models/rescue_agency';
import RescueSos from '../models/rescue_sos';

const router = Router();

router.post('/sos', async (req: Request, res: Response) => {
  const {
    typeOfDisaster,
    latitude,
    longitude,
  }: {
    typeOfDisaster: string;
    latitude: number;
    longitude: number;
  } = req.body;
  //   const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
  const sos = await Sos.create({
    typeOfDisaster,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  });
  const agencies = await RescueAgency.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 100000,
      },
    },
  });
  agencies.forEach(async (agency) => {
    await RescueSos.create({ rescue_id: agency._id, sos_id: sos._id });
  });
  res.send('Sos sent successfully');
});

export default router;

import { Types } from 'mongoose';
import Request from '../models/request';

type req = {
  govt_requester_id?: Types.ObjectId;
  rescue_requester_id?: Types.ObjectId;
  requestee_id: Types.ObjectId;
  requested_items: [
    {
      type: string;
      name: string;
      qty: number;
      unit: string;
    }
  ];
  location: {
    latitude: number;
    longitude: number;
  };
};

const addRequest = async (req_data: req) => {
  const res = await Request.create({ ...req_data, status: 'Pending' });
  const request = await res.populate(
    'rescue_requester_id'
  );
  return request;
};

export { addRequest };
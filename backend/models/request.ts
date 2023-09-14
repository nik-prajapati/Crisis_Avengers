import { Schema, model, Types } from 'mongoose';
import { Coordinate } from '../utils/coordinates';

type RequestItem = {
  type: string;
  name: string;
  qty: number;
  unit: string;
};

type Request = {
  govt_requester_id?: Types.ObjectId;
  rescue_requester_id?: Types.ObjectId;
  location: Coordinate;
  requested_items: RequestItem[];
  status: string;
  created_at: Date;
  updated_at: Date;
};

const RequestSchema = new Schema<Request>(
  {
    govt_requester_id: {
      type: Schema.Types.ObjectId,
      ref: 'GovernmentAgency',
    },
    rescue_requester_id: {
      type: Schema.Types.ObjectId,
      ref: 'RescueAgency',
    },
    requested_items: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = model<Request>('Request', RequestSchema);

export default Request;

import { Schema, model } from 'mongoose';
import { Coordinate } from '../utils/coordinates';

type RescueAgency = {
  name: string;
  description?: string;
  email: string;
  phone: string[];
  location: Coordinate;
  address: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

const RescueAgencySchema = new Schema<RescueAgency>(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    email: {
      type: String,
      required: true,
    },
    phone: [{ type: String }],
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
    address: {
      type: String,
      required: true,
    },
    type: String,
  },
  {
    timestamps: true,
  }
);

const RescueAgency = model<RescueAgency>('RescueAgency', RescueAgencySchema);

export default RescueAgency;

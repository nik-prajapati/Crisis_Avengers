import { Schema, model } from 'mongoose';
import { Coordinate } from '../utils/coordinates';

type GovtAgency = {
  name: string;
  description?: string;
  email: string;
  phone: string[];
  location: Coordinate;
  address: string;
};

const GovtAgencySchema = new Schema<GovtAgency>({
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
});

const GovtAgency = model<GovtAgency>('Government-Agency', GovtAgencySchema);

export default GovtAgency;

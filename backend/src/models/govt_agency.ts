import { Schema, model } from 'mongoose';
import { GovtAgency } from '../types/schema';

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

const GovtAgency = model<GovtAgency>('government-agency', GovtAgencySchema);

export default GovtAgency;

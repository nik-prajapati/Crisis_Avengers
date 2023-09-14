import { Schema, model, Types } from 'mongoose';
import { RescueAgency } from '../types/schema';

const RescueAgencySchema = new Schema<RescueAgency>(
  {
    _id: Types.ObjectId,
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
    // _id: false
  }
);

const RescueAgency = model<RescueAgency>('rescue-agency', RescueAgencySchema);

export default RescueAgency;

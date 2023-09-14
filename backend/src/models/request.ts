import { Schema, model } from 'mongoose';
import { Request } from '../types/schema';

const RequestSchema = new Schema<Request>(
  {
    govt_requester_id: {
      type: Schema.Types.ObjectId,
      ref: 'Government-Agency',
    },
    rescue_requester_id: {
      type: Schema.Types.ObjectId,
      ref: 'Rescue-Agency',
    },
    requestee_id: {
      type: Schema.Types.ObjectId,
      ref: 'Rescue-Agency',
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

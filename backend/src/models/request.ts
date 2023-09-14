import { Schema, model } from 'mongoose';
import { Request } from '../types/schema';

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

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = model<Request>('Resource', RequestSchema, 'requests');

export default Request;

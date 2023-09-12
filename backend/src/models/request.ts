import { Schema, model, Types } from 'mongoose';

type RequestItem = {
  type: string;
  name: string;
  qty: number;
  unit: string;
};

type Request = {
  govt_requester_id?: Types.ObjectId;
  rescue_requester_id?: Types.ObjectId;
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

    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = model<Request>('Resource', RequestSchema);

export default Request;

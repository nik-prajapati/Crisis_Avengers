import { Schema, model, Types } from 'mongoose';

type Resource = {
  agency_id: Types.ObjectId;
  type: string;
  name: string;
  quantity: number;
  unit: string;
  created_at: Date;
  updated_at: Date;
};

const ResourceSchema = new Schema<Resource>(
  {
    agency_id: {
      type: Schema.Types.ObjectId,
      ref: 'GovernmentAgency',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = model<Resource>('Resource', ResourceSchema);

export default Resource;

import { Coordinate } from './Coordinates';
import { Types } from 'mongoose';

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type GovtAgency = {
  name: string;
  description?: string;
  email: string;
  phone: string[];
  location: Coordinate;
  address: string;
};

export type RescueAgency = {
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

export type RequestItem = {
  type: string;
  name: string;
  qty: number;
  unit: string;
};

export type Request = {
  govt_requester_id?: Types.ObjectId;
  rescue_requester_id?: Types.ObjectId;
  requested_items: RequestItem[];
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type Resource = {
  agency_id: Types.ObjectId;
  type: string;
  name: string;
  quantity: number;
  unit: string;
  created_at: Date;
  updated_at: Date;
};

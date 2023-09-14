import { ObjectId } from 'mongoose';
export {};
declare global {
  namespace Express {
    export interface Request {
      user?: {
        _id: ObjectId;
        email: string;
        role: number;
      };
    }
  }
}

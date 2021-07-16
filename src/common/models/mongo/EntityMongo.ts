import mongoose from 'mongoose';

export interface EntityMongo {
  _id?: mongoose.ObjectId;
  created_at: Date;
  updated_at: Date;
  uuid: string;
}

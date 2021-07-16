import mongodb from 'mongodb';

export interface EntityMongo {
  _id?: mongodb.ObjectId;
  created_at: Date;
  updated_at: Date;
  uuid: string;
}

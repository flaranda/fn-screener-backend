import mongodb from 'mongodb';
import mongoose from 'mongoose';

import { EntityMongo } from './EntityMongo';

export type EntityMongoDocument = EntityMongo &
  mongoose.Document<mongodb.ObjectId>;

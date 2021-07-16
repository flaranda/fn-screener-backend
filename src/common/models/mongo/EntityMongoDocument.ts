import mongoose from 'mongoose';

import { EntityMongo } from './EntityMongo';

export interface EntityMongoDocument
  extends EntityMongo,
    mongoose.Document<mongoose.ObjectId> {}

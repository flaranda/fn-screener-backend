import { EntityMongoDocument } from '../../../common/models/mongo/EntityMongoDocument';
import { UserMongo } from './UserMongo';

export type UserMongoDocument = UserMongo & EntityMongoDocument;

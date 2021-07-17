import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongo } from '../../../common/models/mongo/EntityMongo';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoFindOneRepository } from '../../../common/modules/mongo/EntityMongoFindOneRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { userInjectionTypes } from '../../inversify/userInjectionTypes';
import { User } from '../../models/domain/User';
import { UserFindQuery } from '../../models/domain/UserFindQuery';
import { UserMongo } from '../../models/mongo/UserMongo';
import { UserMongoDocument } from '../../models/mongo/UserMongoDocument';

@inversify.injectable()
export class UserMongoFindOneRepository extends EntityMongoFindOneRepository<
  UserFindQuery,
  User,
  UserMongo,
  UserMongoDocument
> {
  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    mongoDatasource: MongoDatasource,
    @inversify.inject(userInjectionTypes.UserMongoDocumentToUserTransformer)
    userMongoDocumentToUserTransformer: ITransformer<UserMongoDocument, User>,
  ) {
    super(
      mongoDatasource,
      userMongoDocumentToUserTransformer,
      EntityMongoModelName.User,
    );
  }

  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    baseMongooseFilterQuery: mongoose.FilterQuery<UserMongo>,
    _userFindQuery: UserFindQuery,
  ): mongoose.FilterQuery<EntityMongo> {
    return baseMongooseFilterQuery;
  }
}

import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoFindManyRepository } from '../../../common/modules/mongo/EntityMongoFindManyRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { userCriteriaInjectionTypes } from '../../inversify/userCriteriaInjectionTypes';
import { UserCriteria } from '../../models/domain/UserCriteria';
import { UserCriteriaFindQuery } from '../../models/domain/UserCriteriaFindQuery';
import { UserCriteriaMongo } from '../../models/mongo/UserCriteriaMongo';
import { UserCriteriaMongoDocument } from '../../models/mongo/UserCriteriaMongoDocument';

@inversify.injectable()
export class UserCriteriaMongoFindManyRepository extends EntityMongoFindManyRepository<
  UserCriteriaFindQuery,
  UserCriteria,
  UserCriteriaMongo,
  UserCriteriaMongoDocument
> {
  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    mongoDatasource: MongoDatasource,
    @inversify.inject(
      userCriteriaInjectionTypes.UserCriteriaMongoDocumentToUserCriteriaTransformer,
    )
    criteriaMongoDocumentToUserCriteriaTransformer: ITransformer<
      UserCriteriaMongoDocument,
      UserCriteria
    >,
  ) {
    super(
      mongoDatasource,
      criteriaMongoDocumentToUserCriteriaTransformer,
      EntityMongoModelName.UserCriteria,
    );
  }

  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    mongooseFilterQuery: mongoose.FilterQuery<UserCriteriaMongo>,
    userCriteriaFindQuery: UserCriteriaFindQuery,
  ): mongoose.FilterQuery<UserCriteriaMongo> {
    if ('userUuid' in userCriteriaFindQuery) {
      mongooseFilterQuery.user_uuid = userCriteriaFindQuery.userUuid;
    }

    return mongooseFilterQuery;
  }
}

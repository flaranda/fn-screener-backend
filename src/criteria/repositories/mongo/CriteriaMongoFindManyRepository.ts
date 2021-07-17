import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongo } from '../../../common/models/mongo/EntityMongo';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoFindManyRepository } from '../../../common/modules/mongo/EntityMongoFindManyRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { criteriaInjectionTypes } from '../../inversify/criteriaInjectionTypes';
import { Criteria } from '../../models/domain/Criteria';
import { CriteriaFindQuery } from '../../models/domain/CriteriaFindQuery';
import { CriteriaMongo } from '../../models/mongo/CriteriaMongo';
import { CriteriaMongoDocument } from '../../models/mongo/CriteriaMongoDocument';

@inversify.injectable()
export class CriteriaMongoFindManyRepository extends EntityMongoFindManyRepository<
  CriteriaFindQuery,
  Criteria,
  CriteriaMongo,
  CriteriaMongoDocument
> {
  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    mongoDatasource: MongoDatasource,
    @inversify.inject(
      criteriaInjectionTypes.CriteriaMongoDocumentToCriteriaTransformer,
    )
    criteriaMongoDocumentToCriteriaTransformer: ITransformer<
      CriteriaMongoDocument,
      Criteria
    >,
  ) {
    super(
      mongoDatasource,
      criteriaMongoDocumentToCriteriaTransformer,
      EntityMongoModelName.Criteria,
    );
  }

  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    mongooseFilterQuery: mongoose.FilterQuery<EntityMongo>,
    _criteriaFindQuery: CriteriaFindQuery,
  ): mongoose.FilterQuery<CriteriaMongo> {
    return mongooseFilterQuery;
  }
}

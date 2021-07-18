import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoFindManyRepository } from '../../../common/modules/mongo/EntityMongoFindManyRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { criteriaComplianceInjectionTypes } from '../../inversify/criteriaComplianceInjectionTypes';
import { CriteriaCompliance } from '../../models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../../models/domain/CriteriaComplianceFindQuery';
import { CriteriaComplianceMongo } from '../../models/mongo/CriteriaComplianceMongo';
import { CriteriaComplianceMongoDocument } from '../../models/mongo/CriteriaComplianceMongoDocument';

@inversify.injectable()
export class CriteriaComplianceMongoFindManyRepository extends EntityMongoFindManyRepository<
  CriteriaComplianceFindQuery,
  CriteriaCompliance,
  CriteriaComplianceMongo,
  CriteriaComplianceMongoDocument
> {
  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    mongoDatasource: MongoDatasource,
    @inversify.inject(
      criteriaComplianceInjectionTypes.CriteriaComplianceMongoDocumentToCriteriaComplianceTransformer,
    )
    criteriaComplianceMongoDocumentToCriteriaComplianceTransformer: ITransformer<
      CriteriaComplianceMongoDocument,
      CriteriaCompliance
    >,
  ) {
    super(
      mongoDatasource,
      criteriaComplianceMongoDocumentToCriteriaComplianceTransformer,
      EntityMongoModelName.CriteriaCompliance,
    );
  }

  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    mongooseFilterQuery: mongoose.FilterQuery<CriteriaComplianceMongo>,
    criteriaComplianceFindQuery: CriteriaComplianceFindQuery,
  ): mongoose.FilterQuery<CriteriaComplianceMongo> {
    if ('startupUuid' in criteriaComplianceFindQuery) {
      mongooseFilterQuery.startup_uuid =
        criteriaComplianceFindQuery.startupUuid;
    }

    return mongooseFilterQuery;
  }
}

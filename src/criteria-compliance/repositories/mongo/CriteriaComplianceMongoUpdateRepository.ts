import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoUpdateRepository } from '../../../common/modules/mongo/EntityMongoUpdateRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { criteriaComplianceInjectionTypes } from '../../inversify/criteriaComplianceInjectionTypes';
import { CriteriaCompliance } from '../../models/domain/CriteriaCompliance';
import { CriteriaComplianceUpdateQuery } from '../../models/domain/CriteriaComplianceUpdateQuery';
import { criteriaComplianceAnswerToCriteriaComplianceMongoAnswerMap } from '../../models/mongo/criteriaComplianceAnswerToCriteriaComplianceMongoAnswerMap';
import { CriteriaComplianceMongo } from '../../models/mongo/CriteriaComplianceMongo';
import { CriteriaComplianceMongoDocument } from '../../models/mongo/CriteriaComplianceMongoDocument';

@inversify.injectable()
export class CriteriaComplianceMongoUpdateRepository extends EntityMongoUpdateRepository<
  CriteriaComplianceUpdateQuery,
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

  protected buildMongooseUpdateQueryFromBaseMongooseUpdateQueryAndEntityUpdateQuery(
    baseMongooseUpdateQuery: mongoose.UpdateQuery<CriteriaComplianceMongo>,
    criteriaComplianceUpdateQuery: CriteriaComplianceUpdateQuery,
  ): mongoose.UpdateQuery<CriteriaComplianceMongo> {
    const criteriaComplianceMongo: Partial<CriteriaComplianceMongo> = {};

    if (hasValue(criteriaComplianceUpdateQuery.answer)) {
      criteriaComplianceMongo.answer =
        criteriaComplianceAnswerToCriteriaComplianceMongoAnswerMap[
          criteriaComplianceUpdateQuery.answer
        ];
    }

    const mongooseUpdateQuery: mongoose.UpdateQuery<CriteriaComplianceMongo> = {
      ...baseMongooseUpdateQuery,
      ...criteriaComplianceMongo,
    };

    return mongooseUpdateQuery;
  }
}

import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { hasValue } from '../../../common/helpers/hasValue';
import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoUpdateRepository } from '../../../common/modules/mongo/EntityMongoUpdateRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { selectedCriteriaInjectionTypes } from '../../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteria } from '../../models/domain/SelectedCriteria';
import { SelectedCriteriaUpdateQuery } from '../../models/domain/SelectedCriteriaUpdateQuery';
import { selectedCriteriaImportanceToSelectedCriteriaMongoImportanceMap } from '../../models/mongo/selectedCriteriaImportanceToSelectedCriteriaMongoImportanceMap';
import { SelectedCriteriaMongo } from '../../models/mongo/SelectedCriteriaMongo';
import { SelectedCriteriaMongoDocument } from '../../models/mongo/SelectedCriteriaMongoDocument';

@inversify.injectable()
export class SelectedCriteriaMongoUpdateRepository extends EntityMongoUpdateRepository<
  SelectedCriteriaUpdateQuery,
  SelectedCriteria,
  SelectedCriteriaMongo,
  SelectedCriteriaMongoDocument
> {
  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    mongoDatasource: MongoDatasource,
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaMongoDocumentToSelectedCriteriaTransformer,
    )
    selectedCriteriaMongoDocumentToSelectedCriteriaTransformer: ITransformer<
      SelectedCriteriaMongoDocument,
      SelectedCriteria
    >,
  ) {
    super(
      mongoDatasource,
      selectedCriteriaMongoDocumentToSelectedCriteriaTransformer,
      EntityMongoModelName.SelectedCriteria,
    );
  }

  protected buildMongooseUpdateQueryFromBaseMongooseUpdateQueryAndEntityUpdateQuery(
    baseMongooseUpdateQuery: mongoose.UpdateQuery<SelectedCriteriaMongo>,
    selectedCriteriaUpdateQuery: SelectedCriteriaUpdateQuery,
  ): mongoose.UpdateQuery<SelectedCriteriaMongo> {
    const selectedCriteriaMongo: Partial<SelectedCriteriaMongo> = {};

    if (hasValue(selectedCriteriaUpdateQuery.importance)) {
      selectedCriteriaMongo.importance =
        selectedCriteriaImportanceToSelectedCriteriaMongoImportanceMap[
          selectedCriteriaUpdateQuery.importance
        ];
    }

    const mongooseUpdateQuery: mongoose.UpdateQuery<SelectedCriteriaMongo> = {
      ...baseMongooseUpdateQuery,
      ...selectedCriteriaMongo,
    };

    return mongooseUpdateQuery;
  }
}

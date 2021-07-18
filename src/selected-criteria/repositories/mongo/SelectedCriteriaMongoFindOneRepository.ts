import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoFindOneRepository } from '../../../common/modules/mongo/EntityMongoFindOneRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { selectedCriteriaInjectionTypes } from '../../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteria } from '../../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../../models/domain/SelectedCriteriaFindQuery';
import { SelectedCriteriaMongo } from '../../models/mongo/SelectedCriteriaMongo';
import { SelectedCriteriaMongoDocument } from '../../models/mongo/SelectedCriteriaMongoDocument';

@inversify.injectable()
export class SelectedCriteriaMongoFindOneRepository extends EntityMongoFindOneRepository<
  SelectedCriteriaFindQuery,
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

  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    mongooseFilterQuery: mongoose.FilterQuery<SelectedCriteriaMongo>,
    _selectedCriteriaFindQuery: SelectedCriteriaFindQuery,
  ): mongoose.FilterQuery<SelectedCriteriaMongo> {
    return mongooseFilterQuery;
  }
}

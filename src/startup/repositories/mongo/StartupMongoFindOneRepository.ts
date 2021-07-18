import * as inversify from 'inversify';
import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { EntityMongoModelName } from '../../../common/models/mongo/EntityMongoModelName';
import { EntityMongoFindOneRepository } from '../../../common/modules/mongo/EntityMongoFindOneRepository';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { mongoInjectionTypes } from '../../../mongo/inversify/mongoInjectionTypes';
import { startupInjectionTypes } from '../../inversify/startupInjectionTypes';
import { Startup } from '../../models/domain/Startup';
import { StartupFindQuery } from '../../models/domain/StartupFindQuery';
import { StartupMongo } from '../../models/mongo/StartupMongo';
import { StartupMongoDocument } from '../../models/mongo/StartupMongoDocument';

@inversify.injectable()
export class StartupMongoFindOneRepository extends EntityMongoFindOneRepository<
  StartupFindQuery,
  Startup,
  StartupMongo,
  StartupMongoDocument
> {
  constructor(
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    mongoDatasource: MongoDatasource,
    @inversify.inject(
      startupInjectionTypes.StartupMongoDocumentToStartupTransformer,
    )
    startupMongoDocumentToStartupTransformer: ITransformer<
      StartupMongoDocument,
      Startup
    >,
  ) {
    super(
      mongoDatasource,
      startupMongoDocumentToStartupTransformer,
      EntityMongoModelName.Startup,
    );
  }

  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    mongooseFilterQuery: mongoose.FilterQuery<StartupMongo>,
    _startupFindQuery: StartupFindQuery,
  ): mongoose.FilterQuery<StartupMongo> {
    return mongooseFilterQuery;
  }
}

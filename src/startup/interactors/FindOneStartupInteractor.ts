import * as inversify from 'inversify';

import { IFindOneRepository } from '../../common/interfaces/IFindOneRepository';
import { FindOneEntityInteractor } from '../../common/modules/domain/FindOneEntityInteractor';
import { startupInjectionTypes } from '../inversify/startupInjectionTypes';
import { Startup } from '../models/domain/Startup';
import { StartupFindQuery } from '../models/domain/StartupFindQuery';

@inversify.injectable()
export class FindOneStartupInteractor extends FindOneEntityInteractor<
  StartupFindQuery,
  Startup
> {
  constructor(
    @inversify.inject(startupInjectionTypes.StartupMongoFindOneRepository)
    startupFindOneRepository: IFindOneRepository<StartupFindQuery, Startup>,
  ) {
    super(startupFindOneRepository);
  }
}

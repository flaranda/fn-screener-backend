import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
import { startupInjectionTypes } from '../inversify/startupInjectionTypes';
import { Startup } from '../models/domain/Startup';
import { StartupFindQuery } from '../models/domain/StartupFindQuery';

@inversify.injectable()
export class StartupUuidRequestParamHandler extends ExpressRequestParamHandler {
  constructor(
    @inversify.inject(startupInjectionTypes.FindOneStartupInteractor)
    private readonly findOneStartupInteractor: IInteractor<
      StartupFindQuery,
      Startup
    >,
  ) {
    super();
  }

  protected async handle(
    request: RequestWithContext,
    _response: express.Response,
    next: express.NextFunction,
    param: string,
  ): Promise<void> {
    const startupFindQuery: StartupFindQuery = {
      uuid: param,
    };

    const startup: Startup = await this.findOneStartupInteractor.interact(
      startupFindQuery,
    );

    const requestContext: RequestContext = getRequestContext(request);

    requestContext.startup = startup;

    next();
  }
}

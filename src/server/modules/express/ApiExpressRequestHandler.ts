import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../../common/helpers/getRequestContext';
import { hasValue } from '../../../common/helpers/hasValue';
import { ApiVersion } from '../../../common/models/domain/ApiVersion';
import { RequestContext } from '../../../common/models/domain/RequestContext';
import { ExpressRequest } from '../../models/express/ExpressRequest';
import { ExpressRequestHandler } from './ExpressRequestHandler';

@inversify.injectable()
export abstract class ApiExpressRequestHandler extends ExpressRequestHandler {
  private readonly expressRouter: express.Router;

  public get handler(): express.RequestHandler {
    return this.expressRouter;
  }

  constructor() {
    super();

    this.expressRouter = express.Router();

    this.expressRouter.use(super.handler);
  }

  protected async handle(
    request: ExpressRequest,
    response: express.Response<unknown>,
    next: express.NextFunction,
  ): Promise<void> {
    const requestContext: RequestContext = getRequestContext(request);

    if (hasValue(requestContext.apiVersion)) {
      switch (requestContext.apiVersion) {
        case ApiVersion.v1:
          await this.handleV1(request, response, next);
          break;
      }
    } else {
      next(new Error('Api version not present in request'));
    }
  }

  protected abstract handleV1(
    request: ExpressRequest,
    response: express.Response<unknown>,
    next: express.NextFunction,
  ): Promise<void>;
}

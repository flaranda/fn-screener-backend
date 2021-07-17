import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { hasValue } from '../../common/helpers/hasValue';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { stringToApiVersionMap } from '../../common/models/domain/stringToApiVersionMap';
import { ExpressRequest } from '../models/express/ExpressRequest';
import { ExpressRequestParamHandler } from '../modules/express/ExpressRequestParamHandler';

@inversify.injectable()
export class ApiVersionExpressRequestParamHandler extends ExpressRequestParamHandler {
  protected async handle(
    request: ExpressRequest,
    _response: express.Response,
    next: express.NextFunction,
    param: string,
  ): Promise<void> {
    const apiVersion: ApiVersion | undefined = stringToApiVersionMap[param];

    if (hasValue(apiVersion)) {
      const context: RequestContext = getRequestContext(request);

      context.apiVersion = apiVersion;

      next();
    } else {
      next(new Error(`Unexisting API Version "${param}"`));
    }
  }
}

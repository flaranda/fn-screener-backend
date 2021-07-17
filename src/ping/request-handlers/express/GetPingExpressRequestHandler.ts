import express from 'express';
import * as inversify from 'inversify';

import { ExpressRequest } from '../../../server/models/express/ExpressRequest';
import { ExpressRequestHandler } from '../../../server/modules/express/ExpressRequestHandler';

@inversify.injectable()
export class GetPingExpressRequestHandler extends ExpressRequestHandler {
  protected async handle(
    _request: ExpressRequest,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    response.send("I'm alive!");
  }
}

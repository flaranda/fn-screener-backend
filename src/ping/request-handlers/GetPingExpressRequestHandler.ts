import express from 'express';
import * as inversify from 'inversify';

import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';

@inversify.injectable()
export class GetPingExpressRequestHandler extends ExpressRequestHandler {
  protected async handle(
    _request: RequestWithContext,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    response.send("I'm alive!");
  }
}

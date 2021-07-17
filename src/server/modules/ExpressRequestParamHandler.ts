import express from 'express';
import * as inversify from 'inversify';

import { RequestWithContext } from '../models/RequestWithContext';

@inversify.injectable()
export abstract class ExpressRequestParamHandler {
  public get handler(): express.RequestParamHandler {
    return this.handle.bind(this);
  }

  protected abstract handle(
    request: RequestWithContext,
    response: express.Response,
    next: express.NextFunction,
    param: string,
  ): Promise<void>;
}

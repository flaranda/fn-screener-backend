import express from 'express';
import * as inversify from 'inversify';

import { RequestWithContext } from '../models/RequestWithContext';

@inversify.injectable()
export abstract class ExpressRequestHandler {
  public get handler(): express.RequestHandler {
    return this.handlerWrapper.bind(this);
  }

  private async handlerWrapper(
    request: RequestWithContext,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    try {
      await this.handle(request, response, next);
    } catch (error: unknown) {
      next(error);
    }
  }

  protected abstract handle(
    request: RequestWithContext,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void>;
}

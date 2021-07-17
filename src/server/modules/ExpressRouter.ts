import express from 'express';
import * as inversify from 'inversify';

@inversify.injectable()
export abstract class ExpressRouter {
  protected readonly expressRouter: express.Router;

  constructor() {
    this.expressRouter = express.Router();
  }

  public get handler(): express.Handler {
    return this.expressRouter;
  }

  protected abstract initialize(): void;
}

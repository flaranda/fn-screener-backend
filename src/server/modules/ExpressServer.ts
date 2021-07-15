import http from 'http';

import express from 'express';
import * as inversify from 'inversify';

import { IServer } from '../interfaces/IServer';

@inversify.injectable()
export class ExpressServer implements IServer {
  public readonly httpServer: http.Server;
  private readonly express: express.Express;
  private readonly port: number = 3000;

  constructor() {
    this.express = this.configureExpress();
    this.httpServer = http.createServer(this.express);
  }

  public async start(): Promise<void> {
    await this.startHttpServer();
  }

  public async stop(): Promise<void> {
    await this.stopHttpServer();
  }

  private async startHttpServer(): Promise<void> {
    const startHttpServerPromise: Promise<void> = new Promise(
      (resolve: (value: void | PromiseLike<void>) => void): void => {
        this.httpServer.listen(this.port, resolve);
      },
    );

    return startHttpServerPromise;
  }

  private async stopHttpServer(): Promise<void> {
    const stopHttpServerPromise: Promise<void> = new Promise(
      (
        resolve: (value: void | PromiseLike<void>) => void,
        reject: (reason?: unknown) => void,
      ): void => {
        this.httpServer.close((error: Error | undefined): void => {
          if (error === undefined) {
            resolve();
          } else {
            reject(error);
          }
        });
      },
    );

    return stopHttpServerPromise;
  }

  private configureExpress(): express.Express {
    const expressInstance: express.Express = express();

    expressInstance.disable('x-powered-by');

    return expressInstance;
  }
}

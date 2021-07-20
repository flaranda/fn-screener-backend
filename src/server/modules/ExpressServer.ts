import http from 'http';

import express from 'express';
import * as inversify from 'inversify';

import { IDatasource } from '../../common/interfaces/IDatasource';
import { IServer } from '../../common/interfaces/IServer';
import { mongoInjectionTypes } from '../../mongo/inversify/mongoInjectionTypes';
import { ServerConfig } from '../configs/ServerConfig';
import { serverInjectionTypes } from '../inversify/serverInjectionTypes';
import { ExpressRouter } from './ExpressRouter';

@inversify.injectable()
export class ExpressServer implements IServer {
  public readonly httpServer: http.Server;
  private readonly express: express.Express;

  constructor(
    @inversify.inject(serverInjectionTypes.ServerConfig)
    private readonly serverConfig: ServerConfig,
    @inversify.inject(mongoInjectionTypes.MongoDatasource)
    private readonly mongoDatasource: IDatasource,
    @inversify.inject(serverInjectionTypes.MainExpressRouter)
    private readonly mainExpressRouter: ExpressRouter,
  ) {
    this.express = this.configureExpress();
    this.httpServer = http.createServer(this.express);
  }

  public async start(): Promise<void> {
    await this.mongoDatasource.connect();

    await this.startHttpServer();
  }

  public async stop(): Promise<void> {
    await this.stopHttpServer();

    await this.mongoDatasource.disconnect();
  }

  private async startHttpServer(): Promise<void> {
    const startHttpServerPromise: Promise<void> = new Promise(
      (resolve: (value: void | PromiseLike<void>) => void): void => {
        this.httpServer.listen(this.serverConfig.port, resolve);
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

    expressInstance.use(express.json());

    expressInstance.use(this.mainExpressRouter.handler);

    return expressInstance;
  }
}

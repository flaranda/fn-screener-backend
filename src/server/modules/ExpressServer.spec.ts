import 'reflect-metadata';

jest.mock('http');

import http from 'http';

jest.mock('express', () => {
  const express: jest.Mock = jest.fn();

  (express as unknown as { json: jest.Mock }).json = jest.fn();

  return express;
});

import express from 'express';

import { IDatasource } from '../../common/interfaces/IDatasource';
import { EnvVariablesFixtures } from '../../env-variables-loader/fixtures/EnvVariablesFixtures';
import { ServerConfig } from '../configs/ServerConfig';
import { ExpressRouter } from './ExpressRouter';
import { ExpressServer } from './ExpressServer';

describe('ExpressServer', () => {
  let expressMock: jest.Mocked<express.Express>;
  let httpServer: jest.Mocked<http.Server>;
  let serverConfig: jest.Mocked<ServerConfig>;
  let mongoDatasource: jest.Mocked<IDatasource>;
  let mainRouter: jest.Mocked<ExpressRouter>;

  let expressServer: ExpressServer;

  beforeAll(() => {
    expressMock = {
      disable: jest.fn(),
      use: jest.fn(),
    } as Partial<express.Express> as jest.Mocked<express.Express>;

    httpServer = {
      close: jest
        .fn()
        .mockImplementation((callback?: (err?: Error) => void) => {
          if (callback !== undefined) {
            callback();
          }

          return httpServer;
        }),
      listen: jest
        .fn()
        .mockImplementation(
          (_port: number, callback?: (err?: Error) => void) => {
            if (callback !== undefined) {
              callback();
            }

            return httpServer;
          },
        ),
    } as Partial<http.Server> as jest.Mocked<http.Server>;

    (express as unknown as jest.Mock).mockReturnValue(expressMock);
    (http.createServer as jest.Mock).mockReturnValue(httpServer);

    serverConfig = {
      port: EnvVariablesFixtures.withMandatory.SERVER_PORT,
    } as Partial<ServerConfig> as jest.Mocked<ServerConfig>;

    mongoDatasource = {
      connect: jest.fn(),
      disconnect: jest.fn(),
    };

    mainRouter = {
      handler: jest.fn(),
    } as Partial<ExpressRouter> as jest.Mocked<ExpressRouter>;

    expressServer = new ExpressServer(
      serverConfig,
      mongoDatasource,
      mainRouter,
    );
  });

  describe('when instantiated', () => {
    let server: ExpressServer;

    beforeAll(() => {
      jest.clearAllMocks();

      server = new ExpressServer(serverConfig, mongoDatasource, mainRouter);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call express()', () => {
      expect(express).toHaveBeenCalledTimes(1);
    });

    it('should call expressMock.use()', () => {
      expect(expressMock.use).toHaveBeenCalledTimes(2);
      expect(expressMock.use).toHaveBeenNthCalledWith(2, mainRouter.handler);
    });

    it('should call http.createServer()', () => {
      expect(http.createServer).toHaveBeenCalledTimes(1);
      expect(http.createServer).toHaveBeenCalledWith(expressMock);
    });

    it('should have an httpServer property', () => {
      expect(server.httpServer).toStrictEqual(httpServer);
    });
  });

  describe('.start()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await expressServer.start();
      });

      it('should call MongoDatasource.connect()', () => {
        expect(mongoDatasource.connect).toHaveBeenCalledTimes(1);
        expect(mongoDatasource.connect).toHaveBeenCalledWith();
      });

      it('should call httpServer.listen()', () => {
        expect(expressServer.httpServer.listen).toHaveBeenCalledTimes(1);
        expect(expressServer.httpServer.listen).toHaveBeenCalledWith(
          EnvVariablesFixtures.withMandatory.SERVER_PORT,
          expect.any(Function),
        );
      });

      it('should return nothing', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('.close()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await expressServer.stop();
      });

      it('should call MongoDatasource.disconnect()', () => {
        expect(mongoDatasource.disconnect).toHaveBeenCalledTimes(1);
        expect(mongoDatasource.disconnect).toHaveBeenCalledWith();
      });

      it('should call httpServer.close()', () => {
        expect(expressServer.httpServer.close).toHaveBeenCalledTimes(1);
      });

      it('should return nothing', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});

import 'reflect-metadata';

jest.mock('http');

import http from 'http';

jest.mock('express', () => jest.fn());

import express from 'express';

import { EnvVariablesFixtures } from '../../env-variables-loader/fixtures/EnvVariablesFixtures';
import { ServerConfig } from '../configs/ServerConfig';
import { ExpressServer } from './ExpressServer';

describe('Server', () => {
  let expressMock: jest.Mocked<express.Express>;
  let httpServer: jest.Mocked<http.Server>;
  let serverConfig: jest.Mocked<ServerConfig>;

  let expressServer: ExpressServer;

  beforeAll(() => {
    expressMock = {
      disable: jest.fn(),
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

    expressServer = new ExpressServer(serverConfig);
  });

  describe('when instantiated', () => {
    let server: ExpressServer;

    beforeAll(() => {
      jest.clearAllMocks();

      server = new ExpressServer(serverConfig);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call express()', () => {
      expect(express).toHaveBeenCalledTimes(1);
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

      it('should call httpServer.close()', () => {
        expect(expressServer.httpServer.close).toHaveBeenCalledTimes(1);
      });

      it('should return nothing', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});

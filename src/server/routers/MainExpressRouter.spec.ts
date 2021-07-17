import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { ExpressRequestParamHandler } from '../modules/ExpressRequestParamHandler';
import { ExpressRouter } from '../modules/ExpressRouter';
import { MainExpressRouter } from './MainExpressRouter';

describe('MainExpressRouter', () => {
  let expressRouterFixture: jest.Mocked<express.Router>;
  let apiVersionRequestParamHandler: jest.Mocked<ExpressRequestParamHandler>;
  let pingRouter: jest.Mocked<ExpressRouter>;
  let apiRouter: jest.Mocked<ExpressRouter>;

  beforeAll(() => {
    expressRouterFixture = {
      param: jest.fn(),
      use: jest.fn(),
    } as Partial<express.Router> as jest.Mocked<express.Router>;

    apiVersionRequestParamHandler = {
      handler: jest.fn(),
    } as Partial<ExpressRequestParamHandler> as jest.Mocked<ExpressRequestParamHandler>;

    pingRouter = {
      handler: jest.fn(),
    } as Partial<ExpressRouter> as jest.Mocked<ExpressRouter>;

    apiRouter = {
      handler: jest.fn(),
    } as Partial<ExpressRouter> as jest.Mocked<ExpressRouter>;

    (express.Router as jest.Mock).mockReturnValue(expressRouterFixture);
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      new MainExpressRouter(
        apiVersionRequestParamHandler,
        pingRouter,
        apiRouter,
      );
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call expressRouterFixture.param()', () => {
      expect(expressRouterFixture.param).toHaveBeenCalledTimes(1);

      expect(expressRouterFixture.param).toHaveBeenCalledWith(
        'apiVersion',
        apiVersionRequestParamHandler.handler,
      );
    });

    it('should call expressRouterFixture.use()', () => {
      expect(expressRouterFixture.use).toHaveBeenCalledTimes(2);

      expect(expressRouterFixture.use).toHaveBeenNthCalledWith(
        1,
        '/',
        pingRouter.handler,
      );

      expect(expressRouterFixture.use).toHaveBeenNthCalledWith(
        2,
        '/:apiVersion',
        apiRouter.handler,
      );
    });
  });
});

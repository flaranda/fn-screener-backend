import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { ExpressRouter } from '../../modules/express/ExpressRouter';
import { MainExpressRouter } from './MainExpressRouter';

describe('MainExpressRouter', () => {
  let expressRouterFixture: jest.Mocked<express.Router>;
  let pingRouter: jest.Mocked<ExpressRouter>;

  beforeAll(() => {
    expressRouterFixture = {
      use: jest.fn(),
    } as Partial<express.Router> as jest.Mocked<express.Router>;

    pingRouter = {
      handler: jest.fn(),
    } as Partial<ExpressRouter> as jest.Mocked<ExpressRouter>;

    (express.Router as jest.Mock).mockReturnValue(expressRouterFixture);
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      new MainExpressRouter(pingRouter);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call expressRouterFixture.use()', () => {
      expect(expressRouterFixture.use).toHaveBeenCalledTimes(1);
      expect(expressRouterFixture.use).toHaveBeenCalledWith(
        '/',
        pingRouter.handler,
      );
    });
  });
});

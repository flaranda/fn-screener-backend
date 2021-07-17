import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { ExpressRouter } from '../modules/ExpressRouter';
import { ApiExpressRouter } from './ApiExpressRouter';

describe('ApiExpressRouter', () => {
  let expressRouterFixture: jest.Mocked<express.Router>;
  let criteriasRouter: jest.Mocked<ExpressRouter>;
  let usersRouter: jest.Mocked<ExpressRouter>;

  beforeAll(() => {
    expressRouterFixture = {
      param: jest.fn(),
      use: jest.fn(),
    } as Partial<express.Router> as jest.Mocked<express.Router>;

    criteriasRouter = {
      handler: jest.fn(),
    } as Partial<ExpressRouter> as jest.Mocked<ExpressRouter>;

    usersRouter = {
      handler: jest.fn(),
    } as Partial<ExpressRouter> as jest.Mocked<ExpressRouter>;

    (express.Router as jest.Mock).mockReturnValue(expressRouterFixture);
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      new ApiExpressRouter(criteriasRouter, usersRouter);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call expressRouterFixture.use()', () => {
      expect(expressRouterFixture.use).toHaveBeenCalledTimes(2);

      expect(expressRouterFixture.use).toHaveBeenNthCalledWith(
        1,
        '/criterias',
        criteriasRouter.handler,
      );
      expect(expressRouterFixture.use).toHaveBeenNthCalledWith(
        2,
        '/users/',
        criteriasRouter.handler,
      );
    });
  });
});

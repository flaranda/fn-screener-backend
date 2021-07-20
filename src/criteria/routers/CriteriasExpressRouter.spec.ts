import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { CriteriasRouter } from './CriteriasExpressRouter';

describe('CriteriasRouter', () => {
  let expressRouterFixture: jest.Mocked<express.Router>;
  let getCriteriasRequestHandler: jest.Mocked<ExpressRequestHandler>;

  beforeAll(() => {
    expressRouterFixture = {
      get: jest.fn().mockReturnThis(),
      route: jest.fn().mockReturnThis(),
    } as Partial<express.Router> as jest.Mocked<express.Router>;

    getCriteriasRequestHandler = {
      handler: jest.fn(),
    } as Partial<ExpressRequestHandler> as jest.Mocked<ExpressRequestHandler>;

    (express.Router as jest.Mock).mockReturnValue(expressRouterFixture);
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      new CriteriasRouter(getCriteriasRequestHandler);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call expressRouterFixture.route()', () => {
      expect(expressRouterFixture.route).toHaveBeenCalledTimes(1);
      expect(expressRouterFixture.route).toHaveBeenCalledWith('/');
    });

    it('should call expressRouterFixture.get()', () => {
      expect(expressRouterFixture.get).toHaveBeenCalledTimes(1);
      expect(expressRouterFixture.get).toHaveBeenCalledWith(
        getCriteriasRequestHandler.handler,
      );
    });
  });
});

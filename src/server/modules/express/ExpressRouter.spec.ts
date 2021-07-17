import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { ExpressRouter } from './ExpressRouter';

class ExpressRouterMock extends ExpressRouter {
  protected initialize(): void {
    return;
  }
}

describe('ExpressRouter', () => {
  let expressRouterFixture: express.Router;

  let router: ExpressRouter;

  beforeAll(() => {
    expressRouterFixture = {} as express.Router;

    (express.Router as jest.Mock).mockReturnValue(expressRouterFixture);

    router = new ExpressRouterMock();

    jest.clearAllMocks();
  });

  describe('when instantiated', () => {
    beforeAll(() => {
      new ExpressRouterMock();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should create a new express.Router', () => {
      expect(express.Router).toHaveBeenCalledTimes(1);
    });
  });

  describe('.handler()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = router.handler;
      });

      it('should return an express.Router instance', () => {
        expect(result).toStrictEqual(expressRouterFixture);
      });
    });
  });
});

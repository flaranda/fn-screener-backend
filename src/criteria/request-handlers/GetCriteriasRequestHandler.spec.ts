import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { CriteriaApiV1Fixtures } from '../fixtures/api/v1/CriteriaApiV1Fixtures';
import { CriteriaFindQueryFixtures } from '../fixtures/domain/CriteriaFindQueryFixtures';
import { CriteriaFixtures } from '../fixtures/domain/CriteriaFixtures';
import { CriteriaApiV1 } from '../models/api/v1/CriteriaApiV1';
import { Criteria } from '../models/domain/Criteria';
import { CriteriaFindQuery } from '../models/domain/CriteriaFindQuery';
import { GetCriteriasRequestHandler } from './GetCriteriasRequestHandler';

describe('GetCriteriasRequestHandler', () => {
  let findManyCriteriasInteractor: jest.Mocked<
    IInteractor<CriteriaFindQuery, Criteria[]>
  >;
  let criteriaToCriteriaApiV1Transformer: jest.Mocked<
    ITransformer<Criteria, CriteriaApiV1>
  >;

  let getCriteriasRequestHandler: GetCriteriasRequestHandler;

  beforeAll(() => {
    let expressRouterMockHandler: express.RequestHandler | undefined =
      undefined;

    const expressRouterMock: jest.Mocked<express.Router> = jest
      .fn()
      .mockImplementation(
        (
          request: express.Request,
          response: express.Response,
          next: express.NextFunction,
        ) => {
          if (expressRouterMockHandler) {
            expressRouterMockHandler(request, response, next);
          }
        },
      ) as Partial<express.Router> as jest.Mocked<express.Router>;

    expressRouterMock.use = jest
      .fn()
      .mockImplementation(
        (handler: express.RequestHandler): express.RequestHandler => {
          expressRouterMockHandler = handler;

          return expressRouterMock;
        },
      );

    (express.Router as jest.Mock).mockReturnValue(expressRouterMock);

    findManyCriteriasInteractor = {
      interact: jest.fn(),
    };

    criteriaToCriteriaApiV1Transformer = {
      transform: jest.fn(),
    };

    getCriteriasRequestHandler = new GetCriteriasRequestHandler(
      findManyCriteriasInteractor,
      criteriaToCriteriaApiV1Transformer,
    );
  });

  describe('.handler()', () => {
    let expressResponseMock: jest.Mocked<express.Response>;
    let expressNextFunctionMock: jest.Mocked<express.NextFunction>;

    beforeAll(() => {
      expressResponseMock = {
        json: jest.fn(),
      } as Partial<express.Response> as jest.Mocked<express.Response>;

      expressNextFunctionMock = jest.fn();

      findManyCriteriasInteractor.interact.mockResolvedValue([
        CriteriaFixtures.withMandatory,
      ]);

      criteriaToCriteriaApiV1Transformer.transform.mockResolvedValue(
        CriteriaApiV1Fixtures.withMandatory,
      );
    });

    describe('having a Request with ApiVersion.v1', () => {
      let expressRequestMock: RequestWithContext;

      beforeAll(() => {
        expressRequestMock = {
          [requestContextSymbol]: {
            apiVersion: ApiVersion.v1,
          },
        } as RequestWithContext;
      });

      describe('when called', () => {
        beforeAll(async () => {
          await (getCriteriasRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call FindManyCriteriasInteractor.interact()', () => {
          expect(findManyCriteriasInteractor.interact).toHaveBeenCalledTimes(1);
          expect(findManyCriteriasInteractor.interact).toHaveBeenCalledWith(
            CriteriaFindQueryFixtures.withMandatory,
          );
        });

        it('should call CriteriaToCriteriaApiV1Transformer.transform()', () => {
          expect(
            criteriaToCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            criteriaToCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledWith(CriteriaFixtures.withMandatory);
        });

        it('should call expressResponseMock.json()', () => {
          expect(expressResponseMock.json).toHaveBeenCalledTimes(1);
          expect(expressResponseMock.json).toHaveBeenCalledWith([
            CriteriaApiV1Fixtures.withMandatory,
          ]);
        });
      });
    });
  });
});

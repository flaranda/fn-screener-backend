import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { UserFixtures } from '../../user/fixtures/domain/UserFixtures';
import { SelectedCriteriaApiV1Fixtures } from '../fixtures/api/v1/SelectedCriteriaApiV1Fixtures';
import { SelectedCriteriaFindQueryFixtures } from '../fixtures/domain/SelectedCriteriaFindQueryFixtures';
import { SelectedCriteriaFixtures } from '../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteriaApiV1 } from '../models/api/v1/SelectedCriteriaApiV1';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../models/domain/SelectedCriteriaFindQuery';
import { GetUsersMeSelectedCriteriasExpressRequestHandler } from './GetUsersMeSelectedCriteriasExpressRequestHandler';

describe('GetUsersMeSelectedCriteriasExpressRequestHandler', () => {
  let findManySelectedCriteriasInteractor: jest.Mocked<
    IInteractor<SelectedCriteriaFindQuery, SelectedCriteria[]>
  >;
  let selectedCriteriaToSelectedCriteriaApiV1Transformer: jest.Mocked<
    ITransformer<SelectedCriteria, SelectedCriteriaApiV1>
  >;

  let getUsersMeSelectedCriteriasExpressRequestHandler: GetUsersMeSelectedCriteriasExpressRequestHandler;

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

    findManySelectedCriteriasInteractor = {
      interact: jest.fn(),
    };

    selectedCriteriaToSelectedCriteriaApiV1Transformer = {
      transform: jest.fn(),
    };

    getUsersMeSelectedCriteriasExpressRequestHandler =
      new GetUsersMeSelectedCriteriasExpressRequestHandler(
        findManySelectedCriteriasInteractor,
        selectedCriteriaToSelectedCriteriaApiV1Transformer,
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

      findManySelectedCriteriasInteractor.interact.mockResolvedValue([
        SelectedCriteriaFixtures.withMandatory,
      ]);

      selectedCriteriaToSelectedCriteriaApiV1Transformer.transform.mockResolvedValue(
        SelectedCriteriaApiV1Fixtures.withMandatory,
      );
    });

    describe('having an ExpressRequest with ApiVersion.v1 and User', () => {
      let expressRequestMock: RequestWithContext;

      beforeAll(() => {
        expressRequestMock = {
          [requestContextSymbol]: {
            apiVersion: ApiVersion.v1,
            user: UserFixtures.withMandatory,
          },
        } as RequestWithContext;
      });

      describe('when called', () => {
        beforeAll(async () => {
          await (getUsersMeSelectedCriteriasExpressRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call FindManySelectedCriteriasInteractor.interact()', () => {
          expect(
            findManySelectedCriteriasInteractor.interact,
          ).toHaveBeenCalledTimes(1);
          expect(
            findManySelectedCriteriasInteractor.interact,
          ).toHaveBeenCalledWith(
            SelectedCriteriaFindQueryFixtures.withUserUuid,
          );
        });

        it('should call SelectedCriteriaToSelectedCriteriaApiV1Transformer.transform()', () => {
          expect(
            selectedCriteriaToSelectedCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            selectedCriteriaToSelectedCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledWith(SelectedCriteriaFixtures.withMandatory);
        });

        it('should call expressResponseMock.json()', () => {
          expect(expressResponseMock.json).toHaveBeenCalledTimes(1);
          expect(expressResponseMock.json).toHaveBeenCalledWith([
            SelectedCriteriaApiV1Fixtures.withMandatory,
          ]);
        });
      });
    });
  });
});

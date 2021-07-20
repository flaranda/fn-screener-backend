import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { StartupFixtures } from '../../startup/fixtures/domain/StartupFixtures';
import { CriteriaComplianceApiV1Fixtures } from '../fixtures/api/v1/CriteriaComplianceApiV1Fixtures';
import { CriteriaComplianceFindQueryFixtures } from '../fixtures/domain/CriteriaComplianceFindQueryFixtures';
import { CriteriaComplianceFixtures } from '../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaComplianceApiV1 } from '../models/api/v1/CriteriaComplianceApiV1';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../models/domain/CriteriaComplianceFindQuery';
import { GetStartupsStartupUuidCriteriaCompliancesRequestHandler } from './GetStartupsStartupUuidCriteriaCompliancesRequestHandler';

describe('GetStartupsStartupUuidCriteriaCompliancesRequestHandler', () => {
  let getV1CriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer: jest.Mocked<
    ITransformer<RequestWithContext, CriteriaComplianceFindQuery>
  >;
  let findManyCriteriaCompliancesInteractor: jest.Mocked<
    IInteractor<CriteriaComplianceFindQuery, CriteriaCompliance[]>
  >;
  let criteriaComplianceToCriteriaComplianceApiV1Transformer: jest.Mocked<
    ITransformer<CriteriaCompliance, CriteriaComplianceApiV1>
  >;

  let getStartupsStartupUuidCriteriaCompliancesRequestHandler: GetStartupsStartupUuidCriteriaCompliancesRequestHandler;

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

    getV1CriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer = {
      transform: jest.fn(),
    };

    findManyCriteriaCompliancesInteractor = {
      interact: jest.fn(),
    };

    criteriaComplianceToCriteriaComplianceApiV1Transformer = {
      transform: jest.fn(),
    };

    getStartupsStartupUuidCriteriaCompliancesRequestHandler =
      new GetStartupsStartupUuidCriteriaCompliancesRequestHandler(
        getV1CriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer,
        findManyCriteriaCompliancesInteractor,
        criteriaComplianceToCriteriaComplianceApiV1Transformer,
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

      getV1CriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer.transform.mockResolvedValue(
        CriteriaComplianceFindQueryFixtures.withStartupUuid,
      );

      findManyCriteriaCompliancesInteractor.interact.mockResolvedValue([
        CriteriaComplianceFixtures.withMandatory,
      ]);

      criteriaComplianceToCriteriaComplianceApiV1Transformer.transform.mockResolvedValue(
        CriteriaComplianceApiV1Fixtures.withMandatory,
      );
    });

    describe('having an ExpressRequest with ApiVersion.v1 and Startup', () => {
      let expressRequestMock: RequestWithContext;

      beforeAll(() => {
        expressRequestMock = {
          [requestContextSymbol]: {
            apiVersion: ApiVersion.v1,
            startup: StartupFixtures.withMandatory,
          },
        } as RequestWithContext;
      });

      describe('when called', () => {
        beforeAll(async () => {
          await (getStartupsStartupUuidCriteriaCompliancesRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call GetV1CriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer.transform()', () => {
          expect(
            getV1CriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            getV1CriteriaCompliancesRequestToCriteriaComplianceFindQueryTransformer.transform,
          ).toHaveBeenCalledWith(expressRequestMock);
        });

        it('should call FindManyCriteriaCompliancesInteractor.interact()', () => {
          expect(
            findManyCriteriaCompliancesInteractor.interact,
          ).toHaveBeenCalledTimes(1);
          expect(
            findManyCriteriaCompliancesInteractor.interact,
          ).toHaveBeenCalledWith(
            CriteriaComplianceFindQueryFixtures.withStartupUuid,
          );
        });

        it('should call CriteriaComplianceToCriteriaComplianceApiV1Transformer.transform()', () => {
          expect(
            criteriaComplianceToCriteriaComplianceApiV1Transformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            criteriaComplianceToCriteriaComplianceApiV1Transformer.transform,
          ).toHaveBeenCalledWith(CriteriaComplianceFixtures.withMandatory);
        });

        it('should call expressResponseMock.json()', () => {
          expect(expressResponseMock.json).toHaveBeenCalledTimes(1);
          expect(expressResponseMock.json).toHaveBeenCalledWith([
            CriteriaComplianceApiV1Fixtures.withMandatory,
          ]);
        });
      });
    });
  });
});

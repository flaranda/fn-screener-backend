import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { UserFixtures } from '../../user/fixtures/domain/UserFixtures';
import { CriteriaComplianceApiV1Fixtures } from '../fixtures/api/v1/CriteriaComplianceApiV1Fixtures';
import { CriteriaComplianceFixtures } from '../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaComplianceUpdateQueryFixtures } from '../fixtures/domain/CriteriaComplianceUpdateQueryFixtures';
import { CriteriaComplianceApiV1 } from '../models/api/v1/CriteriaComplianceApiV1';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceUpdateQuery } from '../models/domain/CriteriaComplianceUpdateQuery';
import { PatchCriteriaCompliancesCriteriaComplianceUuidRequestHandler } from './PatchCriteriaCompliancesCriteriaComplianceUuidRequestHandler';

describe('PatchCriteriaCompliancesCriteriaComplianceUuidExpressRequestHandler', () => {
  let patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer: jest.Mocked<
    ITransformer<RequestWithContext, CriteriaComplianceUpdateQuery>
  >;
  let updateCriteriaComplianceInteractor: jest.Mocked<
    IInteractor<CriteriaComplianceUpdateQuery, CriteriaCompliance>
  >;
  let criteriaComplianceToCriteriaComplianceApiV1Transformer: jest.Mocked<
    ITransformer<CriteriaCompliance, CriteriaComplianceApiV1>
  >;

  let patchCriteriaCompliancesCriteriaComplianceUuidRequestHandler: PatchCriteriaCompliancesCriteriaComplianceUuidRequestHandler;

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

    patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer =
      {
        transform: jest.fn(),
      };

    updateCriteriaComplianceInteractor = {
      interact: jest.fn(),
    };

    criteriaComplianceToCriteriaComplianceApiV1Transformer = {
      transform: jest.fn(),
    };

    patchCriteriaCompliancesCriteriaComplianceUuidRequestHandler =
      new PatchCriteriaCompliancesCriteriaComplianceUuidRequestHandler(
        patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer,
        updateCriteriaComplianceInteractor,
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

      patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer.transform.mockResolvedValue(
        CriteriaComplianceUpdateQueryFixtures.withMandatory,
      );

      updateCriteriaComplianceInteractor.interact.mockResolvedValue(
        CriteriaComplianceFixtures.withMandatory,
      );

      criteriaComplianceToCriteriaComplianceApiV1Transformer.transform.mockResolvedValue(
        CriteriaComplianceApiV1Fixtures.withMandatory,
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
          await (patchCriteriaCompliancesCriteriaComplianceUuidRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call PatchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer.trasnform()', () => {
          expect(
            patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            patchV1CriteriaCompliancesCriteriaComplianceUuidRequestToCriteriaComplianceUpdateQueryTransformer.transform,
          ).toHaveBeenCalledWith(expressRequestMock);
        });

        it('should call UpdateCriteriaComplianceInteractor.interact()', () => {
          expect(
            updateCriteriaComplianceInteractor.interact,
          ).toHaveBeenCalledTimes(1);
          expect(
            updateCriteriaComplianceInteractor.interact,
          ).toHaveBeenCalledWith(
            CriteriaComplianceUpdateQueryFixtures.withMandatory,
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
          expect(expressResponseMock.json).toHaveBeenCalledWith(
            CriteriaComplianceApiV1Fixtures.withMandatory,
          );
        });
      });
    });
  });
});

import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { SelectedCriteriaApiV1Fixtures } from '../fixtures/api/v1/SelectedCriteriaApiV1Fixtures';
import { SelectedCriteriaFixtures } from '../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteriaUpdateQueryFixtures } from '../fixtures/domain/SelectedCriteriaUpdateQueryFixtures';
import { SelectedCriteriaApiV1 } from '../models/api/v1/SelectedCriteriaApiV1';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaUpdateQuery } from '../models/domain/SelectedCriteriaUpdateQuery';
import { PatchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler } from './PatchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler';

describe('PatchUsersMeSelectedCriteriasSelectedCriteriaUuidExpressRequestHandler', () => {
  let patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer: jest.Mocked<
    ITransformer<RequestWithContext, SelectedCriteriaUpdateQuery>
  >;
  let updateSelectedCriteriaInteractor: jest.Mocked<
    IInteractor<SelectedCriteriaUpdateQuery, SelectedCriteria>
  >;
  let matchingToSelectedCriteriaApiV1Transformer: jest.Mocked<
    ITransformer<SelectedCriteria, SelectedCriteriaApiV1>
  >;

  let patchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler: PatchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler;

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

    patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer =
      {
        transform: jest.fn(),
      };

    updateSelectedCriteriaInteractor = {
      interact: jest.fn(),
    };

    matchingToSelectedCriteriaApiV1Transformer = {
      transform: jest.fn(),
    };

    patchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler =
      new PatchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler(
        patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer,
        updateSelectedCriteriaInteractor,
        matchingToSelectedCriteriaApiV1Transformer,
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

      patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer.transform.mockResolvedValue(
        SelectedCriteriaUpdateQueryFixtures.withMandatory,
      );

      updateSelectedCriteriaInteractor.interact.mockResolvedValue(
        SelectedCriteriaFixtures.withMandatory,
      );

      matchingToSelectedCriteriaApiV1Transformer.transform.mockResolvedValue(
        SelectedCriteriaApiV1Fixtures.withMandatory,
      );
    });

    describe('having an ExpressRequest with ApiVersion.v1', () => {
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
          await (patchUsersMeSelectedCriteriasSelectedCriteriaUuidRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call PatchV1SelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer.trasnform()', () => {
          expect(
            patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            patchV1UsersMeSelectedCriteriasSelectedCriteriaUuidRequestToSelectedCriteriaUpdateQueryTransformer.transform,
          ).toHaveBeenCalledWith(expressRequestMock);
        });

        it('should call UpdateSelectedCriteriaInteractor.interact()', () => {
          expect(
            updateSelectedCriteriaInteractor.interact,
          ).toHaveBeenCalledTimes(1);
          expect(
            updateSelectedCriteriaInteractor.interact,
          ).toHaveBeenCalledWith(
            SelectedCriteriaUpdateQueryFixtures.withMandatory,
          );
        });

        it('should call SelectedCriteriaToSelectedCriteriaApiV1Transformer.transform()', () => {
          expect(
            matchingToSelectedCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            matchingToSelectedCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledWith(SelectedCriteriaFixtures.withMandatory);
        });

        it('should call expressResponseMock.json()', () => {
          expect(expressResponseMock.json).toHaveBeenCalledTimes(1);
          expect(expressResponseMock.json).toHaveBeenCalledWith(
            SelectedCriteriaApiV1Fixtures.withMandatory,
          );
        });
      });
    });
  });
});

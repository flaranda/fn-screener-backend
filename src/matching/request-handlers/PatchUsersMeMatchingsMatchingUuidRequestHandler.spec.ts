import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { UserFixtures } from '../../user/fixtures/domain/UserFixtures';
import { MatchingApiV1Fixtures } from '../fixtures/api/v1/MatchingApiV1Fixtures';
import { MatchingFixtures } from '../fixtures/domain/MatchingFixtures';
import { MatchingUpdateQueryFixtures } from '../fixtures/domain/MatchingUpdateQueryFixtures';
import { MatchingApiV1 } from '../models/api/v1/MatchingApiV1';
import { Matching } from '../models/domain/Matching';
import { MatchingUpdateQuery } from '../models/domain/MatchingUpdateQuery';
import { PatchUsersMeMatchingsMatchingUuidRequestHandler } from './PatchUsersMeMatchingsMatchingUuidRequestHandler';

describe('PatchUsersMeMatchingsMatchingUuidExpressRequestHandler', () => {
  let patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer: jest.Mocked<
    ITransformer<RequestWithContext, MatchingUpdateQuery>
  >;
  let updateMatchingInteractor: jest.Mocked<
    IInteractor<MatchingUpdateQuery, Matching>
  >;
  let matchingToMatchingApiV1Transformer: jest.Mocked<
    ITransformer<Matching, MatchingApiV1>
  >;

  let patchUsersMeMatchingsMatchingUuidRequestHandler: PatchUsersMeMatchingsMatchingUuidRequestHandler;

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

    patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer = {
      transform: jest.fn(),
    };

    updateMatchingInteractor = {
      interact: jest.fn(),
    };

    matchingToMatchingApiV1Transformer = {
      transform: jest.fn(),
    };

    patchUsersMeMatchingsMatchingUuidRequestHandler =
      new PatchUsersMeMatchingsMatchingUuidRequestHandler(
        patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer,
        updateMatchingInteractor,
        matchingToMatchingApiV1Transformer,
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

      patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer.transform.mockResolvedValue(
        MatchingUpdateQueryFixtures.withMandatory,
      );

      updateMatchingInteractor.interact.mockResolvedValue(
        MatchingFixtures.withMandatory,
      );

      matchingToMatchingApiV1Transformer.transform.mockResolvedValue(
        MatchingApiV1Fixtures.withMandatory,
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
          await (patchUsersMeMatchingsMatchingUuidRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call PatchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer.trasnform()', () => {
          expect(
            patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer.transform,
          ).toHaveBeenCalledWith(expressRequestMock);
        });

        it('should call UpdateMatchingInteractor.interact()', () => {
          expect(updateMatchingInteractor.interact).toHaveBeenCalledTimes(1);
          expect(updateMatchingInteractor.interact).toHaveBeenCalledWith(
            MatchingUpdateQueryFixtures.withMandatory,
          );
        });

        it('should call MatchingToMatchingApiV1Transformer.transform()', () => {
          expect(
            matchingToMatchingApiV1Transformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            matchingToMatchingApiV1Transformer.transform,
          ).toHaveBeenCalledWith(MatchingFixtures.withMandatory);
        });

        it('should call expressResponseMock.json()', () => {
          expect(expressResponseMock.json).toHaveBeenCalledTimes(1);
          expect(expressResponseMock.json).toHaveBeenCalledWith(
            MatchingApiV1Fixtures.withMandatory,
          );
        });
      });
    });
  });
});

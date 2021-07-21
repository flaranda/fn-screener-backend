import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { ApiVersion } from '../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { MatchingApiV1Fixtures } from '../fixtures/api/v1/MatchingApiV1Fixtures';
import { MatchingFindQueryFixtures } from '../fixtures/domain/MatchingFindQueryFixtures';
import { MatchingFixtures } from '../fixtures/domain/MatchingFixtures';
import { MatchingApiV1 } from '../models/api/v1/MatchingApiV1';
import { Matching } from '../models/domain/Matching';
import { MatchingFindQuery } from '../models/domain/MatchingFindQuery';
import { GetUsersMeMatchingsRequestHandler } from './GetUsersMeMatchingsRequestHandler';

describe('GetUsersMeMatchingsRequestHandler', () => {
  let getV1MatchingsRequestToMatchingFindQueryTransformer: jest.Mocked<
    ITransformer<RequestWithContext, MatchingFindQuery>
  >;
  let findManyMatchingsInteractor: jest.Mocked<
    IInteractor<MatchingFindQuery, Matching[]>
  >;
  let matchingToMatchingApiV1Transformer: jest.Mocked<
    ITransformer<Matching, MatchingApiV1>
  >;

  let getUsersMeMatchingsRequestHandler: GetUsersMeMatchingsRequestHandler;

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

    getV1MatchingsRequestToMatchingFindQueryTransformer = {
      transform: jest.fn(),
    };

    findManyMatchingsInteractor = {
      interact: jest.fn(),
    };

    matchingToMatchingApiV1Transformer = {
      transform: jest.fn(),
    };

    getUsersMeMatchingsRequestHandler = new GetUsersMeMatchingsRequestHandler(
      getV1MatchingsRequestToMatchingFindQueryTransformer,
      findManyMatchingsInteractor,
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

      getV1MatchingsRequestToMatchingFindQueryTransformer.transform.mockResolvedValue(
        MatchingFindQueryFixtures.withUserUuid,
      );

      findManyMatchingsInteractor.interact.mockResolvedValue([
        MatchingFixtures.withMandatory,
      ]);

      matchingToMatchingApiV1Transformer.transform.mockResolvedValue(
        MatchingApiV1Fixtures.withMandatory,
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
          await (getUsersMeMatchingsRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call GetV1MatchingsRequestToMatchingFindQueryTransformer.transform()', () => {
          expect(
            getV1MatchingsRequestToMatchingFindQueryTransformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            getV1MatchingsRequestToMatchingFindQueryTransformer.transform,
          ).toHaveBeenCalledWith(expressRequestMock);
        });

        it('should call FindManyMatchingsInteractor.interact()', () => {
          expect(findManyMatchingsInteractor.interact).toHaveBeenCalledTimes(1);
          expect(findManyMatchingsInteractor.interact).toHaveBeenCalledWith(
            MatchingFindQueryFixtures.withUserUuid,
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
          expect(expressResponseMock.json).toHaveBeenCalledWith([
            MatchingApiV1Fixtures.withMandatory,
          ]);
        });
      });
    });
  });
});

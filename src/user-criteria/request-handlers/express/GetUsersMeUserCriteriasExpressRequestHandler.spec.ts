import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { IInteractor } from '../../../common/interfaces/IInteractor';
import { ITransformer } from '../../../common/interfaces/ITransformer';
import { ApiVersion } from '../../../common/models/domain/ApiVersion';
import { requestContextSymbol } from '../../../common/models/domain/requestContextSymbol';
import { ExpressRequest } from '../../../server/models/express/ExpressRequest';
import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { UserCriteriaApiV1Fixtures } from '../../fixtures/api/v1/UserCriteriaApiV1Fixtures';
import { UserCriteriaFindQueryFixtures } from '../../fixtures/domain/UserCriteriaFindQueryFixtures';
import { UserCriteriaFixtures } from '../../fixtures/domain/UserCriteriaFixtures';
import { UserCriteriaApiV1 } from '../../models/api/v1/UserCriteriaApiV1';
import { UserCriteria } from '../../models/domain/UserCriteria';
import { UserCriteriaFindQuery } from '../../models/domain/UserCriteriaFindQuery';
import { GetUsersMeUserCriteriasExpressRequestHandler } from './GetUsersMeUserCriteriasExpressRequestHandler';

describe('GetUsersMeUserCriteriasExpressRequestHandler', () => {
  let findManyUserCriteriasInteractor: jest.Mocked<
    IInteractor<UserCriteriaFindQuery, UserCriteria[]>
  >;
  let userCriteriaToUserCriteriaApiV1Transformer: jest.Mocked<
    ITransformer<UserCriteria, UserCriteriaApiV1>
  >;

  let getUsersMeUserCriteriasExpressRequestHandler: GetUsersMeUserCriteriasExpressRequestHandler;

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

    findManyUserCriteriasInteractor = {
      interact: jest.fn(),
    };

    userCriteriaToUserCriteriaApiV1Transformer = {
      transform: jest.fn(),
    };

    getUsersMeUserCriteriasExpressRequestHandler =
      new GetUsersMeUserCriteriasExpressRequestHandler(
        findManyUserCriteriasInteractor,
        userCriteriaToUserCriteriaApiV1Transformer,
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

      findManyUserCriteriasInteractor.interact.mockResolvedValue([
        UserCriteriaFixtures.withMandatory,
      ]);

      userCriteriaToUserCriteriaApiV1Transformer.transform.mockResolvedValue(
        UserCriteriaApiV1Fixtures.withMandatory,
      );
    });

    describe('having an ExpressRequest with ApiVersion.v1 and User', () => {
      let expressRequestMock: ExpressRequest;

      beforeAll(() => {
        expressRequestMock = {
          [requestContextSymbol]: {
            apiVersion: ApiVersion.v1,
            user: UserFixtures.withMandatory,
          },
        } as ExpressRequest;
      });

      describe('when called', () => {
        beforeAll(async () => {
          await (getUsersMeUserCriteriasExpressRequestHandler.handler(
            expressRequestMock,
            expressResponseMock,
            expressNextFunctionMock,
          ) as unknown as Promise<void>);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call FindManyUserCriteriasInteractor.interact()', () => {
          expect(
            findManyUserCriteriasInteractor.interact,
          ).toHaveBeenCalledTimes(1);
          expect(findManyUserCriteriasInteractor.interact).toHaveBeenCalledWith(
            UserCriteriaFindQueryFixtures.withUserUuid,
          );
        });

        it('should call UserCriteriaToUserCriteriaApiV1Transformer.transform()', () => {
          expect(
            userCriteriaToUserCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledTimes(1);
          expect(
            userCriteriaToUserCriteriaApiV1Transformer.transform,
          ).toHaveBeenCalledWith(UserCriteriaFixtures.withMandatory);
        });

        it('should call expressResponseMock.json()', () => {
          expect(expressResponseMock.json).toHaveBeenCalledTimes(1);
          expect(expressResponseMock.json).toHaveBeenCalledWith([
            UserCriteriaApiV1Fixtures.withMandatory,
          ]);
        });
      });
    });
  });
});

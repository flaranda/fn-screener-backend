import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { RequestContextFixtures } from '../../common/fixtures/domain/RequestContextFixtures';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { StartupFixtures } from '../fixtures/domain/StartupFixtures';
import { Startup } from '../models/domain/Startup';
import { StartupFindQuery } from '../models/domain/StartupFindQuery';
import { StartupUuidRequestParamHandler } from './StartupUuidRequestParamHandler';

describe('StartupUuidRequestParamHandler', () => {
  let findOneStartupInteractor: jest.Mocked<
    IInteractor<StartupFindQuery, Startup>
  >;

  let startupUuidRequestParamHandler: StartupUuidRequestParamHandler;

  beforeAll(() => {
    findOneStartupInteractor = {
      interact: jest.fn(),
    };

    startupUuidRequestParamHandler = new StartupUuidRequestParamHandler(
      findOneStartupInteractor,
    );
  });

  describe('.handler()', () => {
    let apiVersionParamNameFixture: string;
    let responseFixture: express.Response;

    beforeAll(() => {
      apiVersionParamNameFixture = 'startupUuid';
      responseFixture = {} as express.Response;

      findOneStartupInteractor.interact.mockResolvedValue(
        StartupFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let requestFixture: RequestWithContext;
      let nextMock: express.NextFunction;

      // eslint-disable-next-line jest/no-done-callback
      beforeAll((done: jest.DoneCallback) => {
        requestFixture = {
          [requestContextSymbol]: {},
        } as RequestWithContext;

        nextMock = jest.fn().mockImplementation(() => {
          done();
        });

        startupUuidRequestParamHandler.handler(
          requestFixture,
          responseFixture,
          nextMock,
          StartupFixtures.withMandatory.uuid,
          apiVersionParamNameFixture,
        );
      });

      it('should populate RequestContext with Startup', () => {
        expect(requestFixture[requestContextSymbol]).toStrictEqual(
          RequestContextFixtures.withStartup,
        );
      });

      it('should call nextMock()', () => {
        expect(nextMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});

import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { RequestContextFixtures } from '../../common/fixtures/domain/RequestContextFixtures';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { MatchingFixtures } from '../fixtures/domain/MatchingFixtures';
import { Matching } from '../models/domain/Matching';
import { MatchingFindQuery } from '../models/domain/MatchingFindQuery';
import { MatchingUuidRequestParamHandler } from './MatchingUuidRequestParamHandler';

describe('MatchingUuidRequestParamHandler', () => {
  let findOneMatchingInteractor: jest.Mocked<
    IInteractor<MatchingFindQuery, Matching>
  >;

  let matchingUuidRequestParamHandler: MatchingUuidRequestParamHandler;

  beforeAll(() => {
    findOneMatchingInteractor = {
      interact: jest.fn(),
    };

    matchingUuidRequestParamHandler = new MatchingUuidRequestParamHandler(
      findOneMatchingInteractor,
    );
  });

  describe('.handler()', () => {
    let apiVersionParamNameFixture: string;
    let responseFixture: express.Response;

    beforeAll(() => {
      apiVersionParamNameFixture = 'matchingUuid';
      responseFixture = {} as express.Response;

      findOneMatchingInteractor.interact.mockResolvedValue(
        MatchingFixtures.withMandatory,
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

        matchingUuidRequestParamHandler.handler(
          requestFixture,
          responseFixture,
          nextMock,
          MatchingFixtures.withMandatory.uuid,
          apiVersionParamNameFixture,
        );
      });

      it('should populate RequestContext with Matching', () => {
        expect(requestFixture[requestContextSymbol]).toStrictEqual(
          RequestContextFixtures.withMatching,
        );
      });

      it('should call nextMock()', () => {
        expect(nextMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});

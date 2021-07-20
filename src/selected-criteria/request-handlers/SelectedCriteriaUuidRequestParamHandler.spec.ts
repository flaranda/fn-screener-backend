import 'reflect-metadata';

jest.mock('express');

import express from 'express';

import { RequestContextFixtures } from '../../common/fixtures/domain/RequestContextFixtures';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { SelectedCriteriaFixtures } from '../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../models/domain/SelectedCriteriaFindQuery';
import { SelectedCriteriaUuidRequestParamHandler } from './SelectedCriteriaUuidRequestParamHandler';

describe('SelectedCriteriaUuidRequestParamHandler', () => {
  let findOneSelectedCriteriaInteractor: jest.Mocked<
    IInteractor<SelectedCriteriaFindQuery, SelectedCriteria>
  >;

  let selectedCriteriaUuidRequestParamHandler: SelectedCriteriaUuidRequestParamHandler;

  beforeAll(() => {
    findOneSelectedCriteriaInteractor = {
      interact: jest.fn(),
    };

    selectedCriteriaUuidRequestParamHandler =
      new SelectedCriteriaUuidRequestParamHandler(
        findOneSelectedCriteriaInteractor,
      );
  });

  describe('.handler()', () => {
    let apiVersionParamNameFixture: string;
    let responseFixture: express.Response;

    beforeAll(() => {
      apiVersionParamNameFixture = 'selectedCriteriaUuid';
      responseFixture = {} as express.Response;

      findOneSelectedCriteriaInteractor.interact.mockResolvedValue(
        SelectedCriteriaFixtures.withMandatory,
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

        selectedCriteriaUuidRequestParamHandler.handler(
          requestFixture,
          responseFixture,
          nextMock,
          SelectedCriteriaFixtures.withMandatory.uuid,
          apiVersionParamNameFixture,
        );
      });

      it('should populate RequestContext with SelectedCriteria', () => {
        expect(requestFixture[requestContextSymbol]).toStrictEqual(
          RequestContextFixtures.withSelectedCriteria,
        );
      });

      it('should call nextMock()', () => {
        expect(nextMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});

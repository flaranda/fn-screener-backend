import 'reflect-metadata';

import express from 'express';

import { RequestContextFixtures } from '../../common/fixtures/domain/RequestContextFixtures';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { CriteriaComplianceFixtures } from '../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaCompliance } from '../models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../models/domain/CriteriaComplianceFindQuery';
import { CriteriaComplianceUuidRequestParamHandler } from './CriteriaComplianceUuidRequestParamHandler';

describe('CriteriaComplianceUuidRequestParamHandler', () => {
  let findOneCriteriaComplianceInteractor: jest.Mocked<
    IInteractor<CriteriaComplianceFindQuery, CriteriaCompliance>
  >;

  let criteriaComplianceUuidRequestParamHandler: CriteriaComplianceUuidRequestParamHandler;

  beforeAll(() => {
    findOneCriteriaComplianceInteractor = {
      interact: jest.fn(),
    };

    criteriaComplianceUuidRequestParamHandler =
      new CriteriaComplianceUuidRequestParamHandler(
        findOneCriteriaComplianceInteractor,
      );
  });

  describe('.handler()', () => {
    let apiVersionParamNameFixture: string;
    let responseFixture: express.Response;

    beforeAll(() => {
      apiVersionParamNameFixture = 'criteriaComplianceUuid';
      responseFixture = {} as express.Response;

      findOneCriteriaComplianceInteractor.interact.mockResolvedValue(
        CriteriaComplianceFixtures.withMandatory,
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

        criteriaComplianceUuidRequestParamHandler.handler(
          requestFixture,
          responseFixture,
          nextMock,
          CriteriaComplianceFixtures.withMandatory.uuid,
          apiVersionParamNameFixture,
        );
      });

      it('should populate RequestContext with CriteriaCompliance', () => {
        expect(requestFixture[requestContextSymbol]).toStrictEqual(
          RequestContextFixtures.withCriteriaCompliance,
        );
      });

      it('should call nextMock()', () => {
        expect(nextMock).toHaveBeenCalledTimes(1);
      });
    });
  });
});

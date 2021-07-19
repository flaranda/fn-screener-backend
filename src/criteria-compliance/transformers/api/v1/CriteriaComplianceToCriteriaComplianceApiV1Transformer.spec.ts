import 'reflect-metadata';

import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { CriteriaFindQueryFixtures } from '../../../../criteria/fixtures/domain/CriteriaFindQueryFixtures';
import { CriteriaFixtures } from '../../../../criteria/fixtures/domain/CriteriaFixtures';
import { Criteria } from '../../../../criteria/models/domain/Criteria';
import { CriteriaFindQuery } from '../../../../criteria/models/domain/CriteriaFindQuery';
import { StartupFindQueryFixtures } from '../../../../startup/fixtures/domain/StartupFindQueryFixtures';
import { StartupFixtures } from '../../../../startup/fixtures/domain/StartupFixtures';
import { Startup } from '../../../../startup/models/domain/Startup';
import { StartupFindQuery } from '../../../../startup/models/domain/StartupFindQuery';
import { CriteriaComplianceApiV1Fixtures } from '../../../fixtures/api/v1/CriteriaComplianceApiV1Fixtures';
import { CriteriaComplianceFixtures } from '../../../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaComplianceToCriteriaComplianceApiV1Transformer } from './CriteriaComplianceToCriteriaComplianceApiV1Transformer';

describe('CriteriaComplianceToCriteriaComplianceApiV1Transformer', () => {
  let findOneCriteriaInteractor: jest.Mocked<
    IInteractor<CriteriaFindQuery, Criteria>
  >;
  let findOneStartupInteractor: jest.Mocked<
    IInteractor<StartupFindQuery, Startup>
  >;

  let selectedCriteriaToCriteriaComplianceApiV1Transformer: CriteriaComplianceToCriteriaComplianceApiV1Transformer;

  beforeAll(() => {
    findOneCriteriaInteractor = {
      interact: jest.fn(),
    };

    findOneStartupInteractor = {
      interact: jest.fn(),
    };

    selectedCriteriaToCriteriaComplianceApiV1Transformer =
      new CriteriaComplianceToCriteriaComplianceApiV1Transformer(
        findOneCriteriaInteractor,
        findOneStartupInteractor,
      );
  });

  describe('.transform()', () => {
    beforeAll(() => {
      findOneCriteriaInteractor.interact.mockResolvedValue(
        CriteriaFixtures.withMandatory,
      );

      findOneStartupInteractor.interact.mockResolvedValue(
        StartupFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await selectedCriteriaToCriteriaComplianceApiV1Transformer.transform(
            CriteriaComplianceFixtures.withMandatory,
          );
      });

      it('should call FindOneCriteriaInteractor.interact()', () => {
        expect(findOneCriteriaInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findOneCriteriaInteractor.interact).toHaveBeenCalledWith(
          CriteriaFindQueryFixtures.withUuid,
        );
      });

      it('should call FindOneStartupInteractor.interact()', () => {
        expect(findOneStartupInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findOneStartupInteractor.interact).toHaveBeenCalledWith(
          StartupFindQueryFixtures.withUuid,
        );
      });

      it('should return a CriteriaComplianceApiV1', () => {
        expect(result).toStrictEqual(
          CriteriaComplianceApiV1Fixtures.withMandatory,
        );
      });
    });
  });
});

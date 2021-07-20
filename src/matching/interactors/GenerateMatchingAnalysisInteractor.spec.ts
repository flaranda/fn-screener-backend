import 'reflect-metadata';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { CriteriaComplianceFindQueryFixtures } from '../../criteria-compliance/fixtures/domain/CriteriaComplianceFindQueryFixtures';
import { CriteriaComplianceFixtures } from '../../criteria-compliance/fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaCompliance } from '../../criteria-compliance/models/domain/CriteriaCompliance';
import { CriteriaComplianceFindQuery } from '../../criteria-compliance/models/domain/CriteriaComplianceFindQuery';
import { SelectedCriteriaFindQueryFixtures } from '../../selected-criteria/fixtures/domain/SelectedCriteriaFindQueryFixtures';
import { SelectedCriteriaFixtures } from '../../selected-criteria/fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteria } from '../../selected-criteria/models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../../selected-criteria/models/domain/SelectedCriteriaFindQuery';
import { MatchingAnalysisFixtures } from '../fixtures/domain/MatchingAnalysisFixtures';
import { MatchingAnalysisGenerationQueryFixtures } from '../fixtures/domain/MatchingAnalysisGenerationQueryFixtures';
import { GenerateMatchingAnalysisInteractor } from './GenerateMatchingAnalysisInteractor';

describe('GenerateMatchingAnalysisInteractor', () => {
  let findManySelectedCriteriasInteractor: jest.Mocked<
    IInteractor<SelectedCriteriaFindQuery, SelectedCriteria[]>
  >;
  let findManyCriteriaCompliancesInteractor: jest.Mocked<
    IInteractor<CriteriaComplianceFindQuery, CriteriaCompliance[]>
  >;

  let generateMatchingAnalysisInteractor: GenerateMatchingAnalysisInteractor;

  beforeAll(() => {
    findManySelectedCriteriasInteractor = {
      interact: jest.fn(),
    };

    findManyCriteriaCompliancesInteractor = {
      interact: jest.fn(),
    };

    generateMatchingAnalysisInteractor = new GenerateMatchingAnalysisInteractor(
      findManySelectedCriteriasInteractor,
      findManyCriteriaCompliancesInteractor,
    );
  });

  describe('.interact()', () => {
    beforeAll(() => {
      findManySelectedCriteriasInteractor.interact.mockResolvedValue([
        SelectedCriteriaFixtures.withMandatory,
      ]);

      findManyCriteriaCompliancesInteractor.interact.mockResolvedValue([
        CriteriaComplianceFixtures.withMandatory,
      ]);
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await generateMatchingAnalysisInteractor.interact(
          MatchingAnalysisGenerationQueryFixtures.withMandatory,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call FindManySelectedCriteriasInteractor.interact()', () => {
        expect(
          findManySelectedCriteriasInteractor.interact,
        ).toHaveBeenCalledTimes(1);
        expect(
          findManySelectedCriteriasInteractor.interact,
        ).toHaveBeenCalledWith(SelectedCriteriaFindQueryFixtures.withUserUuid);
      });

      it('should call FindManyCriteriaCompliancesInteractor.interact()', () => {
        expect(
          findManyCriteriaCompliancesInteractor.interact,
        ).toHaveBeenCalledTimes(1);
        expect(
          findManyCriteriaCompliancesInteractor.interact,
        ).toHaveBeenCalledWith(
          CriteriaComplianceFindQueryFixtures.withStartupUuid,
        );
      });
    });

    describe('when called, and FindManySelectedCriteriasInteractor.interact() returns empty array', () => {
      let result: unknown;

      beforeAll(async () => {
        findManySelectedCriteriasInteractor.interact.mockResolvedValueOnce([]);

        result = await generateMatchingAnalysisInteractor.interact(
          MatchingAnalysisGenerationQueryFixtures.withMandatory,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return a MatchingAnalysis with all properties set to 0', () => {
        expect(result).toStrictEqual(MatchingAnalysisFixtures.withMandatory);
      });
    });

    describe('when called, and FindManyCriteriaCompliancesInteractor.interact() returns empty array', () => {
      let result: unknown;

      beforeAll(async () => {
        findManyCriteriaCompliancesInteractor.interact.mockResolvedValueOnce(
          [],
        );

        result = await generateMatchingAnalysisInteractor.interact(
          MatchingAnalysisGenerationQueryFixtures.withMandatory,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return a MatchingAnalysis with all properties set to 0', () => {
        expect(result).toStrictEqual(MatchingAnalysisFixtures.withMandatory);
      });
    });

    describe('when called, and the interactors return fixed cases', () => {
      let result: unknown;

      beforeAll(async () => {
        findManySelectedCriteriasInteractor.interact.mockResolvedValueOnce([
          SelectedCriteriaFixtures.withImportanceMustHaveAndCriteriaUuidFixed,
          SelectedCriteriaFixtures.withImportanceNiceToHaveAndCriteriaUuidFixed,
          SelectedCriteriaFixtures.withImportanceSuperNiceToHaveAndCriteriaUuidFixed,
        ]);

        findManyCriteriaCompliancesInteractor.interact.mockResolvedValueOnce([
          CriteriaComplianceFixtures.withAnswerYesAndCriteriaUuidFixed,
          CriteriaComplianceFixtures.withAnswerNoAnswerAndCriteriaUuidFixed,
          CriteriaComplianceFixtures.withAnswerNoAndCriteriaUuidFixed,
        ]);

        result = await generateMatchingAnalysisInteractor.interact(
          MatchingAnalysisGenerationQueryFixtures.withMandatory,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return a MatchingAnalysis with all properties set to fixed values', () => {
        expect(result).toStrictEqual(MatchingAnalysisFixtures.withFixedValues);
      });
    });
  });
});

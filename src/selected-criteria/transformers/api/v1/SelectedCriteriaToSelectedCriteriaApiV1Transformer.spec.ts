import 'reflect-metadata';

import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { CriteriaFindQueryFixtures } from '../../../../criteria/fixtures/domain/CriteriaFindQueryFixtures';
import { CriteriaFixtures } from '../../../../criteria/fixtures/domain/CriteriaFixtures';
import { Criteria } from '../../../../criteria/models/domain/Criteria';
import { CriteriaFindQuery } from '../../../../criteria/models/domain/CriteriaFindQuery';
import { SelectedCriteriaApiV1Fixtures } from '../../../fixtures/api/v1/SelectedCriteriaApiV1Fixtures';
import { SelectedCriteriaFixtures } from '../../../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteriaToSelectedCriteriaApiV1Transformer } from './SelectedCriteriaToSelectedCriteriaApiV1Transformer';

describe('SelectedCriteriaToSelectedCriteriaApiV1Transformer', () => {
  let findOneCriteriaInteractor: jest.Mocked<
    IInteractor<CriteriaFindQuery, Criteria>
  >;

  let selectedCriteriaToSelectedCriteriaApiV1Transformer: SelectedCriteriaToSelectedCriteriaApiV1Transformer;

  beforeAll(() => {
    findOneCriteriaInteractor = {
      interact: jest.fn(),
    };

    selectedCriteriaToSelectedCriteriaApiV1Transformer =
      new SelectedCriteriaToSelectedCriteriaApiV1Transformer(
        findOneCriteriaInteractor,
      );
  });

  describe('.transform()', () => {
    beforeAll(() => {
      findOneCriteriaInteractor.interact.mockResolvedValue(
        CriteriaFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await selectedCriteriaToSelectedCriteriaApiV1Transformer.transform(
            SelectedCriteriaFixtures.withMandatory,
          );
      });

      it('should call FindOneCriteriaInteractor.interact()', () => {
        expect(findOneCriteriaInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findOneCriteriaInteractor.interact).toHaveBeenCalledWith(
          CriteriaFindQueryFixtures.withUuid,
        );
      });

      it('should return a SelectedCriteriaApiV1', () => {
        expect(result).toStrictEqual(
          SelectedCriteriaApiV1Fixtures.withMandatory,
        );
      });
    });
  });
});

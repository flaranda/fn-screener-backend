import 'reflect-metadata';

import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { CriteriaFindQueryFixtues } from '../../../../criteria/fixtures/domain/CriteriaFindQueryFixtures';
import { CriteriaFixtures } from '../../../../criteria/fixtures/domain/CriteriaFixtures';
import { Criteria } from '../../../../criteria/models/domain/Criteria';
import { CriteriaFindQuery } from '../../../../criteria/models/domain/CriteriaFindQuery';
import { UserCriteriaApiV1Fixtures } from '../../../fixtures/api/v1/UserCriteriaApiV1Fixtures';
import { UserCriteriaFixtures } from '../../../fixtures/domain/UserCriteriaFixtures';
import { UserCriteriaToUserCriteriaApiV1Transformer } from './UserCriteriaToUserCriteriaApiV1Transformer';

describe('UserCriteriaToUserCriteriaApiV1Transformer', () => {
  let findOneCriteriaInteractor: jest.Mocked<
    IInteractor<CriteriaFindQuery, Criteria>
  >;

  let userCriteriaToUserCriteriaApiV1Transformer: UserCriteriaToUserCriteriaApiV1Transformer;

  beforeAll(() => {
    findOneCriteriaInteractor = {
      interact: jest.fn(),
    };

    userCriteriaToUserCriteriaApiV1Transformer =
      new UserCriteriaToUserCriteriaApiV1Transformer(findOneCriteriaInteractor);
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
        result = await userCriteriaToUserCriteriaApiV1Transformer.transform(
          UserCriteriaFixtures.withMandatory,
        );
      });

      it('should call FindOneCriteriaInteractor.interact()', () => {
        expect(findOneCriteriaInteractor.interact).toHaveBeenCalledTimes(1);
        expect(findOneCriteriaInteractor.interact).toHaveBeenCalledWith(
          CriteriaFindQueryFixtues.withUuid,
        );
      });

      it('should return a UserCriteriaApiV1', () => {
        expect(result).toStrictEqual(UserCriteriaApiV1Fixtures.withMandatory);
      });
    });
  });
});

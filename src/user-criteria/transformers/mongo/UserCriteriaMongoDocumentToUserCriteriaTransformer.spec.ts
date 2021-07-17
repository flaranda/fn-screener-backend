import 'reflect-metadata';

import { UserCriteriaFixtures } from '../../fixtures/domain/UserCriteriaFixtures';
import { UserCriteriaMongoDocumentFixtures } from '../../fixtures/mongo/UserCriteriaMongoDocumentFixtures';
import { UserCriteriaMongoDocumentToUserCriteriaTransformer } from './UserCriteriaMongoDocumentToUserCriteriaTransformer';

describe('UserCriteriaMongoDocumentToUserCriteriaTransformer', () => {
  let userCriteriaMongoDocumentToUserCriteriaTransformer: UserCriteriaMongoDocumentToUserCriteriaTransformer;

  beforeAll(() => {
    userCriteriaMongoDocumentToUserCriteriaTransformer =
      new UserCriteriaMongoDocumentToUserCriteriaTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result =
          await userCriteriaMongoDocumentToUserCriteriaTransformer.transform(
            UserCriteriaMongoDocumentFixtures.withMandatory,
          );
      });

      it('should return a UserCriteria', () => {
        expect(result).toStrictEqual(UserCriteriaFixtures.withMandatory);
      });
    });
  });
});

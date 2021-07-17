import 'reflect-metadata';

import { UserFixtures } from '../../fixtures/domain/UserFixtures';
import { UserMongoDocumentFixtures } from '../../fixtures/mongo/UserMongoDocumentFixtures';
import { UserMongoDocumentToUserTransformer } from './UserMongoDocumentToUserTransformer';

describe('UserMongoDocumentToUserTransformer', () => {
  let criteriaMongoDocumentToUserTransformer: UserMongoDocumentToUserTransformer;

  beforeAll(() => {
    criteriaMongoDocumentToUserTransformer =
      new UserMongoDocumentToUserTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await criteriaMongoDocumentToUserTransformer.transform(
          UserMongoDocumentFixtures.withMandatory,
        );
      });

      it('should returns a User', () => {
        expect(result).toStrictEqual(UserFixtures.withMandatory);
      });
    });
  });
});

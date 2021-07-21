import 'reflect-metadata';

import { UserFixtures } from '../../fixtures/domain/UserFixtures';
import { UserMongoDocumentFixtures } from '../../fixtures/mongo/UserMongoDocumentFixtures';
import { UserMongoDocumentToUserTransformer } from './UserMongoDocumentToUserTransformer';

describe('UserMongoDocumentToUserTransformer', () => {
  let userMongoDocumentToUserTransformer: UserMongoDocumentToUserTransformer;

  beforeAll(() => {
    userMongoDocumentToUserTransformer =
      new UserMongoDocumentToUserTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await userMongoDocumentToUserTransformer.transform(
          UserMongoDocumentFixtures.withMandatory,
        );
      });

      it('should return a User', () => {
        expect(result).toStrictEqual(UserFixtures.withMandatory);
      });
    });
  });
});

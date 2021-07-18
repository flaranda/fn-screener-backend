import 'reflect-metadata';

import { StartupFixtures } from '../../fixtures/domain/StartupFixtures';
import { StartupMongoDocumentFixtures } from '../../fixtures/mongo/StartupMongoDocumentFixtures';
import { StartupMongoDocumentToStartupTransformer } from './StartupMongoDocumentToStartupTransformer';

describe('StartupMongoDocumentToStartupTransformer', () => {
  let startupMongoDocumentToStartupTransformer: StartupMongoDocumentToStartupTransformer;

  beforeAll(() => {
    startupMongoDocumentToStartupTransformer =
      new StartupMongoDocumentToStartupTransformer();
  });

  describe('.transform()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await startupMongoDocumentToStartupTransformer.transform(
          StartupMongoDocumentFixtures.withMandatory,
        );
      });

      it('should return a Startup', () => {
        expect(result).toStrictEqual(StartupFixtures.withMandatory);
      });
    });
  });
});

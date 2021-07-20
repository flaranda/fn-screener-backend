import 'reflect-metadata';
import { IInteractor } from '../../../../common/interfaces/IInteractor';
import { StartupFixtures } from '../../../../startup/fixtures/domain/StartupFixtures';
import { Startup } from '../../../../startup/models/domain/Startup';
import { StartupFindQuery } from '../../../../startup/models/domain/StartupFindQuery';
import { MatchingApiV1Fixtures } from '../../../fixtures/api/v1/MatchingApiV1Fixtures';
import { MatchingFixtures } from '../../../fixtures/domain/MatchingFixtures';
import { MatchingToMatchingApiV1Transformer } from './MatchingToMatchingApiV1Transformer';

describe('MatchingToMatchingApiV1Transformer', () => {
  let findOneStartupInteractor: jest.Mocked<
    IInteractor<StartupFindQuery, Startup>
  >;

  let matchingToMatchingApiV1Transformer: MatchingToMatchingApiV1Transformer;

  beforeAll(() => {
    findOneStartupInteractor = {
      interact: jest.fn(),
    };

    matchingToMatchingApiV1Transformer = new MatchingToMatchingApiV1Transformer(
      findOneStartupInteractor,
    );
  });

  describe('.transform()', () => {
    beforeAll(() => {
      findOneStartupInteractor.interact.mockResolvedValue(
        StartupFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await matchingToMatchingApiV1Transformer.transform(
          MatchingFixtures.withMandatory,
        );
      });

      it('should return a MatchingApiV1', () => {
        expect(result).toStrictEqual(MatchingApiV1Fixtures.withMandatory);
      });
    });
  });
});

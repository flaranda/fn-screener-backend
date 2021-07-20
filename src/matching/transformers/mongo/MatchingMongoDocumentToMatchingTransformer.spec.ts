import 'reflect-metadata';

import { IInteractor } from '../../../common/interfaces/IInteractor';
import { MatchingFixtures } from '../../fixtures/domain/MatchingFixtures';
import { MatchingMongoDocumentFixtures } from '../../fixtures/mongo/MatchingMongoDocumentFixtures';
import { MatchingAnalysis } from '../../models/domain/MatchingAnalysis';
import { MatchingAnalysisGenerationQuery } from '../../models/domain/MatchingAnalysisGenerationQuery';
import { MatchingMongoDocumentToMatchingTransformer } from './MatchingMongoDocumentToMatchingTransformer';

describe('MatchingMongoDocumentToMatchingTransformer', () => {
  let generateMatchingAnalysisInteractor: jest.Mocked<
    IInteractor<MatchingAnalysisGenerationQuery, MatchingAnalysis>
  >;

  let matchingMongoDocumentToMatchingTransformer: MatchingMongoDocumentToMatchingTransformer;

  beforeAll(() => {
    generateMatchingAnalysisInteractor = {
      interact: jest.fn(),
    };

    matchingMongoDocumentToMatchingTransformer =
      new MatchingMongoDocumentToMatchingTransformer(
        generateMatchingAnalysisInteractor,
      );
  });

  describe('.transform()', () => {
    beforeAll(() => {
      generateMatchingAnalysisInteractor.interact.mockResolvedValue(
        MatchingFixtures.withMandatory.analysis,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await matchingMongoDocumentToMatchingTransformer.transform(
          MatchingMongoDocumentFixtures.withMandatory,
        );
      });

      it('should return a Matching', () => {
        expect(result).toStrictEqual(MatchingFixtures.withMandatory);
      });
    });
  });
});

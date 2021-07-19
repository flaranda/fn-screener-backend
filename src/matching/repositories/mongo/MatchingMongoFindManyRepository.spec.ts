import 'reflect-metadata';

import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { MatchingFindQueryFixtures } from '../../fixtures/domain/MatchingFindQueryFixtures';
import { MatchingFixtures } from '../../fixtures/domain/MatchingFixtures';
import { MatchingMongoDocumentFixtures } from '../../fixtures/mongo/MatchingMongoDocumentFixtures';
import { Matching } from '../../models/domain/Matching';
import { MatchingMongo } from '../../models/mongo/MatchingMongo';
import { MatchingMongoFindManyRepository } from './MatchingMongoFindManyRepository';

describe('MatchingMongoFindManyRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<MatchingMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let matchingMongoDocumentToMatchingTransformer: jest.Mocked<
    ITransformer<MatchingMongo, Matching>
  >;

  let matchingMongoFindManyRepository: MatchingMongoFindManyRepository;

  beforeAll(() => {
    mongooseModel = {
      find: jest.fn(),
    } as Partial<mongoose.Model<MatchingMongo>> as jest.Mocked<
      mongoose.Model<MatchingMongo>
    >;

    mongooseConnection = {
      model: jest.fn().mockReturnValue(mongooseModel),
    } as Partial<mongoose.Connection> as jest.Mocked<mongoose.Connection>;

    mongoDatasource = {
      connection: mongooseConnection,
    } as Partial<MongoDatasource> as jest.Mocked<MongoDatasource>;

    matchingMongoDocumentToMatchingTransformer = {
      transform: jest.fn(),
    };

    matchingMongoFindManyRepository = new MatchingMongoFindManyRepository(
      mongoDatasource,
      matchingMongoDocumentToMatchingTransformer,
    );
  });

  describe('.findMany()', () => {
    beforeAll(() => {
      mongooseModel.find.mockResolvedValue([
        MatchingMongoDocumentFixtures.withMandatory,
      ]);

      matchingMongoDocumentToMatchingTransformer.transform.mockResolvedValue(
        MatchingFixtures.withMandatory,
      );
    });

    describe('having an MatchingFindQuery with userUuid property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await matchingMongoFindManyRepository.findMany(
            MatchingFindQueryFixtures.withUserUuid,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.find()', () => {
          expect(mongooseModel.find).toHaveBeenCalledTimes(1);
          expect(mongooseModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
              user_uuid: MatchingFindQueryFixtures.withUserUuid.userUuid,
            }),
          );
        });
      });
    });
  });
});

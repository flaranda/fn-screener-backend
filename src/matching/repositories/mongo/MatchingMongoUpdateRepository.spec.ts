import 'reflect-metadata';

import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { MatchingFixtures } from '../../fixtures/domain/MatchingFixtures';
import { MatchingUpdateQueryFixtures } from '../../fixtures/domain/MatchingUpdateQueryFixtures';
import { MatchingMongoDocumentFixtures } from '../../fixtures/mongo/MatchingMongoDocumentFixtures';
import { MatchingMongoFixtures } from '../../fixtures/mongo/MatchingMongoFixtures';
import { Matching } from '../../models/domain/Matching';
import { MatchingMongo } from '../../models/mongo/MatchingMongo';
import { MatchingMongoUpdateRepository } from './MatchingMongoUpdateRepository';

describe('MatchingMongoUpdateRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<MatchingMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let matchingMongoDocumentToMatchingTransformer: jest.Mocked<
    ITransformer<MatchingMongo, Matching>
  >;

  let matchingMongoUpdateRepository: MatchingMongoUpdateRepository;

  beforeAll(() => {
    mongooseModel = {
      findOneAndUpdate: jest.fn(),
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

    matchingMongoUpdateRepository = new MatchingMongoUpdateRepository(
      mongoDatasource,
      matchingMongoDocumentToMatchingTransformer,
    );
  });

  describe('.update()', () => {
    beforeAll(() => {
      mongooseModel.findOneAndUpdate.mockResolvedValue(
        MatchingMongoDocumentFixtures.withMandatory,
      );

      matchingMongoDocumentToMatchingTransformer.transform.mockResolvedValue(
        MatchingFixtures.withMandatory,
      );
    });

    describe('having an MatchingUpdateQuery with statusReason property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await matchingMongoUpdateRepository.update(
            MatchingUpdateQueryFixtures.withStatusReason,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.findOneAndUpdate()', () => {
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledWith(
            expect.objectContaining({
              uuid: MatchingUpdateQueryFixtures.withStatusReason.uuid,
            }),
            expect.objectContaining({
              status_reason:
                MatchingMongoFixtures.withStatusReason.status_reason,
            }),
            expect.any(Object),
          );
        });
      });
    });

    describe('having an MatchingUpdateQuery with status property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await matchingMongoUpdateRepository.update(
            MatchingUpdateQueryFixtures.withStatus,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.findOneAndUpdate()', () => {
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledWith(
            expect.objectContaining({
              uuid: MatchingUpdateQueryFixtures.withStatus.uuid,
            }),
            expect.objectContaining({
              status: MatchingMongoFixtures.withMandatory.status,
            }),
            expect.any(Object),
          );
        });
      });
    });
  });
});

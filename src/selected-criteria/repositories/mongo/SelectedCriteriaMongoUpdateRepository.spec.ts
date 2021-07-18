import 'reflect-metadata';

import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { SelectedCriteriaFixtures } from '../../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteriaUpdateQueryFixtures } from '../../fixtures/domain/SelectedCriteriaUpdateQueryFixtures';
import { SelectedCriteriaMongoDocumentFixtures } from '../../fixtures/mongo/SelectedCriteriaMongoDocumentFixtures';
import { SelectedCriteriaMongoFixtures } from '../../fixtures/mongo/SelectedCriteriaMongoFixtures';
import { SelectedCriteria } from '../../models/domain/SelectedCriteria';
import { SelectedCriteriaMongo } from '../../models/mongo/SelectedCriteriaMongo';
import { SelectedCriteriaMongoUpdateRepository } from './SelectedCriteriaMongoUpdateRepository';

describe('SelectedCriteriaMongoUpdateRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<SelectedCriteriaMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let selectedCriteriaMongoDocumentToSelectedCriteriaTransformer: jest.Mocked<
    ITransformer<SelectedCriteriaMongo, SelectedCriteria>
  >;

  let selectedCriteriaMongoUpdateRepository: SelectedCriteriaMongoUpdateRepository;

  beforeAll(() => {
    mongooseModel = {
      findOneAndUpdate: jest.fn(),
    } as Partial<mongoose.Model<SelectedCriteriaMongo>> as jest.Mocked<
      mongoose.Model<SelectedCriteriaMongo>
    >;

    mongooseConnection = {
      model: jest.fn().mockReturnValue(mongooseModel),
    } as Partial<mongoose.Connection> as jest.Mocked<mongoose.Connection>;

    mongoDatasource = {
      connection: mongooseConnection,
    } as Partial<MongoDatasource> as jest.Mocked<MongoDatasource>;

    selectedCriteriaMongoDocumentToSelectedCriteriaTransformer = {
      transform: jest.fn(),
    };

    selectedCriteriaMongoUpdateRepository =
      new SelectedCriteriaMongoUpdateRepository(
        mongoDatasource,
        selectedCriteriaMongoDocumentToSelectedCriteriaTransformer,
      );
  });

  describe('.update()', () => {
    beforeAll(() => {
      mongooseModel.findOneAndUpdate.mockResolvedValue(
        SelectedCriteriaMongoDocumentFixtures.withMandatory,
      );

      selectedCriteriaMongoDocumentToSelectedCriteriaTransformer.transform.mockResolvedValue(
        SelectedCriteriaFixtures.withMandatory,
      );
    });

    describe('having an SelectedCriteriaUpdateQuery with importance property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await selectedCriteriaMongoUpdateRepository.update(
            SelectedCriteriaUpdateQueryFixtures.withImportance,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.findOneAndUpdate()', () => {
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledWith(
            expect.objectContaining({
              uuid: SelectedCriteriaUpdateQueryFixtures.withImportance.uuid,
            }),
            expect.objectContaining({
              importance:
                SelectedCriteriaMongoFixtures.withMandatory.importance,
            }),
            expect.any(Object),
          );
        });
      });
    });
  });
});

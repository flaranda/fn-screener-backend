import 'reflect-metadata';

import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { SelectedCriteriaFindQueryFixtures } from '../../fixtures/domain/SelectedCriteriaFindQueryFixtures';
import { SelectedCriteriaFixtures } from '../../fixtures/domain/SelectedCriteriaFixtures';
import { SelectedCriteriaMongoDocumentFixtures } from '../../fixtures/mongo/SelectedCriteriaMongoDocumentFixtures';
import { SelectedCriteria } from '../../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../../models/domain/SelectedCriteriaFindQuery';
import { SelectedCriteriaMongo } from '../../models/mongo/SelectedCriteriaMongo';
import { SelectedCriteriaMongoFindManyRepository } from './SelectedCriteriaMongoFindManyRepository';

describe('SelectedCriteriaMongoFindManyRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<SelectedCriteriaMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let selectedCriteriaMongoDocumentToSelectedCriteriaTransformer: jest.Mocked<
    ITransformer<SelectedCriteriaMongo, SelectedCriteria>
  >;

  let selectedCriteriaMongoFindManyRepository: SelectedCriteriaMongoFindManyRepository;

  beforeAll(() => {
    mongooseModel = {
      find: jest.fn(),
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

    selectedCriteriaMongoFindManyRepository =
      new SelectedCriteriaMongoFindManyRepository(
        mongoDatasource,
        selectedCriteriaMongoDocumentToSelectedCriteriaTransformer,
      );
  });

  describe('.findMany()', () => {
    beforeAll(() => {
      mongooseModel.find.mockResolvedValue([
        SelectedCriteriaMongoDocumentFixtures.withMandatory,
      ]);

      selectedCriteriaMongoDocumentToSelectedCriteriaTransformer.transform.mockResolvedValue(
        SelectedCriteriaFixtures.withMandatory,
      );
    });

    describe('having an SelectedCriteriaFindQuery with userUuid property', () => {
      let selectedCriteriaFindQueryFixture: SelectedCriteriaFindQuery;

      beforeAll(() => {
        selectedCriteriaFindQueryFixture =
          SelectedCriteriaFindQueryFixtures.withUserUuid;
      });

      describe('when called', () => {
        beforeAll(async () => {
          await selectedCriteriaMongoFindManyRepository.findMany(
            selectedCriteriaFindQueryFixture,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.find()', () => {
          expect(mongooseModel.find).toHaveBeenCalledTimes(1);
          expect(mongooseModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
              user_uuid: selectedCriteriaFindQueryFixture.userUuid,
            }),
          );
        });
      });
    });
  });
});

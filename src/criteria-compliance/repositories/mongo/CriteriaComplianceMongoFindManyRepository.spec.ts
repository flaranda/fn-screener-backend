import 'reflect-metadata';

import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { CriteriaComplianceFindQueryFixtures } from '../../fixtures/domain/CriteriaComplianceFindQueryFixtures';
import { CriteriaComplianceFixtures } from '../../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaComplianceMongoDocumentFixtures } from '../../fixtures/mongo/CriteriaComplianceMongoDocumentFixtures';
import { CriteriaCompliance } from '../../models/domain/CriteriaCompliance';
import { CriteriaComplianceMongo } from '../../models/mongo/CriteriaComplianceMongo';
import { CriteriaComplianceMongoFindManyRepository } from './CriteriaComplianceMongoFindManyRepository';

describe('CriteriaComplianceMongoFindManyRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<CriteriaComplianceMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let criteriaComplianceMongoDocumentToCriteriaComplianceTransformer: jest.Mocked<
    ITransformer<CriteriaComplianceMongo, CriteriaCompliance>
  >;

  let criteriaComplianceMongoFindManyRepository: CriteriaComplianceMongoFindManyRepository;

  beforeAll(() => {
    mongooseModel = {
      find: jest.fn(),
    } as Partial<mongoose.Model<CriteriaComplianceMongo>> as jest.Mocked<
      mongoose.Model<CriteriaComplianceMongo>
    >;

    mongooseConnection = {
      model: jest.fn().mockReturnValue(mongooseModel),
    } as Partial<mongoose.Connection> as jest.Mocked<mongoose.Connection>;

    mongoDatasource = {
      connection: mongooseConnection,
    } as Partial<MongoDatasource> as jest.Mocked<MongoDatasource>;

    criteriaComplianceMongoDocumentToCriteriaComplianceTransformer = {
      transform: jest.fn(),
    };

    criteriaComplianceMongoFindManyRepository =
      new CriteriaComplianceMongoFindManyRepository(
        mongoDatasource,
        criteriaComplianceMongoDocumentToCriteriaComplianceTransformer,
      );
  });

  describe('.findMany()', () => {
    beforeAll(() => {
      mongooseModel.find.mockResolvedValue([
        CriteriaComplianceMongoDocumentFixtures.withMandatory,
      ]);

      criteriaComplianceMongoDocumentToCriteriaComplianceTransformer.transform.mockResolvedValue(
        CriteriaComplianceFixtures.withMandatory,
      );
    });

    describe('having an CriteriaComplianceFindQuery with startupUuid property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await criteriaComplianceMongoFindManyRepository.findMany(
            CriteriaComplianceFindQueryFixtures.withStartupUuid,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.find()', () => {
          expect(mongooseModel.find).toHaveBeenCalledTimes(1);
          expect(mongooseModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
              startup_uuid:
                CriteriaComplianceFindQueryFixtures.withStartupUuid.startupUuid,
            }),
          );
        });
      });
    });
  });
});

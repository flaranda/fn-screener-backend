import 'reflect-metadata';

import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { CriteriaComplianceFixtures } from '../../fixtures/domain/CriteriaComplianceFixtures';
import { CriteriaComplianceUpdateQueryFixtures } from '../../fixtures/domain/CriteriaComplianceUpdateQueryFixtures';
import { CriteriaComplianceMongoDocumentFixtures } from '../../fixtures/mongo/CriteriaComplianceMongoDocumentFixtures';
import { CriteriaComplianceMongoFixtures } from '../../fixtures/mongo/CriteriaComplianceMongoFixtures';
import { CriteriaCompliance } from '../../models/domain/CriteriaCompliance';
import { CriteriaComplianceMongo } from '../../models/mongo/CriteriaComplianceMongo';
import { CriteriaComplianceMongoUpdateRepository } from './CriteriaComplianceMongoUpdateRepository';

describe('CriteriaComplianceMongoUpdateRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<CriteriaComplianceMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let criteriaComplianceMongoDocumentToCriteriaComplianceTransformer: jest.Mocked<
    ITransformer<CriteriaComplianceMongo, CriteriaCompliance>
  >;

  let criteriaComplianceMongoUpdateRepository: CriteriaComplianceMongoUpdateRepository;

  beforeAll(() => {
    mongooseModel = {
      findOneAndUpdate: jest.fn(),
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

    criteriaComplianceMongoUpdateRepository =
      new CriteriaComplianceMongoUpdateRepository(
        mongoDatasource,
        criteriaComplianceMongoDocumentToCriteriaComplianceTransformer,
      );
  });

  describe('.update()', () => {
    beforeAll(() => {
      mongooseModel.findOneAndUpdate.mockResolvedValue(
        CriteriaComplianceMongoDocumentFixtures.withMandatory,
      );

      criteriaComplianceMongoDocumentToCriteriaComplianceTransformer.transform.mockResolvedValue(
        CriteriaComplianceFixtures.withMandatory,
      );
    });

    describe('having an CriteriaComplianceUpdateQuery with answer property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await criteriaComplianceMongoUpdateRepository.update(
            CriteriaComplianceUpdateQueryFixtures.withAnswer,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.findOneAndUpdate()', () => {
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
          expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledWith(
            expect.objectContaining({
              uuid: CriteriaComplianceUpdateQueryFixtures.withAnswer.uuid,
            }),
            expect.objectContaining({
              answer: CriteriaComplianceMongoFixtures.withMandatory.answer,
            }),
            expect.any(Object),
          );
        });
      });
    });
  });
});

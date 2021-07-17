import 'reflect-metadata';

import mongoose from 'mongoose';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { UserCriteriaFindQueryFixtures } from '../../fixtures/domain/UserCriteriaFindQueryFixtures';
import { UserCriteriaFixtures } from '../../fixtures/domain/UserCriteriaFixtures';
import { UserCriteriaMongoDocumentFixtures } from '../../fixtures/mongo/UserCriteriaMongoDocumentFixtures';
import { UserCriteria } from '../../models/domain/UserCriteria';
import { UserCriteriaFindQuery } from '../../models/domain/UserCriteriaFindQuery';
import { UserCriteriaMongo } from '../../models/mongo/UserCriteriaMongo';
import { UserCriteriaMongoFindManyRepository } from './UserCriteriaMongoFindManyRepository';

describe('UserCriteriaMongoFindManyRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<UserCriteriaMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let userCriteriaMongoDocumentToUserCriteriaTransformer: jest.Mocked<
    ITransformer<UserCriteriaMongo, UserCriteria>
  >;

  let userCriteriaMongoFindManyRepository: UserCriteriaMongoFindManyRepository;

  beforeAll(() => {
    mongooseModel = {
      find: jest.fn(),
    } as Partial<mongoose.Model<UserCriteriaMongo>> as jest.Mocked<
      mongoose.Model<UserCriteriaMongo>
    >;

    mongooseConnection = {
      model: jest.fn().mockReturnValue(mongooseModel),
    } as Partial<mongoose.Connection> as jest.Mocked<mongoose.Connection>;

    mongoDatasource = {
      connection: mongooseConnection,
    } as Partial<MongoDatasource> as jest.Mocked<MongoDatasource>;

    userCriteriaMongoDocumentToUserCriteriaTransformer = {
      transform: jest.fn(),
    };

    userCriteriaMongoFindManyRepository =
      new UserCriteriaMongoFindManyRepository(
        mongoDatasource,
        userCriteriaMongoDocumentToUserCriteriaTransformer,
      );
  });

  describe('.findMany()', () => {
    beforeAll(() => {
      mongooseModel.find.mockResolvedValue([
        UserCriteriaMongoDocumentFixtures.withMandatory,
      ]);

      userCriteriaMongoDocumentToUserCriteriaTransformer.transform.mockResolvedValue(
        UserCriteriaFixtures.withMandatory,
      );
    });

    describe('having an UserCriteriaFindQuery with userUuid property', () => {
      let userCriteriaFindQueryFixture: UserCriteriaFindQuery;

      beforeAll(() => {
        userCriteriaFindQueryFixture =
          UserCriteriaFindQueryFixtures.withUserUuid;
      });

      describe('when called', () => {
        beforeAll(async () => {
          await userCriteriaMongoFindManyRepository.findMany(
            userCriteriaFindQueryFixture,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.find()', () => {
          expect(mongooseModel.find).toHaveBeenCalledTimes(1);
          expect(mongooseModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
              user_uuid: userCriteriaFindQueryFixture.userUuid,
            }),
          );
        });
      });
    });
  });
});

import 'reflect-metadata';

import mongoose from 'mongoose';

import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { EntityFindQueryFixtures } from '../../fixtures/domain/EntityFindQueryFixtures';
import { EntityFixtures } from '../../fixtures/domain/EntityFixtures';
import { EntityMongoDocumentFixtures } from '../../fixtures/mongo/EntityMongoDocumentFIxtures';
import { ITransformer } from '../../interfaces/ITransformer';
import { Entity } from '../../models/domain/Entity';
import { EntityFindQuery } from '../../models/domain/EntityFindQuery';
import { EntityMongo } from '../../models/mongo/EntityMongo';
import { EntityMongoModelName } from '../../models/mongo/EntityMongoModelName';
import { EntityMongoFindOneRepository } from './EntityMongoFindOneRepository';

class EntityMongoFindOneRepositoryMock extends EntityMongoFindOneRepository {
  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    baseMongooseFilterQuery: mongoose.FilterQuery<EntityMongo>,
    _entityFindQuery: EntityFindQuery,
  ): mongoose.FilterQuery<EntityMongo> {
    return baseMongooseFilterQuery;
  }
}

describe('EntityMongoFindOneRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<EntityMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let entityMongoToEntityTransformer: jest.Mocked<
    ITransformer<EntityMongo, Entity>
  >;
  let entityMongoModelNameFixture: string;

  let entityMongoFindOneRepositoryMock: EntityMongoFindOneRepositoryMock;

  beforeAll(() => {
    mongooseModel = {
      findOne: jest.fn(),
    } as Partial<mongoose.Model<EntityMongo>> as jest.Mocked<
      mongoose.Model<EntityMongo>
    >;

    mongooseConnection = {
      model: jest.fn().mockReturnValue(mongooseModel),
    } as Partial<mongoose.Connection> as jest.Mocked<mongoose.Connection>;

    mongoDatasource = {
      connection: mongooseConnection,
    } as Partial<MongoDatasource> as jest.Mocked<MongoDatasource>;

    entityMongoToEntityTransformer = {
      transform: jest.fn(),
    };

    entityMongoModelNameFixture = 'EntityMongoModelNameFixture';

    entityMongoFindOneRepositoryMock = new EntityMongoFindOneRepositoryMock(
      mongoDatasource,
      entityMongoToEntityTransformer,
      entityMongoModelNameFixture as EntityMongoModelName,
    );
  });

  describe('.findOne()', () => {
    beforeAll(() => {
      mongooseModel.findOne.mockResolvedValue(
        EntityMongoDocumentFixtures.withMandatory,
      );

      entityMongoToEntityTransformer.transform.mockResolvedValue(
        EntityFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await entityMongoFindOneRepositoryMock.findOne(
          EntityFindQueryFixtures.withMandatory,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call mongoose.Model.findOne()', () => {
        expect(mongooseModel.findOne).toHaveBeenCalledTimes(1);
        expect(mongooseModel.findOne).toHaveBeenCalledWith(
          expect.objectContaining({}),
        );
      });

      it('should call entityMongoDocumentToEntityTransformer.transform()', () => {
        expect(entityMongoToEntityTransformer.transform).toHaveBeenCalledTimes(
          1,
        );

        expect(entityMongoToEntityTransformer.transform).toHaveBeenCalledWith(
          EntityMongoDocumentFixtures.withMandatory,
        );
      });

      it('should return an Entity', () => {
        expect(result).toStrictEqual(EntityFixtures.withMandatory);
      });
    });

    describe('when called, and mongoose.Model.findOne() returns null', () => {
      let result: unknown;

      beforeAll(async () => {
        mongooseModel.findOne.mockResolvedValueOnce(null);

        try {
          await entityMongoFindOneRepositoryMock.findOne(
            EntityFindQueryFixtures.withMandatory,
          );
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should throw an Error', () => {
        expect(result).toBeInstanceOf(Error);
      });
    });

    describe('having an EntityFindQuery with uuid property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await entityMongoFindOneRepositoryMock.findOne(
            EntityFindQueryFixtures.withUuid,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.findOne()', () => {
          expect(mongooseModel.findOne).toHaveBeenCalledTimes(1);
          expect(mongooseModel.findOne).toHaveBeenCalledWith(
            expect.objectContaining({
              uuid: EntityFindQueryFixtures.withUuid.uuid,
            }),
          );
        });
      });
    });
  });
});

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
import { EntityMongoDocument } from '../../models/mongo/EntityMongoDocument';
import { EntityMongoModelName } from '../../models/mongo/EntityMongoModelName';
import { EntityMongoFindManyRepository } from './EntityMongoFindManyRepository';

class EntityMongoFindManyRepositoryMock extends EntityMongoFindManyRepository {
  protected hydrateBaseMongooseFilterQueryFromEntityFindQuery(
    baseMongooseFilterQuery: mongoose.FilterQuery<EntityMongo>,
    _entityFindQuery: EntityFindQuery,
  ): mongoose.FilterQuery<EntityMongo> {
    return baseMongooseFilterQuery;
  }
}

describe('EntityMongoFindManyRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<EntityMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let entityMongoDocumentToEntityTransformer: jest.Mocked<
    ITransformer<EntityMongoDocument, Entity>
  >;
  let entityMongoModelNameFixture: string;

  let entityMongoFindManyRepositoryMock: EntityMongoFindManyRepositoryMock;

  beforeAll(() => {
    mongooseModel = {
      find: jest.fn(),
    } as Partial<mongoose.Model<EntityMongo>> as jest.Mocked<
      mongoose.Model<EntityMongo>
    >;

    mongooseConnection = {
      model: jest.fn().mockReturnValue(mongooseModel),
    } as Partial<mongoose.Connection> as jest.Mocked<mongoose.Connection>;

    mongoDatasource = {
      connection: mongooseConnection,
    } as Partial<MongoDatasource> as jest.Mocked<MongoDatasource>;

    entityMongoDocumentToEntityTransformer = {
      transform: jest.fn(),
    };

    entityMongoModelNameFixture = 'EntityMongoModelNameFixture';

    entityMongoFindManyRepositoryMock = new EntityMongoFindManyRepositoryMock(
      mongoDatasource,
      entityMongoDocumentToEntityTransformer,
      entityMongoModelNameFixture as EntityMongoModelName,
    );
  });

  describe('.findMany()', () => {
    beforeAll(() => {
      mongooseModel.find.mockResolvedValue([
        EntityMongoDocumentFixtures.withMandatory,
      ]);

      entityMongoDocumentToEntityTransformer.transform.mockResolvedValue(
        EntityFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await entityMongoFindManyRepositoryMock.findMany(
          EntityFindQueryFixtures.withMandatory,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call mongoose.Model.find()', () => {
        expect(mongooseModel.find).toHaveBeenCalledTimes(1);
        expect(mongooseModel.find).toHaveBeenCalledWith(
          expect.objectContaining({}),
        );
      });

      it('should call entityMongoDocumentToEntityTransformer.transform()', () => {
        expect(
          entityMongoDocumentToEntityTransformer.transform,
        ).toHaveBeenCalledTimes(1);

        expect(
          entityMongoDocumentToEntityTransformer.transform,
        ).toHaveBeenCalledWith(EntityMongoDocumentFixtures.withMandatory);
      });

      it('should return an Entity array', () => {
        expect(result).toStrictEqual([EntityFixtures.withMandatory]);
      });
    });

    describe('having an EntityFindQuery with uuid property', () => {
      describe('when called', () => {
        beforeAll(async () => {
          await entityMongoFindManyRepositoryMock.findMany(
            EntityFindQueryFixtures.withUuid,
          );
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call mongoose.Model.find()', () => {
          expect(mongooseModel.find).toHaveBeenCalledTimes(1);
          expect(mongooseModel.find).toHaveBeenCalledWith(
            expect.objectContaining({
              uuid: EntityFindQueryFixtures.withUuid.uuid,
            }),
          );
        });
      });
    });
  });
});

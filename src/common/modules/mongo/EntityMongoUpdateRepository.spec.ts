import 'reflect-metadata';

import mongoose from 'mongoose';

import { MongoDatasource } from '../../../mongo/datasources/MongoDatasource';
import { EntityFixtures } from '../../fixtures/domain/EntityFixtures';
import { EntityUpdateQueryFixtures } from '../../fixtures/domain/EntityUpdateQueryFixtures';
import { EntityMongoDocumentFixtures } from '../../fixtures/mongo/EntityMongoDocumentFIxtures';
import { ITransformer } from '../../interfaces/ITransformer';
import { Entity } from '../../models/domain/Entity';
import { EntityUpdateQuery } from '../../models/domain/EntityUpdateQuery';
import { EntityMongo } from '../../models/mongo/EntityMongo';
import { EntityMongoDocument } from '../../models/mongo/EntityMongoDocument';
import { EntityMongoModelName } from '../../models/mongo/EntityMongoModelName';
import { EntityMongoUpdateRepository } from './EntityMongoUpdateRepository';

class EntityMongoUpdateRepositoryMock extends EntityMongoUpdateRepository {
  protected buildMongooseUpdateQueryFromBaseMongooseUpdateQueryAndEntityUpdateQuery(
    baseMongooseUpdateQuery: mongoose.UpdateQuery<EntityMongo>,
    _entityUpdateQuery: EntityUpdateQuery,
  ): mongoose.UpdateQuery<EntityMongo> {
    return baseMongooseUpdateQuery;
  }
}

describe('EntityMongoUpdateRepository', () => {
  let mongooseModel: jest.Mocked<mongoose.Model<EntityMongo>>;
  let mongooseConnection: jest.Mocked<mongoose.Connection>;
  let mongoDatasource: jest.Mocked<MongoDatasource>;
  let entityMongoDocumentToEntityTransformer: jest.Mocked<
    ITransformer<EntityMongoDocument, Entity>
  >;
  let entityMongoModelNameFixture: string;

  let entityMongoUpdateRepositoryMock: EntityMongoUpdateRepositoryMock;

  beforeAll(() => {
    mongooseModel = {
      findOneAndUpdate: jest.fn(),
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

    entityMongoUpdateRepositoryMock = new EntityMongoUpdateRepositoryMock(
      mongoDatasource,
      entityMongoDocumentToEntityTransformer,
      entityMongoModelNameFixture as EntityMongoModelName,
    );
  });

  describe('.update()', () => {
    beforeAll(() => {
      mongooseModel.findOneAndUpdate.mockResolvedValue(
        EntityMongoDocumentFixtures.withMandatory,
      );

      entityMongoDocumentToEntityTransformer.transform.mockResolvedValue(
        EntityFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await entityMongoUpdateRepositoryMock.update(
          EntityUpdateQueryFixtures.withMandatory,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call mongoose.Model.findOneAndUpdate()', () => {
        expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(mongooseModel.findOneAndUpdate).toHaveBeenCalledWith(
          expect.objectContaining({
            uuid: EntityUpdateQueryFixtures.withMandatory.uuid,
          }),
          expect.objectContaining({
            updated_at: expect.any(Date) as unknown,
          }),
          expect.any(Object) as unknown,
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

      it('should return an Entity', () => {
        expect(result).toStrictEqual(EntityFixtures.withMandatory);
      });
    });

    describe('when called, and mongoose.Model.findOneAndUpdate() returns null', () => {
      let result: unknown;

      beforeAll(async () => {
        mongooseModel.findOneAndUpdate.mockResolvedValueOnce(null);

        try {
          await entityMongoUpdateRepositoryMock.update(
            EntityUpdateQueryFixtures.withMandatory,
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
  });
});

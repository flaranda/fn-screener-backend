import 'reflect-metadata';

import { EntityFindQueryFixtures } from '../../fixtures/domain/EntityFindQueryFixtures';
import { EntityFixtures } from '../../fixtures/domain/EntityFixtures';
import { IFindManyRepository } from '../../interfaces/IFindManyRepository';
import { Entity } from '../../models/domain/Entity';
import { EntityFindQuery } from '../../models/domain/EntityFindQuery';
import { FindManyEntitiesInteractor } from './FindManyEntitiesInteractor';

class FindManyEntitiesInteractorMock extends FindManyEntitiesInteractor {}

describe('FindManyEntitiesInteractor', () => {
  let entitiesFindManyRepository: jest.Mocked<
    IFindManyRepository<EntityFindQuery, Entity>
  >;

  let findManyEntitiesInteractor: FindManyEntitiesInteractor;

  beforeAll(() => {
    entitiesFindManyRepository = {
      findMany: jest.fn(),
    };

    findManyEntitiesInteractor = new FindManyEntitiesInteractorMock(
      entitiesFindManyRepository,
    );
  });

  describe('.findMany()', () => {
    beforeAll(() => {
      entitiesFindManyRepository.findMany.mockResolvedValue([
        EntityFixtures.withMandatory,
      ]);
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await findManyEntitiesInteractor.interact(
          EntityFindQueryFixtures.withMandatory,
        );
      });

      it('should call entityFindManyRepository.findMany()', () => {
        expect(entitiesFindManyRepository.findMany).toHaveBeenCalledTimes(1);
        expect(entitiesFindManyRepository.findMany).toHaveBeenCalledWith(
          EntityFindQueryFixtures.withMandatory,
        );
      });

      it('should return a Entity array', () => {
        expect(result).toStrictEqual([EntityFixtures.withMandatory]);
      });
    });
  });
});

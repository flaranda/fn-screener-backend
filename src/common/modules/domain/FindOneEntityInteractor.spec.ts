import 'reflect-metadata';

import { EntityFindQueryFixtures } from '../../fixtures/domain/EntityFindQueryFixtures';
import { EntityFixtures } from '../../fixtures/domain/EntityFixtures';
import { IFindOneRepository } from '../../interfaces/IFindOneRepository';
import { Entity } from '../../models/domain/Entity';
import { EntityFindQuery } from '../../models/domain/EntityFindQuery';
import { FindOneEntityInteractor } from './FindOneEntityInteractor';

class FindOneEntityInteractorMock extends FindOneEntityInteractor {}

describe('FindOneEntityInteractor', () => {
  let entityFindOneRepository: jest.Mocked<
    IFindOneRepository<EntityFindQuery, Entity>
  >;

  let findOneEntityInteractor: FindOneEntityInteractor;

  beforeAll(() => {
    entityFindOneRepository = {
      findOne: jest.fn(),
    };

    findOneEntityInteractor = new FindOneEntityInteractorMock(
      entityFindOneRepository,
    );
  });

  describe('.findOne()', () => {
    beforeAll(() => {
      entityFindOneRepository.findOne.mockResolvedValue(
        EntityFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await findOneEntityInteractor.interact(
          EntityFindQueryFixtures.withMandatory,
        );
      });

      it('should call entityFindOneRepository.findOne()', () => {
        expect(entityFindOneRepository.findOne).toHaveBeenCalledTimes(1);
        expect(entityFindOneRepository.findOne).toHaveBeenCalledWith(
          EntityFindQueryFixtures.withMandatory,
        );
      });

      it('should return an Entity', () => {
        expect(result).toStrictEqual(EntityFixtures.withMandatory);
      });
    });
  });
});

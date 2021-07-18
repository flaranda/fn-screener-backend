import 'reflect-metadata';

import { EntityFixtures } from '../../fixtures/domain/EntityFixtures';
import { EntityUpdateQueryFixtures } from '../../fixtures/domain/EntityUpdateQueryFixtures';
import { IUpdateRepository } from '../../interfaces/IUpdateRepository';
import { Entity } from '../../models/domain/Entity';
import { EntityUpdateQuery } from '../../models/domain/EntityUpdateQuery';
import { UpdateEntityInteractor } from './UpdateEntityInteractor';

class UpdateEntityInteractorMock extends UpdateEntityInteractor {}

describe('UpdateEntityInteractor', () => {
  let entityUpdateRepository: jest.Mocked<
    IUpdateRepository<EntityUpdateQuery, Entity>
  >;

  let updateEntityInteractor: UpdateEntityInteractor;

  beforeAll(() => {
    entityUpdateRepository = {
      update: jest.fn(),
    };

    updateEntityInteractor = new UpdateEntityInteractorMock(
      entityUpdateRepository,
    );
  });

  describe('.update()', () => {
    beforeAll(() => {
      entityUpdateRepository.update.mockResolvedValue(
        EntityFixtures.withMandatory,
      );
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await updateEntityInteractor.interact(
          EntityUpdateQueryFixtures.withMandatory,
        );
      });

      it('should call entityUpdateRepository.update()', () => {
        expect(entityUpdateRepository.update).toHaveBeenCalledTimes(1);
        expect(entityUpdateRepository.update).toHaveBeenCalledWith(
          EntityUpdateQueryFixtures.withMandatory,
        );
      });

      it('should return an Entity', () => {
        expect(result).toStrictEqual(EntityFixtures.withMandatory);
      });
    });
  });
});

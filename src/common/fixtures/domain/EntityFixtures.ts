import { Entity } from '../../models/domain/Entity';

export class EntityFixtures {
  public static get withMandatory(): Entity {
    const fixture: Entity = {
      createdAt: new Date('2021-07-16T00:00:00Z'),
      updatedAt: new Date('2021-07-16T00:00:00Z'),
      uuid: 'a89c0230-bdd8-4020-b910-641b37acc0e9',
    };

    return fixture;
  }
}

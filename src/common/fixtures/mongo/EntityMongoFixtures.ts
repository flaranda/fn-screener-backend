import { EntityMongo } from '../../models/mongo/EntityMongo';

export class EntityMongoFixtures {
  public static get withMandatory(): EntityMongo {
    const fixture: EntityMongo = {
      created_at: new Date('2021-07-16T00:00:00Z'),
      updated_at: new Date('2021-07-16T00:00:00Z'),
      uuid: 'a89c0230-bdd8-4020-b910-641b37acc0e9',
    };

    return fixture;
  }
}

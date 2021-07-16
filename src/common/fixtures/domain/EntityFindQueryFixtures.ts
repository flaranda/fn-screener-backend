import { EntityFindQuery } from '../../models/domain/EntityFindQuery';
import { EntityFixtures } from './EntityFixtures';

export class EntityFindQueryFixtures {
  public static get withMandatory(): EntityFindQuery {
    const fixture: EntityFindQuery = {};

    return fixture;
  }

  public static get withUuid(): EntityFindQuery {
    const fixture: EntityFindQuery = {
      ...this.withMandatory,
      uuid: EntityFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}

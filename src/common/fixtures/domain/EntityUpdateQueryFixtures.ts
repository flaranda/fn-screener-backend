import { EntityUpdateQuery } from '../../models/domain/EntityUpdateQuery';
import { EntityFixtures } from './EntityFixtures';

export class EntityUpdateQueryFixtures {
  public static get withMandatory(): EntityUpdateQuery {
    const fixture: EntityUpdateQuery = {
      uuid: EntityFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}

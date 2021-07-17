import { CriteriaFindQuery } from '../../models/domain/CriteriaFindQuery';
import { CriteriaFixtures } from './CriteriaFixtures';

export class CriteriaFindQueryFixtues {
  public static get withMandatory(): CriteriaFindQuery {
    const fixture: CriteriaFindQuery = {};

    return fixture;
  }

  public static get withUuid(): CriteriaFindQuery {
    const fixture: CriteriaFindQuery = {
      ...this.withMandatory,
      uuid: CriteriaFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}

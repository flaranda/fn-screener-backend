import { StartupFixtures } from '../../../startup/fixtures/domain/StartupFixtures';
import { CriteriaComplianceFindQuery } from '../../models/domain/CriteriaComplianceFindQuery';

export class CriteriaComplianceFindQueryFixtures {
  public static get withMandatory(): CriteriaComplianceFindQuery {
    const fixture: CriteriaComplianceFindQuery = {};

    return fixture;
  }

  public static get withStartupUuid(): CriteriaComplianceFindQuery {
    const fixture: CriteriaComplianceFindQuery = {
      ...this.withMandatory,
      startupUuid: StartupFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}

import { CriteriaComplianceUpdateQuery } from '../../models/domain/CriteriaComplianceUpdateQuery';
import { CriteriaComplianceFixtures } from './CriteriaComplianceFixtures';

export class CriteriaComplianceUpdateQueryFixtures {
  public static get withMandatory(): CriteriaComplianceUpdateQuery {
    const fixture: CriteriaComplianceUpdateQuery = {
      uuid: CriteriaComplianceFixtures.withMandatory.uuid,
    };

    return fixture;
  }

  public static get withCompliance(): CriteriaComplianceUpdateQuery {
    const fixture: CriteriaComplianceUpdateQuery = {
      ...this.withMandatory,
      compliance: true,
    };

    return fixture;
  }
}

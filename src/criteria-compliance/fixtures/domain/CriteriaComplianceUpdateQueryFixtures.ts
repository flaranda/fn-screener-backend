import { CriteriaComplianceAnswer } from '../../models/domain/CriteriaComplianceAnswer';
import { CriteriaComplianceUpdateQuery } from '../../models/domain/CriteriaComplianceUpdateQuery';
import { CriteriaComplianceFixtures } from './CriteriaComplianceFixtures';

export class CriteriaComplianceUpdateQueryFixtures {
  public static get withMandatory(): CriteriaComplianceUpdateQuery {
    const fixture: CriteriaComplianceUpdateQuery = {
      uuid: CriteriaComplianceFixtures.withMandatory.uuid,
    };

    return fixture;
  }

  public static get withAnswer(): CriteriaComplianceUpdateQuery {
    const fixture: CriteriaComplianceUpdateQuery = {
      ...this.withMandatory,
      answer: CriteriaComplianceAnswer.Yes,
    };

    return fixture;
  }
}

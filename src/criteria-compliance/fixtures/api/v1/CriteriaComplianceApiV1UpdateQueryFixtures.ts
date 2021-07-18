import { CriteriaComplianceApiV1UpdateQuery } from '../../../models/api/v1/CriteriaComplianceApiV1UpdateQuery';

export class CriteriaComplianceApiV1UpdateQueryFixtures {
  public static get withMandatory(): CriteriaComplianceApiV1UpdateQuery {
    const fixture: CriteriaComplianceApiV1UpdateQuery = {};

    return fixture;
  }

  public static get withAll(): Required<CriteriaComplianceApiV1UpdateQuery> {
    const fixture: Required<CriteriaComplianceApiV1UpdateQuery> = {
      compliance: true,
    };

    return fixture;
  }

  public static get withInvalidContract(): unknown {
    const fixture: unknown = 'unexpected_value';

    return fixture;
  }
}

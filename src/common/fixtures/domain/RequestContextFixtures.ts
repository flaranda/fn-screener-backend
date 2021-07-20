import { CriteriaComplianceFixtures } from '../../../criteria-compliance/fixtures/domain/CriteriaComplianceFixtures';
import { MatchingFixtures } from '../../../matching/fixtures/domain/MatchingFixtures';
import { SelectedCriteriaFixtures } from '../../../selected-criteria/fixtures/domain/SelectedCriteriaFixtures';
import { ApiVersion } from '../../models/domain/ApiVersion';
import { RequestContext } from '../../models/domain/RequestContext';

export class RequestContextFixtures {
  public static get withMandatory(): RequestContext {
    const fixture: RequestContext = {};

    return fixture;
  }

  public static get withApiVersion(): RequestContext {
    const fixture: RequestContext = {
      ...this.withMandatory,
      apiVersion: ApiVersion.v1,
    };

    return fixture;
  }

  public static get withCriteriaCompliance(): RequestContext {
    const fixture: RequestContext = {
      ...this.withMandatory,
      criteriaCompliance: CriteriaComplianceFixtures.withMandatory,
    };

    return fixture;
  }

  public static get withMatching(): RequestContext {
    const fixture: RequestContext = {
      ...this.withMandatory,
      matching: MatchingFixtures.withMandatory,
    };

    return fixture;
  }

  public static get withSelectedCriteria(): RequestContext {
    const fixture: RequestContext = {
      ...this.withMandatory,
      selectedCriteria: SelectedCriteriaFixtures.withMandatory,
    };

    return fixture;
  }
}

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
}

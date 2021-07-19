import { StartupFindQuery } from '../../models/domain/StartupFindQuery';
import { StartupFixtures } from './StartupFixtures';

export class StartupFindQueryFixtures {
  public static get withMandatory(): StartupFindQuery {
    const fixture: StartupFindQuery = {};

    return fixture;
  }

  public static get withUuid(): StartupFindQuery {
    const fixture: StartupFindQuery = {
      ...this.withMandatory,
      uuid: StartupFixtures.withMandatory.uuid,
    };

    return fixture;
  }
}

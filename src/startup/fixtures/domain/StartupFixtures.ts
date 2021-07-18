import url from 'url';

import { Startup } from '../../models/domain/Startup';

export class StartupFixtures {
  public static get withMandatory(): Startup {
    const fixture: Startup = {
      createdAt: new Date('2021-07-18T00:00:00Z'),
      name: 'Blissey',
      updatedAt: new Date('2021-07-18T00:00:00Z'),
      url: new url.URL('https://some-startup-domain.com'),
      uuid: '1039fd3f-1614-4d85-8588-fba871d7e351',
    };

    return fixture;
  }
}

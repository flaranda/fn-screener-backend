import { StartupMongo } from '../../models/mongo/StartupMongo';

export class StartupMongoFixtures {
  public static get withMandatory(): StartupMongo {
    const fixture: StartupMongo = {
      created_at: new Date('2021-07-18T00:00:00Z'),
      name: 'Blissey',
      updated_at: new Date('2021-07-18T00:00:00Z'),
      url: 'https://some-startup-domain.com',
      uuid: '1039fd3f-1614-4d85-8588-fba871d7e351',
    };

    return fixture;
  }
}

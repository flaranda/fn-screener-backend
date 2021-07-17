import { UserMongo } from '../../models/mongo/UserMongo';

export class UserMongoFixtures {
  public static get withMandatory(): UserMongo {
    const fixture: UserMongo = {
      created_at: new Date('2021-07-17T00:00:00Z'),
      email: 'tony@stark-industries.com',
      name: 'Tony S.',
      updated_at: new Date('2021-07-17T00:00:00Z'),
      uuid: '198a0fd2-2d29-4eb4-b813-dfe98092a021',
    };

    return fixture;
  }
}

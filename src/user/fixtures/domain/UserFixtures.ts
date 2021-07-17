import { User } from '../../models/domain/User';

export class UserFixtures {
  public static get withMandatory(): User {
    const fixture: User = {
      createdAt: new Date('2021-07-17T00:00:00Z'),
      email: 'tony@stark-industries.com',
      name: 'Tony S.',
      updatedAt: new Date('2021-07-17T00:00:00Z'),
      uuid: '198a0fd2-2d29-4eb4-b813-dfe98092a021',
    };

    return fixture;
  }
}

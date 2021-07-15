import { Criteria } from '../../models/domain/Criteria';

export class CriteriaFixtures {
  public static get withMandatory(): Criteria {
    const fixture: Criteria = {
      createdAt: new Date('2021-07-15T00:00:00Z'),
      name: 'Some criteria name',
      updatedAt: new Date('2021-07-15T00:00:00Z'),
      uuid: 'd9d61a31-7486-420c-b0aa-4add784eaab8',
    };

    return fixture;
  }
}

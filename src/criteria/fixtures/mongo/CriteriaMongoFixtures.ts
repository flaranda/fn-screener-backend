import { CriteriaMongo } from '../../models/mongo/CriteriaMongo';

export class CriteriaMongoFixtures {
  public static get withMandatory(): CriteriaMongo {
    const fixture: CriteriaMongo = {
      created_at: new Date('2021-07-15T00:00:00Z'),
      name: 'Some criteria name',
      updated_at: new Date('2021-07-15T00:00:00Z'),
      uuid: 'd9d61a31-7486-420c-b0aa-4add784eaab8',
    };

    return fixture;
  }
}

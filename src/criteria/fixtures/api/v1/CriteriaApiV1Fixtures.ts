import { CriteriaApiV1 } from '../../../models/api/v1/CriteriaApiV1';

export class CriteriaApiV1Fixtures {
  public static get withMandatory(): CriteriaApiV1 {
    const fixture: CriteriaApiV1 = {
      name: 'Some criteria name',
      uuid: 'd9d61a31-7486-420c-b0aa-4add784eaab8',
    };

    return fixture;
  }
}

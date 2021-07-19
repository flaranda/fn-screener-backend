import { CriteriaApiV1Fixtures } from '../../../../criteria/fixtures/api/v1/CriteriaApiV1Fixtures';
import { CriteriaComplianceApiV1 } from '../../../models/api/v1/CriteriaComplianceApiV1';

export class CriteriaComplianceApiV1Fixtures {
  public static get withMandatory(): CriteriaComplianceApiV1 {
    const fixture: CriteriaComplianceApiV1 = {
      compliance: true,
      criteria_name: CriteriaApiV1Fixtures.withMandatory.name,
      criteria_uuid: CriteriaApiV1Fixtures.withMandatory.uuid,
      startup_name: 'Blissey',
      startup_uuid: '1039fd3f-1614-4d85-8588-fba871d7e351',
      uuid: 'f04e915f-5220-4eb4-b31b-f6c35923b63c',
    };

    return fixture;
  }
}

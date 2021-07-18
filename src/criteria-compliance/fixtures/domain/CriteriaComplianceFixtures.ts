import { CriteriaFixtures } from '../../../criteria/fixtures/domain/CriteriaFixtures';
import { StartupFixtures } from '../../../startup/fixtures/domain/StartupFixtures';
import { CriteriaCompliance } from '../../models/domain/CriteriaCompliance';

export class CriteriaComplianceFixtures {
  public static get withMandatory(): CriteriaCompliance {
    const fixture: CriteriaCompliance = {
      compliance: true,
      createdAt: new Date('2021-07-18T00:00:00Z'),
      criteriaUuid: CriteriaFixtures.withMandatory.uuid,
      startupUuid: StartupFixtures.withMandatory.uuid,
      updatedAt: new Date('2021-07-18T00:00:00Z'),
      uuid: 'f04e915f-5220-4eb4-b31b-f6c35923b63c',
    };

    return fixture;
  }
}

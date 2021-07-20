import { CriteriaFixtures } from '../../../criteria/fixtures/domain/CriteriaFixtures';
import { StartupFixtures } from '../../../startup/fixtures/domain/StartupFixtures';
import { CriteriaCompliance } from '../../models/domain/CriteriaCompliance';
import { CriteriaComplianceAnswer } from '../../models/domain/CriteriaComplianceAnswer';

export class CriteriaComplianceFixtures {
  public static get withMandatory(): CriteriaCompliance {
    const fixture: CriteriaCompliance = {
      answer: CriteriaComplianceAnswer.Yes,
      createdAt: new Date('2021-07-18T00:00:00Z'),
      criteriaUuid: CriteriaFixtures.withMandatory.uuid,
      startupUuid: StartupFixtures.withMandatory.uuid,
      updatedAt: new Date('2021-07-18T00:00:00Z'),
      uuid: 'f04e915f-5220-4eb4-b31b-f6c35923b63c',
    };

    return fixture;
  }

  public static get withAnswerYesAndCriteriaUuidFixed(): CriteriaCompliance {
    const fixture: CriteriaCompliance = {
      ...this.withMandatory,
      answer: CriteriaComplianceAnswer.Yes,
      criteriaUuid: '38e16ccd-ca08-45fe-b823-5c80ec015fd0',
    };

    return fixture;
  }

  public static get withAnswerNoAndCriteriaUuidFixed(): CriteriaCompliance {
    const fixture: CriteriaCompliance = {
      ...this.withMandatory,
      answer: CriteriaComplianceAnswer.No,
      criteriaUuid: '59562520-98fa-474b-b06d-164f08297b1a',
    };

    return fixture;
  }

  public static get withAnswerNoAnswerAndCriteriaUuidFixed(): CriteriaCompliance {
    const fixture: CriteriaCompliance = {
      ...this.withMandatory,
      answer: CriteriaComplianceAnswer.NoAnswer,
      criteriaUuid: '022002f3-b48f-4b3a-ba9f-27878e8c4f93',
    };

    return fixture;
  }
}

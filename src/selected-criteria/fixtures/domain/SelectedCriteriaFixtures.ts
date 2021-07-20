import { CriteriaFixtures } from '../../../criteria/fixtures/domain/CriteriaFixtures';
import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { SelectedCriteria } from '../../models/domain/SelectedCriteria';
import { SelectedCriteriaImportance } from '../../models/domain/SelectedCriteriaImportance';

export class SelectedCriteriaFixtures {
  public static get withMandatory(): SelectedCriteria {
    const fixture: SelectedCriteria = {
      createdAt: new Date('2021-07-17T00:00:00Z'),
      criteriaUuid: CriteriaFixtures.withMandatory.uuid,
      importance: SelectedCriteriaImportance.MustHave,
      updatedAt: new Date('2021-07-17T00:00:00Z'),
      userUuid: UserFixtures.withMandatory.uuid,
      uuid: 'ca062b0f-ff9f-41da-a223-05855ce0d1cd',
    };

    return fixture;
  }

  public static get withImportanceMustHaveAndCriteriaUuidFixed(): SelectedCriteria {
    const fixture: SelectedCriteria = {
      ...this.withMandatory,
      criteriaUuid: '38e16ccd-ca08-45fe-b823-5c80ec015fd0',
      importance: SelectedCriteriaImportance.MustHave,
    };

    return fixture;
  }

  public static get withImportanceNiceToHaveAndCriteriaUuidFixed(): SelectedCriteria {
    const fixture: SelectedCriteria = {
      ...this.withMandatory,
      criteriaUuid: '59562520-98fa-474b-b06d-164f08297b1a',
      importance: SelectedCriteriaImportance.NiceToHave,
    };

    return fixture;
  }

  public static get withImportanceSuperNiceToHaveAndCriteriaUuidFixed(): SelectedCriteria {
    const fixture: SelectedCriteria = {
      ...this.withMandatory,
      criteriaUuid: '022002f3-b48f-4b3a-ba9f-27878e8c4f93',
      importance: SelectedCriteriaImportance.SuperNiceToHave,
    };

    return fixture;
  }
}

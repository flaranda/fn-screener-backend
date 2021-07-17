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
}

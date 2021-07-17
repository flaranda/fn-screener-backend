import { CriteriaFixtures } from '../../../criteria/fixtures/domain/CriteriaFixtures';
import { UserFixtures } from '../../../user/fixtures/domain/UserFixtures';
import { UserCriteria } from '../../models/domain/UserCriteria';
import { UserCriteriaImportance } from '../../models/domain/UserCriteriaImportance';

export class UserCriteriaFixtures {
  public static get withMandatory(): UserCriteria {
    const fixture: UserCriteria = {
      createdAt: new Date('2021-07-17T00:00:00Z'),
      criteriaUuid: CriteriaFixtures.withMandatory.uuid,
      importance: UserCriteriaImportance.MustHave,
      updatedAt: new Date('2021-07-17T00:00:00Z'),
      userUuid: UserFixtures.withMandatory.uuid,
      uuid: 'ca062b0f-ff9f-41da-a223-05855ce0d1cd',
    };

    return fixture;
  }
}

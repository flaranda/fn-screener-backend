import { SelectedCriteriaImportance } from '../../models/domain/SelectedCriteriaImportance';
import { SelectedCriteriaUpdateQuery } from '../../models/domain/SelectedCriteriaUpdateQuery';
import { SelectedCriteriaFixtures } from './SelectedCriteriaFixtures';

export class SelectedCriteriaUpdateQueryFixtures {
  public static get withMandatory(): SelectedCriteriaUpdateQuery {
    const fixture: SelectedCriteriaUpdateQuery = {
      uuid: SelectedCriteriaFixtures.withMandatory.uuid,
    };

    return fixture;
  }

  public static get withImportance(): SelectedCriteriaUpdateQuery {
    const fixture: SelectedCriteriaUpdateQuery = {
      ...this.withMandatory,
      importance: SelectedCriteriaImportance.MustHave,
    };

    return fixture;
  }
}

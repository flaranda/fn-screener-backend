import * as inversify from 'inversify';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { UserCriteria } from '../../models/domain/UserCriteria';
import { UserCriteriaMongoDocument } from '../../models/mongo/UserCriteriaMongoDocument';
import { userCriteriaMongoImportanceToUserCriteriaImportanceMap } from '../../models/mongo/userCriteriaMongoImportanceToUserCriteriaImportanceMap';

@inversify.injectable()
export class UserCriteriaMongoDocumentToUserCriteriaTransformer
  implements ITransformer<UserCriteriaMongoDocument, UserCriteria>
{
  public async transform(
    userCriteriaMongo: UserCriteriaMongoDocument,
  ): Promise<UserCriteria> {
    const userCriteria: UserCriteria = {
      createdAt: userCriteriaMongo.created_at,
      criteriaUuid: userCriteriaMongo.criteria_uuid,
      importance:
        userCriteriaMongoImportanceToUserCriteriaImportanceMap[
          userCriteriaMongo.importance
        ],
      updatedAt: userCriteriaMongo.updated_at,
      userUuid: userCriteriaMongo.user_uuid,
      uuid: userCriteriaMongo.uuid,
    };

    return userCriteria;
  }
}

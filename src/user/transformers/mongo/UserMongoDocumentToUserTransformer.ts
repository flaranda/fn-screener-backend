import * as inversify from 'inversify';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { User } from '../../models/domain/User';
import { UserMongoDocument } from '../../models/mongo/UserMongoDocument';

@inversify.injectable()
export class UserMongoDocumentToUserTransformer
  implements ITransformer<UserMongoDocument, User>
{
  public async transform(userMongoDocument: UserMongoDocument): Promise<User> {
    const user: User = {
      createdAt: userMongoDocument.created_at,
      email: userMongoDocument.email,
      name: userMongoDocument.name,
      updatedAt: userMongoDocument.updated_at,
      uuid: userMongoDocument.uuid,
    };

    return user;
  }
}

import * as inversify from 'inversify';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { Criteria } from '../../models/domain/Criteria';
import { CriteriaMongoDocument } from '../../models/mongo/CriteriaMongoDocument';

@inversify.injectable()
export class CriteriaMongoDocumentToCriteriaTransformer
  implements ITransformer<CriteriaMongoDocument, Criteria>
{
  public async transform(
    criteriaMongo: CriteriaMongoDocument,
  ): Promise<Criteria> {
    const criteria: Criteria = {
      createdAt: criteriaMongo.created_at,
      name: criteriaMongo.name,
      updatedAt: criteriaMongo.updated_at,
      uuid: criteriaMongo.uuid,
    };

    return criteria;
  }
}

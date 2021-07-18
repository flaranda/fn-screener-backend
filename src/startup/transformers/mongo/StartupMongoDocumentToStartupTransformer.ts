import url from 'url';

import * as inversify from 'inversify';

import { ITransformer } from '../../../common/interfaces/ITransformer';
import { Startup } from '../../models/domain/Startup';
import { StartupMongoDocument } from '../../models/mongo/StartupMongoDocument';

@inversify.injectable()
export class StartupMongoDocumentToStartupTransformer
  implements ITransformer<StartupMongoDocument, Startup>
{
  public async transform(
    startupMongoDocument: StartupMongoDocument,
  ): Promise<Startup> {
    const startup: Startup = {
      createdAt: startupMongoDocument.created_at,
      name: startupMongoDocument.name,
      updatedAt: startupMongoDocument.updated_at,
      url: new url.URL(startupMongoDocument.url),
      uuid: startupMongoDocument.uuid,
    };

    return startup;
  }
}

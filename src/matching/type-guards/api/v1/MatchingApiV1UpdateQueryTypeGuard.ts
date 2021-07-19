import * as inversify from 'inversify';

import { AjvSchemaId } from '../../../../ajv/models/AjvSchemaId';
import { AjvTypeGuard } from '../../../../ajv/modules/AjvTypeGuard';
import { MatchingApiV1UpdateQuery } from '../../../models/api/v1/MatchingApiV1UpdateQuery';

@inversify.injectable()
export class MatchingApiV1UpdateQueryTypeGuard extends AjvTypeGuard<MatchingApiV1UpdateQuery> {
  protected schemaId: AjvSchemaId = AjvSchemaId.MatchingApiV1UpdateQuery;
}

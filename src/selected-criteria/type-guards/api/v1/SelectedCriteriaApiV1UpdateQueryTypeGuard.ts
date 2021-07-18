import * as inversify from 'inversify';

import { AjvSchemaId } from '../../../../ajv/models/AjvSchemaId';
import { AjvTypeGuard } from '../../../../ajv/modules/AjvTypeGuard';
import { SelectedCriteriaApiV1UpdateQuery } from '../../../models/api/v1/SelectedCriteriaApiV1UpdateQuery';

@inversify.injectable()
export class SelectedCriteriaApiV1UpdateQueryTypeGuard extends AjvTypeGuard<SelectedCriteriaApiV1UpdateQuery> {
  protected schemaId: AjvSchemaId =
    AjvSchemaId.SelectedCriteriaApiV1UpdateQuery;
}

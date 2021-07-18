import * as inversify from 'inversify';

import { AjvSchemaId } from '../../../../ajv/models/AjvSchemaId';
import { AjvTypeGuard } from '../../../../ajv/modules/AjvTypeGuard';
import { CriteriaComplianceApiV1UpdateQuery } from '../../../models/api/v1/CriteriaComplianceApiV1UpdateQuery';

@inversify.injectable()
export class CriteriaComplianceApiV1UpdateQueryTypeGuard extends AjvTypeGuard<CriteriaComplianceApiV1UpdateQuery> {
  protected schemaId: AjvSchemaId =
    AjvSchemaId.CriteriaComplianceApiV1UpdateQuery;
}

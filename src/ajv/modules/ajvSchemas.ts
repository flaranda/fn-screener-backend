import * as ajv from 'ajv';

import { AjvSchemaId } from '../models/AjvSchemaId';
import CriteriaComplianceApiV1UpdateQuerySchema from '../schemas/api/v1/CriteriaComplianceApiV1UpdateQuerySchema.json';
import SelectedCriteriaApiV1UpdateQuerySchema from '../schemas/api/v1/SelectedCriteriaApiV1UpdateQuerySchema.json';

export const ajvSchemas: { [TKey in AjvSchemaId]: ajv.AnySchema } = {
  [AjvSchemaId.CriteriaComplianceApiV1UpdateQuery]:
    CriteriaComplianceApiV1UpdateQuerySchema,
  [AjvSchemaId.SelectedCriteriaApiV1UpdateQuery]:
    SelectedCriteriaApiV1UpdateQuerySchema,
};

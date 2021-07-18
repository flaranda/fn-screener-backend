import * as ajv from 'ajv';

import { AjvSchemaId } from '../models/AjvSchemaId';
import SelectedCriteriaApiV1UpdateQuerySchema from '../schemas/api/v1/SelectedCriteriaApiV1UpdateQuerySchema.json';

export const ajvSchemas: { [TKey in AjvSchemaId]: ajv.AnySchema } = {
  [AjvSchemaId.SelectedCriteriaApiV1UpdateQuery]:
    SelectedCriteriaApiV1UpdateQuerySchema,
};

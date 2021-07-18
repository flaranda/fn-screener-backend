import Ajv from 'ajv';
import * as inversify from 'inversify';

import { AjvSchemaId } from '../models/AjvSchemaId';
import { ajvSchemas } from './ajvSchemas';

@inversify.injectable()
export class AjvService {
  public readonly ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({
      multipleOfPrecision: 4,
      schemas: ajvSchemas,
    });
  }

  public validate<TModel>(
    ajvSchemaName: AjvSchemaId,
    value: unknown,
  ): value is TModel {
    const isValid: boolean = this.ajv.validate<TModel>(ajvSchemaName, value);

    return isValid;
  }
}

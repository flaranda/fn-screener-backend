import * as inversify from 'inversify';

import { ITypeGuard } from '../../common/interfaces/ITypeGuard';
import { ajvInjectionTypes } from '../inversify/ajvInjectionTypes';
import { AjvSchemaId } from '../models/AjvSchemaId';
import { AjvService } from './AjvService';

@inversify.injectable()
export abstract class AjvTypeGuard<TModel> implements ITypeGuard<TModel> {
  protected abstract readonly schemaId: AjvSchemaId;

  constructor(
    @inversify.inject(ajvInjectionTypes.AjvService)
    protected readonly ajvService: AjvService,
  ) {}

  public is(value: unknown): value is TModel {
    const isValid: boolean = this.ajvService.validate(this.schemaId, value);

    return isValid;
  }
}

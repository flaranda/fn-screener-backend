import * as inversify from 'inversify';

import { AjvService } from '../modules/AjvService';
import { ajvInjectionTypes } from './ajvInjectionTypes';

export class AjvContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(ajvInjectionTypes.AjvService).to(AjvService).inSingletonScope();
    };

    super(registry);
  }
}

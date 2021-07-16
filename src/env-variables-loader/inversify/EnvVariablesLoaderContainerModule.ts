import * as inversify from 'inversify';

import { EnvVariablesLoader } from '../modules/EnvVariablesLoader';
import { envVariablesLoaderInjectionTypes } from './envVariablesLoaderInjectionTypes';

export class EnvVariablesLoaderContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      bind: inversify.interfaces.Bind,
    ): void => {
      bind(envVariablesLoaderInjectionTypes.EnvVariablesLoader)
        .to(EnvVariablesLoader)
        .inSingletonScope();
    };

    super(registry);
  }
}

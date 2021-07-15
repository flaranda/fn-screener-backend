import * as inversify from 'inversify';

export class ServerContainerModule extends inversify.ContainerModule {
  constructor() {
    const registry: inversify.interfaces.ContainerModuleCallBack = (
      _bind: inversify.interfaces.Bind,
    ): void => {
      return;
    };

    super(registry);
  }
}

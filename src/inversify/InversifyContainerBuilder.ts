import * as inversify from 'inversify';

import { IBuilder } from '../common/interfaces/IBuilder';
import { ServerContainerModule } from '../server/inversify/ServerContainerModule';

type InversifyContainerModuleConstructor = new () => inversify.ContainerModule;

export class InversifyContainerBuilder
  implements IBuilder<inversify.Container>
{
  constructor(
    private readonly containerModules: InversifyContainerModuleConstructor[] = [
      ServerContainerModule,
    ],
  ) {}

  public build(): inversify.Container {
    const container: inversify.Container = new inversify.Container();

    this.initialize(container);

    return container;
  }

  private initialize(container: inversify.Container): void {
    this.containerModules.map(
      (containerModuleConstructor: InversifyContainerModuleConstructor) =>
        this.loadContainerModule(container, containerModuleConstructor),
    );
  }

  private loadContainerModule(
    container: inversify.Container,
    containerModuleConstructor: InversifyContainerModuleConstructor,
  ): void {
    const containerModule: inversify.ContainerModule =
      new containerModuleConstructor();

    container.load(containerModule);
  }
}

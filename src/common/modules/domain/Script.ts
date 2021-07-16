import * as inversify from 'inversify';

import { InversifyContainerBuilder } from '../../../inversify/InversifyContainerBuilder';

export abstract class Script {
  protected inversifyContainer: inversify.Container;

  constructor() {
    const inversifyContainerBuilder: InversifyContainerBuilder =
      new InversifyContainerBuilder();

    this.inversifyContainer = inversifyContainerBuilder.build();
  }

  public abstract run(): Promise<void>;
}

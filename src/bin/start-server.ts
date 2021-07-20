import 'reflect-metadata';

import { IServer } from '../common/interfaces/IServer';
import { Script } from '../common/modules/domain/Script';
import { serverInjectionTypes } from '../server/inversify/serverInjectionTypes';

class StartServer extends Script {
  private readonly server: IServer;
  private readonly PROCESS_SIGNAL_SIGINT: string = 'SIGINT';
  private readonly PROCESS_SIGNAL_SIGTERM: string = 'SIGTERM';
  private readonly PROCESS_EXIT_CODE_ERROR: number = -1;

  constructor() {
    super();

    this.server = this.inversifyContainer.get(
      serverInjectionTypes.ExpressServer,
    );
  }

  public async run(): Promise<void> {
    await this.server.start();

    process.once(
      this.PROCESS_SIGNAL_SIGINT,
      this.createCloseSignalListener.bind(this),
    );

    process.once(
      this.PROCESS_SIGNAL_SIGTERM,
      this.createCloseSignalListener.bind(this),
    );
  }

  private createCloseSignalListener(): void {
    try {
      void this.server.stop();
    } catch (error: unknown) {
      console.error(error);

      process.exit(this.PROCESS_EXIT_CODE_ERROR);
    }
  }
}

void new StartServer().run();

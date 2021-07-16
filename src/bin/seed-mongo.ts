import 'reflect-metadata';

import { IDatasource } from '../common/interfaces/IDatasource';
import { ISeeder } from '../common/interfaces/ISeeder';
import { Script } from '../common/modules/domain/Script';
import { mongoInjectionTypes } from '../mongo/inversify/mongoInjectionTypes';
import { seederInjectionTypes } from '../seeder/inversify/seederInjectionTypes';

class SeedMongo extends Script {
  private readonly mongoSeeder: ISeeder;
  private readonly mongoDatasource: IDatasource;

  constructor() {
    super();

    this.mongoSeeder = this.inversifyContainer.get(
      seederInjectionTypes.MongoSeeder,
    );

    this.mongoDatasource = this.inversifyContainer.get(
      mongoInjectionTypes.MongoDatasource,
    );
  }

  public async run(): Promise<void> {
    await this.mongoDatasource.connect();

    await this.mongoSeeder.seed();

    await this.mongoDatasource.disconnect();
  }
}

void new SeedMongo().run();

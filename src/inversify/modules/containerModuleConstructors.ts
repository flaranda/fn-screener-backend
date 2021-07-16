import { CriteriaContainerModule } from '../../criteria/inversify/CriteriaContainerModule';
import { EnvVariablesLoaderContainerModule } from '../../env-variables-loader/inversify/EnvVariablesLoaderContainerModule';
import { MongoContainerModule } from '../../mongo/inversify/MongoContainerModule';
import { SeederContainerModule } from '../../seeder/inversify/SeederContainerModule';
import { ServerContainerModule } from '../../server/inversify/ServerContainerModule';
import { ContainerModuleConstructor } from '../models/ContainerModuleConstructor';

export const containerModuleConstructors: ContainerModuleConstructor[] = [
  CriteriaContainerModule,
  EnvVariablesLoaderContainerModule,
  MongoContainerModule,
  SeederContainerModule,
  ServerContainerModule,
];

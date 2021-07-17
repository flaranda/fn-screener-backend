import { CriteriaContainerModule } from '../../criteria/inversify/CriteriaContainerModule';
import { EnvVariablesLoaderContainerModule } from '../../env-variables-loader/inversify/EnvVariablesLoaderContainerModule';
import { MongoContainerModule } from '../../mongo/inversify/MongoContainerModule';
import { PingContainerModule } from '../../ping/inversify/PingContainerModule';
import { SeederContainerModule } from '../../seeder/inversify/SeederContainerModule';
import { SelectedCriteriaContainerModule } from '../../selected-criteria/inversify/SelectedCriteriaContainerModule';
import { ServerContainerModule } from '../../server/inversify/ServerContainerModule';
import { UserContainerModule } from '../../user/inversify/UserContainerModule';
import { ContainerModuleConstructor } from '../models/ContainerModuleConstructor';

export const containerModuleConstructors: ContainerModuleConstructor[] = [
  CriteriaContainerModule,
  EnvVariablesLoaderContainerModule,
  MongoContainerModule,
  PingContainerModule,
  SeederContainerModule,
  SelectedCriteriaContainerModule,
  ServerContainerModule,
  UserContainerModule,
];

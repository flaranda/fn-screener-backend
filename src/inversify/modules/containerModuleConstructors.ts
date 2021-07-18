import { AjvContainerModule } from '../../ajv/inversify/AjvContainerModule';
import { CriteriaComplianceContainerModule } from '../../criteria-compliance/inversify/CriteriaComplianceContainerModule';
import { CriteriaContainerModule } from '../../criteria/inversify/CriteriaContainerModule';
import { EnvVariablesLoaderContainerModule } from '../../env-variables-loader/inversify/EnvVariablesLoaderContainerModule';
import { MongoContainerModule } from '../../mongo/inversify/MongoContainerModule';
import { PingContainerModule } from '../../ping/inversify/PingContainerModule';
import { SeederContainerModule } from '../../seeder/inversify/SeederContainerModule';
import { SelectedCriteriaContainerModule } from '../../selected-criteria/inversify/SelectedCriteriaContainerModule';
import { ServerContainerModule } from '../../server/inversify/ServerContainerModule';
import { StartupContainerModule } from '../../startup/inversify/StartupContainerModule';
import { UserContainerModule } from '../../user/inversify/UserContainerModule';
import { ContainerModuleConstructor } from '../models/ContainerModuleConstructor';

export const containerModuleConstructors: ContainerModuleConstructor[] = [
  AjvContainerModule,
  CriteriaContainerModule,
  CriteriaComplianceContainerModule,
  EnvVariablesLoaderContainerModule,
  MongoContainerModule,
  PingContainerModule,
  SeederContainerModule,
  SelectedCriteriaContainerModule,
  ServerContainerModule,
  StartupContainerModule,
  UserContainerModule,
];

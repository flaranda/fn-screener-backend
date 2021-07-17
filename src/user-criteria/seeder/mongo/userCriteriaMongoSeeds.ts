import { criteriaMongoSeeds } from '../../../criteria/seeder/mongo/criteriaMongoSeeds';
import { userMongoSeeds } from '../../../user/seeder/mongo/userMongoSeeds';
import { UserCriteriaMongoImportance } from '../../models/mongo/UserCriteriaMongoImportance';
import { UserCriteriaMongoSeed } from '../../models/mongo/UserCriteriaMongoSeed';

const tonyStarkCriteriaMongoSeeds: UserCriteriaMongoSeed[] = [
  {
    criteria_uuid: criteriaMongoSeeds[0]?.uuid as string,
    importance: UserCriteriaMongoImportance.must_have,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: '60ed9c4e-c093-4ead-94e0-dec9aae9b599',
  },
  {
    criteria_uuid: criteriaMongoSeeds[1]?.uuid as string,
    importance: UserCriteriaMongoImportance.must_have,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: 'c190c3d9-d40e-4ab7-b8a3-1d98da51f12b',
  },
  {
    criteria_uuid: criteriaMongoSeeds[2]?.uuid as string,
    importance: UserCriteriaMongoImportance.nice_to_have,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: '16411a7f-146c-4411-9ce4-885f98be4493',
  },
  {
    criteria_uuid: criteriaMongoSeeds[3]?.uuid as string,
    importance: UserCriteriaMongoImportance.super_nice_to_have,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: '38f65f9f-7178-4365-abb0-ea1ee7194fd4',
  },
  {
    criteria_uuid: criteriaMongoSeeds[4]?.uuid as string,
    importance: UserCriteriaMongoImportance.nice_to_have,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: '63977074-1f83-4913-b79a-2d3cee42d9f5',
  },
  {
    criteria_uuid: criteriaMongoSeeds[5]?.uuid as string,
    importance: UserCriteriaMongoImportance.super_nice_to_have,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: '5d80a19e-9fdd-41f8-98a6-3c8d27783fdc',
  },
  {
    criteria_uuid: criteriaMongoSeeds[6]?.uuid as string,
    importance: UserCriteriaMongoImportance.must_have,
    user_uuid: userMongoSeeds[0]?.uuid as string,
    uuid: 'b75891cd-310c-404f-ba2d-de73ff0ba5a3',
  },
];

export const userCriteriaMongoSeeds: UserCriteriaMongoSeed[] = [
  ...tonyStarkCriteriaMongoSeeds,
];

import { criteriaMongoSeeds } from '../../../criteria/seeder/mongo/criteriaMongoSeeds';
import { startupMongoSeeds } from '../../../startup/seeder/mongo/startupMongoSeeds';
import { CriteriaComplianceMongoAnswer } from '../../models/mongo/CriteriaComplianceMongoAnswer';
import { CriteriaComplianceMongoSeed } from '../../models/mongo/CriteriaComplianceMongoSeed';

const blisseyCriteriaComplianceSeeds: CriteriaComplianceMongoSeed[] = [
  {
    answer: CriteriaComplianceMongoAnswer.yes,
    criteria_uuid: criteriaMongoSeeds[0]?.uuid as string,
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    uuid: '22878c87-fe6a-4943-bad7-bc1d5c3cbd16',
  },
  {
    answer: CriteriaComplianceMongoAnswer.no,
    criteria_uuid: criteriaMongoSeeds[1]?.uuid as string,
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    uuid: '2015999d-537d-4ded-b563-1c2232a6e483',
  },
  {
    answer: CriteriaComplianceMongoAnswer.yes,
    criteria_uuid: criteriaMongoSeeds[2]?.uuid as string,
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    uuid: '527a7562-13bd-40b0-bd9e-15f7517a0357',
  },
  {
    answer: CriteriaComplianceMongoAnswer.no_answer,
    criteria_uuid: criteriaMongoSeeds[3]?.uuid as string,
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    uuid: '10fc9885-bd24-46a7-acb0-47409e66a88a',
  },
  {
    answer: CriteriaComplianceMongoAnswer.no,
    criteria_uuid: criteriaMongoSeeds[4]?.uuid as string,
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    uuid: '6a0a2396-6e82-4783-8066-c04bc5c9aec0',
  },
  {
    answer: CriteriaComplianceMongoAnswer.yes,
    criteria_uuid: criteriaMongoSeeds[5]?.uuid as string,
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    uuid: 'd459affa-8ba9-4f81-80cd-33983b5fd8b9',
  },
  {
    answer: CriteriaComplianceMongoAnswer.yes,
    criteria_uuid: criteriaMongoSeeds[6]?.uuid as string,
    startup_uuid: startupMongoSeeds[0]?.uuid as string,
    uuid: '9f374af3-ec59-4bb3-a67f-bbbb39fbe2a9',
  },
];

export const criteriaComplianceMongoSeeds: CriteriaComplianceMongoSeed[] = [
  ...blisseyCriteriaComplianceSeeds,
];

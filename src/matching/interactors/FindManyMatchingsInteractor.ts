import * as inversify from 'inversify';

import { IFindManyRepository } from '../../common/interfaces/IFindManyRepository';
import { FindManyEntitiesInteractor } from '../../common/modules/domain/FindManyEntitiesInteractor';
import { matchingInjectionTypes } from '../inversify/matchingInjectionTypes';
import { Matching } from '../models/domain/Matching';
import { MatchingFindQuery } from '../models/domain/MatchingFindQuery';

@inversify.injectable()
export class FindManyMatchingsInteractor extends FindManyEntitiesInteractor<
  MatchingFindQuery,
  Matching
> {
  constructor(
    @inversify.inject(matchingInjectionTypes.MatchingMongoFindManyRepository)
    criteriaFindManyRepository: IFindManyRepository<
      MatchingFindQuery,
      Matching
    >,
  ) {
    super(criteriaFindManyRepository);
  }
}

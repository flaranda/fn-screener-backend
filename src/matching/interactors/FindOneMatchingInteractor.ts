import * as inversify from 'inversify';

import { IFindOneRepository } from '../../common/interfaces/IFindOneRepository';
import { FindOneEntityInteractor } from '../../common/modules/domain/FindOneEntityInteractor';
import { matchingInjectionTypes } from '../inversify/matchingInjectionTypes';
import { Matching } from '../models/domain/Matching';
import { MatchingFindQuery } from '../models/domain/MatchingFindQuery';

@inversify.injectable()
export class FindOneMatchingInteractor extends FindOneEntityInteractor<
  MatchingFindQuery,
  Matching
> {
  constructor(
    @inversify.inject(matchingInjectionTypes.MatchingMongoFindOneRepository)
    matchingFindOneRepository: IFindOneRepository<MatchingFindQuery, Matching>,
  ) {
    super(matchingFindOneRepository);
  }
}

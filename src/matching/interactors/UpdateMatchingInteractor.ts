import * as inversify from 'inversify';

import { IUpdateRepository } from '../../common/interfaces/IUpdateRepository';
import { UpdateEntityInteractor } from '../../common/modules/domain/UpdateEntityInteractor';
import { matchingInjectionTypes } from '../inversify/matchingInjectionTypes';
import { Matching } from '../models/domain/Matching';
import { MatchingUpdateQuery } from '../models/domain/MatchingUpdateQuery';

@inversify.injectable()
export class UpdateMatchingInteractor extends UpdateEntityInteractor<
  MatchingUpdateQuery,
  Matching
> {
  constructor(
    @inversify.inject(matchingInjectionTypes.MatchingMongoUpdateRepository)
    matchingUpdateRepository: IUpdateRepository<MatchingUpdateQuery, Matching>,
  ) {
    super(matchingUpdateRepository);
  }
}

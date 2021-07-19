import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
import { matchingInjectionTypes } from '../inversify/matchingInjectionTypes';
import { Matching } from '../models/domain/Matching';
import { MatchingFindQuery } from '../models/domain/MatchingFindQuery';

@inversify.injectable()
export class MatchingUuidRequestParamHandler extends ExpressRequestParamHandler {
  constructor(
    @inversify.inject(matchingInjectionTypes.FindOneMatchingInteractor)
    private readonly findOneMatchingInteractor: IInteractor<
      MatchingFindQuery,
      Matching
    >,
  ) {
    super();
  }

  protected async handle(
    request: RequestWithContext,
    _response: express.Response,
    next: express.NextFunction,
    param: string,
  ): Promise<void> {
    const matchingFindQuery: MatchingFindQuery = {
      uuid: param,
    };

    const matching: Matching = await this.findOneMatchingInteractor.interact(
      matchingFindQuery,
    );

    const requestContext: RequestContext = getRequestContext(request);

    requestContext.matching = matching;

    next();
  }
}

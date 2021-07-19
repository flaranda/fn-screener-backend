import express from 'express';
import * as inversify from 'inversify';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ApiExpressRequestHandler } from '../../server/modules/ApiExpressRequestHandler';
import { matchingInjectionTypes } from '../inversify/matchingInjectionTypes';
import { MatchingApiV1 } from '../models/api/v1/MatchingApiV1';
import { Matching } from '../models/domain/Matching';
import { MatchingFindQuery } from '../models/domain/MatchingFindQuery';

@inversify.injectable()
export class GetUsersMeMatchingsRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      matchingInjectionTypes.GetV1MatchingsRequestToMatchingFindQueryTransformer,
    )
    private readonly getV1MatchingsRequestToMatchingFindQueryTransformer: ITransformer<
      RequestWithContext,
      MatchingFindQuery
    >,
    @inversify.inject(matchingInjectionTypes.FindManyMatchingsInteractor)
    private readonly findManyMatchingsInteractor: IInteractor<
      MatchingFindQuery,
      Matching[]
    >,
    @inversify.inject(matchingInjectionTypes.MatchingToMatchingApiV1Transformer)
    private readonly matchingToMatchingApiV1Transformer: ITransformer<
      Matching,
      MatchingApiV1
    >,
  ) {
    super();
  }

  protected async handleV1(
    request: RequestWithContext,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    const matchingFindQuery: MatchingFindQuery =
      await this.getV1MatchingsRequestToMatchingFindQueryTransformer.transform(
        request,
      );

    const matchings: Matching[] =
      await this.findManyMatchingsInteractor.interact(matchingFindQuery);

    const matchingsApiV1: MatchingApiV1[] = await Promise.all(
      matchings.map(async (matching: Matching) => {
        const matchingApiV1: MatchingApiV1 =
          await this.matchingToMatchingApiV1Transformer.transform(matching);

        return matchingApiV1;
      }),
    );

    response.json(matchingsApiV1);
  }
}

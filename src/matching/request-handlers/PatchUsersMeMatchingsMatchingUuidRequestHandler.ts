import express from 'express';
import * as inversify from 'inversify';

import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ApiExpressRequestHandler } from '../../server/modules/ApiExpressRequestHandler';
import { matchingInjectionTypes } from '../inversify/matchingInjectionTypes';
import { MatchingApiV1 } from '../models/api/v1/MatchingApiV1';
import { Matching } from '../models/domain/Matching';
import { MatchingUpdateQuery } from '../models/domain/MatchingUpdateQuery';

@inversify.injectable()
export class PatchUsersMeMatchingsMatchingUuidRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      matchingInjectionTypes.PatchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer,
    )
    private readonly patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer: ITransformer<
      RequestWithContext,
      MatchingUpdateQuery
    >,
    @inversify.inject(matchingInjectionTypes.UpdateMatchingInteractor)
    private readonly updateMatchingInteractor: IInteractor<
      MatchingUpdateQuery,
      Matching
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
    const matchingUpdateQuery: MatchingUpdateQuery =
      await this.patchV1MatchingsMatchingUuidRequestToMatchingUpdateQueryTransformer.transform(
        request,
      );

    const matching: Matching = await this.updateMatchingInteractor.interact(
      matchingUpdateQuery,
    );

    const matchingApiV1: MatchingApiV1 =
      await this.matchingToMatchingApiV1Transformer.transform(matching);

    response.json(matchingApiV1);
  }
}

import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { hasValue } from '../../common/helpers/hasValue';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { ITransformer } from '../../common/interfaces/ITransformer';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ApiExpressRequestHandler } from '../../server/modules/ApiExpressRequestHandler';
import { User } from '../../user/models/domain/User';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteriaApiV1 } from '../models/api/v1/SelectedCriteriaApiV1';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../models/domain/SelectedCriteriaFindQuery';

@inversify.injectable()
export class GetUsersMeSelectedCriteriasRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.FindManySelectedCriteriasInteractor,
    )
    private readonly findManySelectedCriteriasInteractor: IInteractor<
      SelectedCriteriaFindQuery,
      SelectedCriteria[]
    >,
    @inversify.inject(
      selectedCriteriaInjectionTypes.SelectedCriteriaToSelectedCriteriaApiV1Transformer,
    )
    private readonly selectedCriteriaToSelectedCriteriaApiV1Transformer: ITransformer<
      SelectedCriteria,
      SelectedCriteriaApiV1
    >,
  ) {
    super();
  }

  protected async handleV1(
    request: RequestWithContext,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    const selectedCriteriaFindQuery: SelectedCriteriaFindQuery =
      this.transformRequestToSelectedCriteriaFindQuery(request);

    const selectedCriterias: SelectedCriteria[] =
      await this.findManySelectedCriteriasInteractor.interact(
        selectedCriteriaFindQuery,
      );

    const selectedCriteriasApiV1: SelectedCriteriaApiV1[] = await Promise.all(
      selectedCriterias.map(async (selectedCriteria: SelectedCriteria) => {
        const selectedCriteriaApiV1: SelectedCriteriaApiV1 =
          await this.selectedCriteriaToSelectedCriteriaApiV1Transformer.transform(
            selectedCriteria,
          );

        return selectedCriteriaApiV1;
      }),
    );

    response.json(selectedCriteriasApiV1);
  }

  private transformRequestToSelectedCriteriaFindQuery(
    request: RequestWithContext,
  ): SelectedCriteriaFindQuery {
    const requestContext: RequestContext = getRequestContext(request);
    const user: User | undefined = requestContext.user;

    let selectedCriteriaFindQuery: SelectedCriteriaFindQuery;

    if (hasValue(user)) {
      selectedCriteriaFindQuery = {
        userUuid: user.uuid,
      };
    } else {
      throw new Error('User not present in Request');
    }

    return selectedCriteriaFindQuery;
  }
}

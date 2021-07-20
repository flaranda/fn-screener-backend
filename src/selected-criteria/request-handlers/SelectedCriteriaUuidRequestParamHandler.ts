import express from 'express';
import * as inversify from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ExpressRequestParamHandler } from '../../server/modules/ExpressRequestParamHandler';
import { selectedCriteriaInjectionTypes } from '../inversify/selectedCriteriaInjectionTypes';
import { SelectedCriteria } from '../models/domain/SelectedCriteria';
import { SelectedCriteriaFindQuery } from '../models/domain/SelectedCriteriaFindQuery';

@inversify.injectable()
export class SelectedCriteriaUuidRequestParamHandler extends ExpressRequestParamHandler {
  constructor(
    @inversify.inject(
      selectedCriteriaInjectionTypes.FindOneSelectedCriteriaInteractor,
    )
    private readonly findOneSelectedCriteriaInteractor: IInteractor<
      SelectedCriteriaFindQuery,
      SelectedCriteria
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
    const selectedCriteriaFindQuery: SelectedCriteriaFindQuery = {
      uuid: param,
    };

    const selectedCriteria: SelectedCriteria =
      await this.findOneSelectedCriteriaInteractor.interact(
        selectedCriteriaFindQuery,
      );

    const requestContext: RequestContext = getRequestContext(request);

    requestContext.selectedCriteria = selectedCriteria;

    next();
  }
}

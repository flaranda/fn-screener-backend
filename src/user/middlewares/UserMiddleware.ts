import express from 'express';
import { inject } from 'inversify';

import { getRequestContext } from '../../common/helpers/getRequestContext';
import { IInteractor } from '../../common/interfaces/IInteractor';
import { RequestContext } from '../../common/models/domain/RequestContext';
import { RequestWithContext } from '../../server/models/RequestWithContext';
import { ExpressRequestHandler } from '../../server/modules/ExpressRequestHandler';
import { userInjectionTypes } from '../inversify/userInjectionTypes';
import { User } from '../models/domain/User';
import { UserFindQuery } from '../models/domain/UserFindQuery';

export class UserMiddleware extends ExpressRequestHandler {
  constructor(
    @inject(userInjectionTypes.FindOneUserInteractor)
    private readonly findOneUserInteractor: IInteractor<UserFindQuery, User>,
  ) {
    super();
  }

  protected async handle(
    request: RequestWithContext,
    _response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    const userFindQuery: UserFindQuery = {};

    const user: User = await this.findOneUserInteractor.interact(userFindQuery);

    const context: RequestContext = getRequestContext(request);

    context.user = user;

    next();
  }
}

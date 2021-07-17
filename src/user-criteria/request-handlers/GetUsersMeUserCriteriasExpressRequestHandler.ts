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
import { userCriteriaInjectionTypes } from '../inversify/userCriteriaInjectionTypes';
import { UserCriteriaApiV1 } from '../models/api/v1/UserCriteriaApiV1';
import { UserCriteria } from '../models/domain/UserCriteria';
import { UserCriteriaFindQuery } from '../models/domain/UserCriteriaFindQuery';

@inversify.injectable()
export class GetUsersMeUserCriteriasExpressRequestHandler extends ApiExpressRequestHandler {
  constructor(
    @inversify.inject(
      userCriteriaInjectionTypes.FindManyUserCriteriasInteractor,
    )
    private readonly findManyUserCriteriasInteractor: IInteractor<
      UserCriteriaFindQuery,
      UserCriteria[]
    >,
    @inversify.inject(
      userCriteriaInjectionTypes.UserCriteriaToUserCriteriaApiV1Transformer,
    )
    private readonly userCriteriaToUserCriteriaApiV1Transformer: ITransformer<
      UserCriteria,
      UserCriteriaApiV1
    >,
  ) {
    super();
  }

  protected async handleV1(
    request: RequestWithContext,
    response: express.Response,
    _next: express.NextFunction,
  ): Promise<void> {
    const userCriteriaFindQuery: UserCriteriaFindQuery =
      this.transformRequestToUserCriteriaFindQuery(request);

    const userCriterias: UserCriteria[] =
      await this.findManyUserCriteriasInteractor.interact(
        userCriteriaFindQuery,
      );

    const userCriteriasApiV1: UserCriteriaApiV1[] = await Promise.all(
      userCriterias.map(async (userCriteria: UserCriteria) => {
        const criteriaApiV1: UserCriteriaApiV1 =
          await this.userCriteriaToUserCriteriaApiV1Transformer.transform(
            userCriteria,
          );

        return criteriaApiV1;
      }),
    );

    response.json(userCriteriasApiV1);
  }

  private transformRequestToUserCriteriaFindQuery(
    request: RequestWithContext,
  ): UserCriteriaFindQuery {
    const requestContext: RequestContext = getRequestContext(request);
    const user: User | undefined = requestContext.user;

    let userCriteriaFindQuery: UserCriteriaFindQuery;

    if (hasValue(user)) {
      userCriteriaFindQuery = {
        userUuid: user.uuid,
      };
    } else {
      throw new Error('User not present in Request');
    }

    return userCriteriaFindQuery;
  }
}

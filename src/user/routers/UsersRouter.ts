import * as inversify from 'inversify';

import { ExpressRouter } from '../../server/modules/ExpressRouter';
import { userInjectionTypes } from '../inversify/userInjectionTypes';

@inversify.injectable()
export class UsersRouter extends ExpressRouter {
  constructor(
    @inversify.inject(userInjectionTypes.UsersMeRouter)
    private readonly usersMeRouter: ExpressRouter,
  ) {
    super();

    this.initialize();
  }

  protected initialize(): void {
    this.expressRouter.use('/me', this.usersMeRouter.handler);
  }
}

import { ExpressRequest } from '../../server/models/express/ExpressRequest';
import { RequestContext } from '../models/domain/RequestContext';
import { requestContextSymbol } from '../models/domain/requestContextSymbol';
import { hasValue } from './hasValue';

export function getRequestContext(request: ExpressRequest): RequestContext {
  let context: RequestContext | undefined = request[requestContextSymbol];

  if (!hasValue(context)) {
    context = {};

    request[requestContextSymbol] = context;
  }

  return context;
}

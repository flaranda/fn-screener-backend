import express from 'express';

import { RequestContext } from '../../../common/models/domain/RequestContext';
import { requestContextSymbol } from '../../../common/models/domain/requestContextSymbol';

export interface ExpressRequest extends express.Request {
  [requestContextSymbol]?: RequestContext;
}

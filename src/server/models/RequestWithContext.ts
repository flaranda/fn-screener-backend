import express from 'express';

import { RequestContext } from '../../common/models/domain/RequestContext';
import { requestContextSymbol } from '../../common/models/domain/requestContextSymbol';

export interface RequestWithContext extends express.Request {
  [requestContextSymbol]?: RequestContext;
}

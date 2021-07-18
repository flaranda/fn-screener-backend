import { RequestWithContext } from '../../server/models/RequestWithContext';

export interface IRequestParser<TModel> {
  parse(request: RequestWithContext): Promise<TModel>;
}

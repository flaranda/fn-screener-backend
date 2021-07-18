export interface ITypeGuard<TModel> {
  is(value: unknown): value is TModel;
}

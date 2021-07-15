export interface ITransformer<TInput, TOutput> {
  transform(input: TInput): Promise<TOutput>;
}

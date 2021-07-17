export interface IInteractor<TInput, TOutput> {
  interact(input: TInput): Promise<TOutput>;
}

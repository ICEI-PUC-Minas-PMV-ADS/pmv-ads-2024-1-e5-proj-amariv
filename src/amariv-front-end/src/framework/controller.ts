/**
 * Base controller
 */

export abstract class PageBaseController<TState, TAction> {
  constructor(
    protected dispatch: React.Dispatch<TAction>,
  ) { }

  abstract doReducer(prevState: TState, action: TAction): TState;
}
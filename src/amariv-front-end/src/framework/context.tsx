import React from "react";
import { PageBaseController } from "./controller";

/**
 * Create page context.
 */

export const createPageContext = <
  TState,
  TAction,
  TController extends PageBaseController<TState, TAction>,
>({
  controllerClass,
  initialState,
}: {
  controllerClass: new (dispatch: React.Dispatch<TAction>) => TController,
  initialState: TState,
}) => {

  /**
   * Context state.
   */
  type PageContextState = {
    state: TState,
    controller: TController,
  };

  /**
   * Initial context state.
   */

  const initialPageContextState: PageContextState = {
    state: initialState,
    controller: new controllerClass(() => { }),
  };

  /**
   * Context
   */
  const PageContext = React.createContext<PageContextState>(initialPageContextState);

  /**
   * Implementation
   */

  return {
    Context: PageContext,
    Consumer: PageContext.Consumer,
    Provider: (props: React.PropsWithChildren) => {
      const [pageController, setPageController] = React.useState<TController | undefined>();
      const [pageState, pageDispatch] = React.useReducer<React.Reducer<TState, TAction>>(
        (state: TState, action: TAction): TState => {
          return pageController?.doReducer(state, action) ?? state;
        }, initialState);

      const pageMemo = React.useMemo(() => {
        return (
          <PageContext.Provider
            value={{ state: pageState, controller: pageController! }}>
            {props.children}
          </PageContext.Provider>
        );
      }, [props.children, pageState, pageController]);

      React.useLayoutEffect(() => {
        setPageController(new controllerClass(pageDispatch));
      }, [pageDispatch]);

      return (
        pageController !== undefined
          ? pageMemo
          : <></>
      );
    },
    usePageContext: (): PageContextState => React.useContext(PageContext),
    usePageController: (): TController => React.useContext(PageContext).controller,
    usePageState: (): TState => React.useContext(PageContext).state,
  };
};
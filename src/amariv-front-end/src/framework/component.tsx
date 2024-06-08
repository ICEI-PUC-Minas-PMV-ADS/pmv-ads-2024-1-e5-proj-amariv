/**
 * Page component HOC.
 */

export const PageComponent = <TProps extends {},>(
  PageComponent: React.ComponentType<TProps>,
  PageContextProvider: React.ComponentType<React.PropsWithChildren>,
) => {
  return (props: TProps) => {
    return (
      <PageContextProvider>
        <PageComponent {...props} />
      </PageContextProvider>
    );
  };
};
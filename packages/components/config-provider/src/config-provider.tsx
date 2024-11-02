import { createContext, useContext } from 'react';

interface ContextValue {}

const ConfigProviderContext = createContext<ContextValue>({});

export function ConfigProvider(props: { children?: React.ReactNode }) {
  const { children } = props;
  const configProviderContext = useContext(ConfigProviderContext);
  return (
    <_ConfigProvider context={configProviderContext}>
      {children}
    </_ConfigProvider>
  );
}

function _ConfigProvider(props: {
  children?: React.ReactNode;
  context: ContextValue;
}) {
  const { context, children } = props;
  let mergedContext = {};
  if (context) {
    mergedContext = {
      ...context,
    };
  }
  return (
    <ConfigProviderContext.Provider value={mergedContext}>
      {children}
    </ConfigProviderContext.Provider>
  );
}

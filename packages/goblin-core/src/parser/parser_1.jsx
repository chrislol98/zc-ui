function ParserProvider(props) {
  const [dslManager, _] = useState(() => {
    const dslManager = new dslManager();
    dslManager.init(props.dsl);
    return dslManager;
  });

  return (
    <DslManagerContext.Provider value={dslManager}>
      {children}
    </DslManagerContext.Provider>
  );
}

export function Parser(props) {
  return (
    <ParserProvider dsl={props.dsl}>
      <ParserImpl id={props.dsl.id} />
    </ParserProvider>
  );
}

function ParserImpl(props) {
  const { id } = props;
  const dsl = useDsl({ id });

  function render(dsl) {
    if (Array.isArray(dsl)) {
      return dsl.map(render);
    }
    const { name } = dsl;
    const config = dslMap.get(name);
    if (config?.parser) {
      return <config.parser id={dsl.id}>{render(dsl.children)}</config.parser>;
    }
    return null;
  }

  return render(dsl);
}

function useDsl(options) {
  const { id } = options;
  const dslManager = useDslManager();
  const dsl = useSyncExternalStore(
    dslManager.subscribe,
    () => dslManager.getDslFromMap(id),
    () => dslManager.getDslFromMap(id)
  );
  return dsl;
}

export function DivParser(props) {
  const { id, children } = props;
  // 这个是控制重渲染的
  const dsl = useDsl({ id });
  // 如果你要增删查改dsl，直接拿这个不就行了
  const dslManager = useDslManager();
  return <div>{children}</div>;
}

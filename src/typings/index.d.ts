declare global {
  // Generic Types
  type Nullable<T> = T | null;

  // Redux Types
  interface Action<T extends string> {
    type: T;
  }

  interface ActionWithPayload<T extends string, P> extends Action<T> {
    payload: P;
  }

  type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
}

interface ActionCreatorsMapObject {
  [actionCreator: string]: (...args: Array<any>) => any;
}

export {};

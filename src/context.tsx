import React, { ReactElement, ReactNode, createContext, useReducer, useMemo } from 'react';
import { firebase } from './lib';

export interface State {
  user: firebase.User | null;
}

enum ACTIONS {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
}

type SetUser = {
  type: ACTIONS.SET_USER;
  user: firebase.User;
};
const setUser = (user: firebase.User): SetUser => ({
  type: ACTIONS.SET_USER,
  user,
});

type ClearUser = {
  type: ACTIONS.CLEAR_USER;
};
const clearUser = (): ClearUser => ({
  type: ACTIONS.CLEAR_USER,
});

type Action = SetUser | ClearUser;

export interface Context extends State {
  setUser: (user: firebase.User) => void;
  clearUser: () => void;
}

export const AppContext = createContext({} as Context);

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.user };
    case ACTIONS.CLEAR_USER:
      return { ...state, user: null };
    default:
      throw new Error(`User Reducer Received Unrecognized Action`);
  }
}

interface Props {
  children: ReactNode | ReactNode[];
}

export function AppProvider({ children }: Props): ReactElement {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
  });

  const actions = useMemo(
    () => ({
      setUser: (user: firebase.User) => dispatch(setUser(user)),
      clearUser: () => dispatch(clearUser()),
    }),
    [],
  );

  return <AppContext.Provider value={{ ...state, ...actions }}>{children}</AppContext.Provider>;
}

import React from 'react';

type State = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string;
};

export const initialState: State = {
  username: 'ryan seery',
  email: 'ryanpseery@gmail.com',
  password: 'test1234',
  confirmPassword: 'test1234',
  loading: false,
  error: '',
};

enum ACTIONS {
  SET_INPUT = 'SET_INPUT',
  SET_USERNAME = 'SET_USERNAME',
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_CONFIRM_PASSWORD = 'SET_CONFIRM_PASSWORD',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_LOADING_ERROR = 'SET_LOADING_ERROR',
  CLEAR_STATE = 'CLEAR_STATE',
}

type SetInput = {
  type: ACTIONS.SET_INPUT;
  e: React.ChangeEvent<HTMLInputElement>;
};
export const setInput = (e: React.ChangeEvent<HTMLInputElement>): SetInput => ({
  type: ACTIONS.SET_INPUT,
  e,
});

type SetUsername = {
  type: ACTIONS.SET_USERNAME;
  username: string;
};
export const setUsername = (username: string): SetUsername => ({
  type: ACTIONS.SET_USERNAME,
  username,
});

type SetEmail = {
  type: ACTIONS.SET_EMAIL;
  email: string;
};
export const setEmail = (email: string): SetEmail => ({
  type: ACTIONS.SET_EMAIL,
  email,
});

type SetPassword = {
  type: ACTIONS.SET_PASSWORD;
  password: string;
};
export const setPassword = (password: string): SetPassword => ({
  type: ACTIONS.SET_PASSWORD,
  password,
});

type SetConfirmPassword = {
  type: ACTIONS.SET_CONFIRM_PASSWORD;
  confirmPassword: string;
};
export const setConfirmPassword = (confirmPassword: string): SetConfirmPassword => ({
  type: ACTIONS.SET_CONFIRM_PASSWORD,
  confirmPassword,
});

type SetLoading = {
  type: ACTIONS.SET_LOADING;
  loading: boolean;
};
export const setLoading = (loading: boolean): SetLoading => ({
  type: ACTIONS.SET_LOADING,
  loading,
});

type SetError = {
  type: ACTIONS.SET_ERROR;
  error: string;
};
export const setError = (error: string): SetError => ({
  type: ACTIONS.SET_ERROR,
  error,
});

type SetLoadingError = {
  type: ACTIONS.SET_LOADING_ERROR;
  loading: boolean;
  error: string;
};
export const setLoadingError = (loading: boolean, error: string): SetLoadingError => ({
  type: ACTIONS.SET_LOADING_ERROR,
  loading,
  error,
});

type ClearState = {
  type: ACTIONS.CLEAR_STATE;
};
export const clearState = (): ClearState => ({
  type: ACTIONS.CLEAR_STATE,
});

type Action =
  | SetInput
  | SetUsername
  | SetEmail
  | SetPassword
  | SetConfirmPassword
  | SetLoading
  | SetError
  | SetLoadingError
  | ClearState;

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SET_INPUT: {
      const { name, value } = action.e.target;

      return { ...state, [name]: value };
    }
    case ACTIONS.SET_USERNAME:
      return { ...state, username: action.username };
    case ACTIONS.SET_EMAIL: {
      return { ...state, email: action.email };
    }
    case ACTIONS.SET_PASSWORD:
      return { ...state, password: action.password };
    case ACTIONS.SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.confirmPassword };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.loading };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.error };
    case ACTIONS.SET_LOADING_ERROR:
      return { ...state, loading: action.loading, error: action.error };
    case ACTIONS.CLEAR_STATE:
      return { ...initialState };
    default:
      throw new Error(`Sign Up Reducer Received  Unrecognized Action `);
  }
}

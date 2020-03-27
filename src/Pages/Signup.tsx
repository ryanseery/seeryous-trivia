import React, { ReactElement, useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Input, Button } from '../Components';
import { registerUser } from '../utils';
import { FormWrapper } from './Signin';

type State = {
  email: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
  error: string;
};

enum ACTIONS {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_CONFIRM_PASSWORD = 'SET_CONFIRM_PASSWORD',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

type SetEmail = {
  type: ACTIONS.SET_EMAIL;
  email: string;
};
const setEmail = (email: string): SetEmail => ({
  type: ACTIONS.SET_EMAIL,
  email,
});

type SetPassword = {
  type: ACTIONS.SET_PASSWORD;
  password: string;
};
const setPassword = (password: string): SetPassword => ({
  type: ACTIONS.SET_PASSWORD,
  password,
});

type SetConfirmPassword = {
  type: ACTIONS.SET_CONFIRM_PASSWORD;
  confirmPassword: string;
};
const setConfirmPassword = (confirmPassword: string): SetConfirmPassword => ({
  type: ACTIONS.SET_CONFIRM_PASSWORD,
  confirmPassword,
});

type SetLoading = {
  type: ACTIONS.SET_LOADING;
  loading: boolean;
};
const setLoading = (loading: boolean): SetLoading => ({
  type: ACTIONS.SET_LOADING,
  loading,
});

type SetError = {
  type: ACTIONS.SET_ERROR;
  error: string;
};
const setError = (error: string): SetError => ({
  type: ACTIONS.SET_ERROR,
  error,
});

type Action = SetEmail | SetPassword | SetConfirmPassword | SetLoading | SetError;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SET_EMAIL:
      return { ...state, email: action.email };
    case ACTIONS.SET_PASSWORD:
      return { ...state, password: action.password };
    case ACTIONS.SET_CONFIRM_PASSWORD:
      return { ...state, confirmPassword: action.confirmPassword };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.loading };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.error };
    default:
      throw new Error(`Reducer Received  Unrecognized Action `);
  }
}

export function Signup(): ReactElement {
  const [state, dispatch] = useReducer(reducer, {
    email: 'ryanpseery@gmail.com',
    password: 'test1234',
    confirmPassword: 'test1234',
    loading: false,
    error: '',
  });

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.email.length === 0) {
      alert(`Please provide email.`);
      return;
    }

    if (state.password.length === 0) {
      alert(`Please provide password.`);
      return;
    }

    if (state.confirmPassword.length === 0) {
      alert(`Please confirm password.`);
      return;
    }

    if (state.password !== state.confirmPassword) {
      alert('Please confirm password.');
    }

    console.log({ state });

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((createdUser) => {
    //     console.log(createdUser);
    //     createdUser.user
    //       .updateProfile({
    //         displayName: username,
    //         photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
    //       })
    //       .then(() => {
    //         saveUser(createdUser).then(() => {
    //           console.log('user saved');
    //           setLoading(false);
    //         });
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         setError(err);
    //         setLoading(false);
    //       });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setError(err);
    //     setLoading(false);
    //   });
  };

  return (
    <Layout>
      <FormWrapper>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <Input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </label>

          <label htmlFor="password">
            Password
            <Input
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
            />
          </label>
          <Button type="submit">Sign In</Button>
        </Form>
      </FormWrapper>
    </Layout>
  );
}

import React, { ReactElement, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import md5 from 'md5';
import { Layout, Form, Input, Button } from '../../Components';
import { FormWrapper } from '../Signin';
import { firebase } from '../../lib';
import {
  reducer,
  setInput,
  setError,
  setLoading,
  setLoadingError,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
} from './state';

export function Signup(): ReactElement {
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    loading: false,
    error: '',
  });

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.email.length === 0) {
      dispatch(setError(`Please provide email.`));
      alert(`Please provide email.`);
      return;
    }

    if (state.password.length === 0) {
      dispatch(setError(`Please provide password.`));
      alert(`Please provide password.`);
      return;
    }

    if (state.confirmPassword.length === 0) {
      dispatch(setError(`Please confirm password.`));
      alert(`Please confirm password.`);
      return;
    }

    if (state.password !== state.confirmPassword) {
      dispatch(setError(`Please confirm password.`));
      alert(`Please confirm password.`);
      return;
    }

    dispatch(setLoading(true));

    firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then((createdUser) => {
        console.log(createdUser);
        if (createdUser) {
          createdUser?.user
            .updateProfile({
              displayName: state.username,
              photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
            })
            .then(() => {
              firebase
                .database()
                .ref('users')
                .child(createdUser?.user.uid)
                .set({
                  name: createdUser?.user.displayName,
                  avatar: createdUser?.user.photoURL,
                  gamesWon: 0,
                })
                .then(() => {
                  dispatch(setLoading(false));
                  history.push('/');
                });
            })
            .catch((err) => {
              console.error(err);
              dispatch(setLoadingError(false, err.msg));
            });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(setLoadingError(false, err.msg));
      });
  };

  return (
    <Layout>
      <FormWrapper>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <Input
              type="text"
              id="username"
              name="username"
              value={state.username}
              onChange={(e) => dispatch(setInput(e))}
            />
          </label>

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
          <Button type="submit">Sign Up</Button>
        </Form>
      </FormWrapper>
    </Layout>
  );
}

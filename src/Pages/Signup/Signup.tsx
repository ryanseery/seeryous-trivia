import React, { ReactElement, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import md5 from 'md5';
import { Layout, Form, Input, Button } from '../../Components';
import { FormWrapper } from '../Signin';
import {
  reducer,
  initialState,
  setError,
  setLoading,
  setLoadingError,
  setUsername,
  setEmail,
  setPassword,
  setConfirmPassword,
  clearState,
} from './state';
import { useFirebase } from '../../firebase';

export function Signup(): ReactElement {
  const { doCreateUserWithEmailAndPassword, createUser } = useFirebase();

  const history = useHistory();

  const [state, dispatch] = useReducer(reducer, initialState);

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

    doCreateUserWithEmailAndPassword(state.email, state.password)
      .then((authUser) => {
        if (authUser) {
          authUser?.user
            .updateProfile({
              displayName: state.username,
              photoURL: `http://gravatar.com/avatar/${md5(authUser.user.email)}?d=identicon`,
            })
            .then(() => {
              createUser(authUser).then(() => {
                dispatch(clearState());
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
              onChange={(e) => dispatch(setUsername(e.target.value))}
              placeholder="Username"
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
              placeholder="Email"
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
              placeholder="Password"
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
              placeholder="Confirm Password"
            />
          </label>
          <Button type="submit">Sign Up</Button>
        </Form>
      </FormWrapper>
    </Layout>
  );
}

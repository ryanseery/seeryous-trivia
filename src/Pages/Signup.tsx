import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Input, Button } from '../Components';
import { registerUser } from '../utils';
import { FormWrapper } from './Signin';

export function Signup(): ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.length === 0) {
      alert(`Please provide email.`);
      return;
    }

    if (password.length === 0) {
      alert(`Please provide password.`);
      return;
    }

    if (confirmEmail.length === 0) {
      alert(`Please confirm password.`);
      return;
    }

    if (password !== confirmEmail) {
      alert('Please confirm password.');
    }

    console.log({ email, password });

    const [user, error] = await registerUser(email, password);
    if (error) {
      console.warn(error);
    }

    if (user) {
      history.push('/signin');
    }
  };

  return (
    <Layout>
      <FormWrapper>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email
            <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label htmlFor="password">
            Password
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label htmlFor="confirmEmail">
            Confirm Password
            <Input
              type="password"
              id="confirmEmail"
              name="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
          </label>
          <Button type="submit">Sign In</Button>
        </Form>
      </FormWrapper>
    </Layout>
  );
}

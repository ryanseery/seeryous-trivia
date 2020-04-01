import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Layout, Form, Input, Button } from '../Components';
import { useFirebase } from '../firebase';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

export function Signin(): ReactElement {
  const { doSignInWithEmailAndPassword } = useFirebase();
  const history = useHistory();

  const [email, setEmail] = useState('ryanpseery@gmail.com');
  const [password, setPassword] = useState('test1234');

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

    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout>
      <FormWrapper>
        <h2>Sign In</h2>
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
          <Button type="submit">Sign In</Button>
        </Form>
      </FormWrapper>
    </Layout>
  );
}

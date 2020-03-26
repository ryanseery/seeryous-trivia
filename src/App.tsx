import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Signin, Home } from './Pages';
import { Header } from './Components';

enum CONSTANTS {
  TOKEN = 'TOKEN',
}

interface IPrivateRoute {
  token: string;
  children: ReactNode | ReactNode[];
  path: string;
  exact?: boolean;
}

function PrivateRoute({ token, children, ...rest }: IPrivateRoute): ReactElement {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App(): ReactElement {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const localToken = localStorage.getItem(CONSTANTS.TOKEN);
    setToken(localToken);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Router>
        <Switch>
          <Route path="/signin" exact>
            <Signin />
          </Route>
          <PrivateRoute token={token} path="/" exact>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

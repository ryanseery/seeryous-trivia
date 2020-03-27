import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Signin, Signup, Home } from './Pages';
import { Header } from './Components';
import { CONSTANTS } from './@types/constants';

interface IPrivateRoute {
  token: string | null;
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
      <Router>
        <Header token={token} />
        <Switch>
          <Route path="/signin" exact>
            <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <PrivateRoute token={token} path="/" exact>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

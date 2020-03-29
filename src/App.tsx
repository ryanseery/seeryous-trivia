import React, { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Signin, Signup, Home, CreateGame } from './Pages';
import { Header } from './Components';
import { AppContext } from './context';
import { firebase } from './lib';

export enum ROUTES {
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  HOME = '/',
  CREATE_GAME = '/createGame',
}

interface IPrivateRoute {
  children: ReactNode | ReactNode[];
  path: string;
  exact?: boolean;
  user: firebase.User;
}

function PrivateRoute({ children, user, ...rest }: IPrivateRoute): ReactElement {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.SIGNIN,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Root(): ReactElement {
  const { user, setUser, clearUser } = useContext(AppContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        clearUser();
      }
    });
  }, []);

  return (
    <>
      <Header user={user} />
      <Switch>
        <Route path={ROUTES.SIGNIN} exact>
          <Signin />
        </Route>
        <Route path={ROUTES.SIGNUP} exact>
          <Signup />
        </Route>
        <PrivateRoute user={user} path={ROUTES.HOME} exact>
          <Home user={user} />
        </PrivateRoute>
        <PrivateRoute user={user} path={ROUTES.CREATE_GAME} exact>
          <CreateGame user={user} />
        </PrivateRoute>
      </Switch>
    </>
  );
}

export default function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Root />
      </Router>
    </ThemeProvider>
  );
}

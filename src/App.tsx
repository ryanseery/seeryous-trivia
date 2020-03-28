import React, { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { Signin, Signup, Home, CreateGame } from './Pages';
import { Header } from './Components';
import { AppContext } from './context';
import { firebase } from './lib';

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
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function Root(): ReactElement {
  const history = useHistory();
  const { user, setUser, clearUser } = useContext(AppContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        clearUser();
      }
    });
  }, [user, setUser, clearUser, history]);

  return (
    <>
      <Header user={user} />
      <Switch>
        <Route path="/signin" exact>
          <Signin />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <PrivateRoute user={user} path="/" exact>
          <Home user={user} />
        </PrivateRoute>
        <PrivateRoute user={user} path="/createGame" exact>
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

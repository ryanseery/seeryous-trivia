import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import { useFirebase } from './firebase';
import { Signin, Signup, Home, CreateGame } from './Pages';
import { Header } from './Components';

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
  authUser: firebase.User;
}

function PrivateRoute({ children, authUser, ...rest }: IPrivateRoute): ReactElement {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authUser ? (
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

export default function App(): ReactElement {
  const { auth } = useFirebase();
  const [authUser, setAuthUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser: firebase.User) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  }, [auth]);

  return (
    <Router>
      <Header authUser={authUser} />
      <Switch>
        <Route path={ROUTES.SIGNIN} exact>
          <Signin />
        </Route>
        <Route path={ROUTES.SIGNUP} exact>
          <Signup />
        </Route>
        <PrivateRoute authUser={authUser} path={ROUTES.HOME} exact>
          <Home authUser={authUser} />
        </PrivateRoute>
        <PrivateRoute authUser={authUser} path={ROUTES.CREATE_GAME} exact>
          <CreateGame authUser={authUser} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

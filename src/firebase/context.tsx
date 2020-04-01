import React, { useContext } from 'react';

const FirebaseContext = React.createContext(null);

export function useFirebase() {
  const {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
    createUser,
    auth,
    user,
    users,
  } = useContext(FirebaseContext);

  return { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut, createUser, auth, user, users };
}

export default FirebaseContext;

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
  } = useContext(FirebaseContext);

  return { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut, createUser, auth, user };
}

export default FirebaseContext;

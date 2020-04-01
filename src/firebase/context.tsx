import React, { useContext } from 'react';

const FirebaseContext = React.createContext(null);

export function useFirebase() {
  const { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut, createUser, auth } = useContext(
    FirebaseContext,
  );

  return { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut, createUser, auth };
}

export default FirebaseContext;

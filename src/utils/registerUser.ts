import { firebase } from '../lib';

export async function registerUser(
  email: string,
  password: string,
): Promise<[null | firebase.auth.UserCredential, null | {}]> {
  return new Promise(async (resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data) => resolve([data, null]))
      .catch((err) => reject([null, err]));
  });
}

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

import app from '../firebaseConfig';

const auth = getAuth(app);

export async function cadastrarUsuario(email, senha) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );
}

export async function fazerLogin(email, senha) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    senha
  );
}

export async function fazerLogout() {
  return await signOut(auth);
}
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

export function mensagemErroFirebase(error) {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Digite um e-mail válido.';

    case 'auth/missing-password':
      return 'Digite sua senha.';

    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.';

    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.';

    case 'auth/invalid-credential':
      return 'E-mail ou senha inválidos.';

    case 'auth/user-not-found':
      return 'Usuário não encontrado.';

    case 'auth/wrong-password':
      return 'Senha incorreta.';

    case 'auth/too-many-requests':
      return 'Muitas tentativas. Tente novamente mais tarde.';

    default:
      return 'Não foi possível realizar a operação.';
  }
}

export { auth };

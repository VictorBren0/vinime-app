import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  AuthError
} from 'firebase/auth';
import { auth } from '@/config/firebase';

export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authService = {
  // Criar nova conta
  async signUp({ email, password, displayName }: SignUpData): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Atualizar o perfil do usuário com o nome
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName,
        });
      }

      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError.code));
    }
  },

  // Fazer login
  async login({ email, password }: LoginData): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError.code));
    }
  },

  // Fazer logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error('Erro ao fazer logout');
    }
  },

  // Obter usuário atual
  getCurrentUser(): User | null {
    return auth.currentUser;
  },
};

// Mensagens de erro em português
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: { [key: string]: string } = {
    'auth/email-already-in-use': 'Este e-mail já está em uso',
    'auth/invalid-email': 'E-mail inválido',
    'auth/operation-not-allowed': 'Operação não permitida',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
    'auth/user-disabled': 'Esta conta foi desabilitada',
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/invalid-credential': 'Credenciais inválidas',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
  };

  return errorMessages[errorCode] || 'Erro ao autenticar. Tente novamente';
}

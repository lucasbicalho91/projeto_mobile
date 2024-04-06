import React, {useState, createContext, ReactNode, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import users from '../users'

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credencials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type SignInProps = {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: '',
    name: '',
    email: '',
    token: ''
  })

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  async function getUser() {
    try {
      const userInfo = await AsyncStorage.getItem('@pizzariamobile');
      if (userInfo) {
        const user = JSON.parse(userInfo);
        setUser(user);
      }
    } catch (error) {
      console.log('Erro ao obter usuário do AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  }
    
    useEffect(() => {
      getUser();
    }, []);

  async function signIn({email, password}: SignInProps) {
    setLoadingAuth(true);

    try {
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        token: ''
      });

      } else {
        throw new Error('E-mail ou senha incorretos');
      }

      setLoadingAuth(false);

    }catch(err){
      console.log('erro ao acessar', err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear()
    .then( () => {
      setUser({
        id: '',
        name: '',
        email: '',
        token: ''
      })
    })
  }

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
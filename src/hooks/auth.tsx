import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
}

interface UserData {
  id: number;
  name: string;
  username: string;
}

interface UserCreate {
  name: string;
  username: string;
  password: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: UserData;
  bd: User[];
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (user: UserCreate) => Promise<void>
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [bd, setBd] = useState<User[]>([])
  const [id, setId] = useState(1)
  const [data, setData] = useState<UserData>({} as UserData);
  const userStorageKey = '@challenge:user';

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await bd.find(data => data.username === username);

      if (response?.password === password && response?.username === username) {
        const userLogged = {
          id: response.id,
          name: response.name,
          username: response.username,
          token: '1020304050'
        };

        setData(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      } else {
        Alert.alert('Credenciais inválidas!')
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const signOut = useCallback(async () => {
    setData({} as User);
    await AsyncStorage.removeItem('@challenge:user');
  }, [setData]);

  async function signUp({ name, username, password }: UserCreate) {
    try {
      bd.push({ id: id, name, username, password })
      setId(id + 1)
    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await AsyncStorage.getItem('@memoirs:user');

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setData(userLogged);
      }
    }

    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        bd: bd,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
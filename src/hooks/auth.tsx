import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  token: string;
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
  user: User;
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
  const [bd, setBd] = useState<User[]>([{
    id: 0,
    name: 'Lucas vinicius alencar alves',
    username: 'lukevinicius',
    password: '102030',
    token: ''
  }])
  const [data, setData] = useState<User>({} as User);
  const userStorageKey = '@challenge:user';

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await bd.find(data => data.username === username);
      const id = await bd.indexOf(username)

      if (response?.password === password && response?.username === username) {
        const userLogged = {
          id: id,
          name: response.name,
          username: response.username,
          token: '1020304050'
        };

        setData(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
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
      bd.push({ name, username, password })
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
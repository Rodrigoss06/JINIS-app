import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState, useEffect } from 'react';
import { Text } from 'react-native';

export enum Role {
  ADMIN = 'Administrador',
  USER = 'Usuario',
  COLAB = 'Colaborador'
}

interface AuthState {
  authenticated: boolean | null;
  userId: string | null;
  role: Role | null;
}

interface AuthProps {
  authState: AuthState;
  onLogin: (token: string) => void;
  onLogout: () => void;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    authenticated: null,
    userId: null,
    role: null,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const decodeToken = (token: string) => {
    try {
      const decoded = JSON.parse(token); 
      return {
        userId: decoded.id,
        role: decoded.tipoUsuario === 'Administrador' ? Role.ADMIN : decoded.tipoUsuario === 'Colaborador' ? Role.COLAB : Role.USER,
      };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token_login');
        if (token) {
          const decoded = decodeToken(token);
          if (decoded) {
            setAuthState({ authenticated: true, userId: decoded.userId, role: decoded.role });
          } else {
            setAuthState({ authenticated: false, userId: null, role: null });
          }
        } else {
          setAuthState({ authenticated: false, userId: null, role: null });
        }
      } catch (error) {
        console.error('Failed to load token:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem('token_login', token);
      const decoded = decodeToken(token);
      if (decoded) {
        setAuthState({ authenticated: true, userId: decoded.userId, role: decoded.role });
      } else {
        throw new Error('Failed to decode token');
      }
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token_login');
      setAuthState({ authenticated: false, userId: null, role: null });
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  const value = {
    authState,
    onLogin: login,
    onLogout: logout,
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

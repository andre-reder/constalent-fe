import {
  createContext,
  useCallback, useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useApiCall from '../hooks/useApiCall';
import useLocalState from '../hooks/useLocalState';
import authService from '../services/authService';
import { AppContextInterface } from '../types/AuthContext';

const initialValue: AppContextInterface = {
  signed: false,
  token: '',
  user: {} as AppContextInterface['user'],
  signOut: () => {},
  login: () => Promise.resolve(),
};

const AuthContext = createContext<AppContextInterface>(initialValue);

interface AuthProviderInterface {
  children: JSX.Element,
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AuthContext);

  return context;
}

export function AuthProvider({ children }: AuthProviderInterface) {
  const [signed, setSigned] = useState(false);
  const [signedLocalStorage, setSignedLocalStorage] = useLocalState('signed', false);
  const [token, setToken] = useState('');
  const [tokenLocalStorage, setTokenLocalStorage] = useLocalState('token', '');
  const [user, setUser] = useState({} as AppContextInterface['user']);
  const [userLocalStorage, setUserLocalStorage] = useLocalState('user', {} as AppContextInterface['user']);
  const navigate = useNavigate();

  const { apiCall } = useApiCall();

  const signOut = useCallback(() => {
    navigate('/');
    setSigned(false);
    setSignedLocalStorage(false);
    setTokenLocalStorage('');
    setToken('');
    toast.error('Sessão Expirada. Realize o login novamente');
  }, [navigate, setSignedLocalStorage, setTokenLocalStorage]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        await apiCall({
          apiToCall: authService.auth,
          reqBody: JSON.stringify({ email, password }),
          actionAfterResponse: (response: { success: boolean, user: { name: string, id: string, role: string }, token: string }) => {
            const { token: receivedToken } = response;

            if (receivedToken) {
              setToken(receivedToken);
              setTokenLocalStorage(receivedToken);
              setSignedLocalStorage(true);
              setSigned(true);
              setUserLocalStorage(response.user);
              setUser(response.user);
              toast.success('Login efetuado. Bem-vindo ao sistema gerencial de seu estabelecimento!');
              navigate('/?active=Home');
              return;
            }

            setSigned(false);
            toast.error('Email/senha inválidos!');
          },
          catchMessage: 'Email/senha inválidos!',
        })
      } catch (error) {
        setSigned(false);
        toast.error('Email/senha inválidos!');
        console.log(error);
      }
    },
    [apiCall, setTokenLocalStorage, setSignedLocalStorage, setUserLocalStorage, navigate],
  );

  const appData = useMemo(() => ({
    signed: signedLocalStorage || signed,
    token: tokenLocalStorage || token,
    user: userLocalStorage || user,
    signOut,
    login,
  }), [login, signOut, signed, signedLocalStorage, token, tokenLocalStorage, user, userLocalStorage]);

  return (
    <>
      <AuthContext.Provider value={appData}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

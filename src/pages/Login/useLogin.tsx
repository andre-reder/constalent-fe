import { ChangeEvent, useCallback, useState } from 'react';
import { useAppContext } from '../../contexts/auth';
import useErrors from '../../hooks/useErrors';
import isEmailValid from '../../utils/isEmailValid';

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, signed } = useAppContext();

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const checkIsLoginValid = useCallback(() => {
    if (!signed) {
      setEmail('');
      setPassword('');
    }
  }, [signed]);

  const isReadyToLogin = ((email && password) && errors.length === 0);

  async function handleLogin() {
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    checkIsLoginValid();
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (!isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido!' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (event.target.value.length < 6) {
      setError({ field: 'password', message: 'Senha deve ter no mínimo 6 caracteres' });
    } else {
      removeError('password');
    }
  }

  return {
    isLoading,
    getErrorMessageByFieldName,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleLogin,
    isReadyToLogin,
  };
}

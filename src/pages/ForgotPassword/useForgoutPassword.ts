import { ChangeEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/authService';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import useApiCall from '../../hooks/useApiCall';

export default function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();
  const { apiCall } = useApiCall();

  const isReadyToResetPassword = (email && errors.length === 0);

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (!isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido!' });
    } else {
      removeError('email');
    }
  }

  const resetPassword = useCallback(async () => {
    await apiCall({
      apiToCall: AuthService.resetPassword,
      reqBody: JSON.stringify({
        email,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (apiResponse) => {
        const successMessage = (
          apiResponse.message
          && `Siga as instruções enviadas ao e-mail ${email} para alterar sua senha!`
        );
        const errorMessage = (
          apiResponse.erro
          && 'Ocorreu um erro ao solicitar a alteração de senha, por favor, tente novamente'
        );
        if (successMessage) {
          toast.success(successMessage);
          navigate('/');
          return;
        }
        toast.error(errorMessage);
      },
      catchMessage: 'Erro. Por favor, tente novamente',
    })
    },
    [apiCall, email, navigate],
  );

  return {
    isLoading,
    getErrorMessageByFieldName,
    email,
    handleEmailChange,
    resetPassword,
    isReadyToResetPassword,
  };
}

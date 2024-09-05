import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApiCall from "../../../../../hooks/useApiCall";
import useErrors from "../../../../../hooks/useErrors";
import companiesService from "../../../../../services/companiesService";
import usersService from "../../../../../services/usersService";
import isEmailValid from "../../../../../utils/isEmailValid";
import { OptionType, UserRoleType, UsersType } from "../../../types";

export default function useUserForm({ isEdit }: { isEdit: boolean}) {
  const [isLoading, setIsLoading] = useState(false);

  const [userBeingEditted, setUserBeingEditted] = useState<UsersType>({} as UsersType);

  const [companyOptions, setCompanyOptions] = useState<OptionType[]>([]);
  const [selectedCompany, setSelectedCompany] = useState({} as OptionType);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRoleType>('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { apiCall } = useApiCall();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getErrorMessageByFieldName, errors, setError, removeError } = useErrors();

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);

    if (!(event.target.value)) {
      setError({ field: 'userName', message: 'Nome é obrigatório!' });
    } else {
      removeError('errors');
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    if (!isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido' });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);

    if (event.target.value.length < 8) {
      setError({ field: 'password', message: 'Senha deve conter ter 8 caracteres!' });
    } else if (event.target.value) {
      removeError('password');
    } if (event.target.value !== passwordConfirmation) {
      setError({ field: 'passwordConfirmation', message: 'Senhas divergentes' });
    } else if (event.target.value === passwordConfirmation) {
      removeError('passwordConfirmation');
    }
  }

  function handlePasswordConfirmationChange(event: ChangeEvent<HTMLInputElement>) {
    setPasswordConfirmation(event.target.value);

    if (event.target.value !== password) {
      setError({ field: 'passwordConfirmation', message: 'Senhas divergentes' });
    } else {
      removeError('passwordConfirmation');
    }
  }

  function handleSelectedCompanyChange(option: OptionType) {
    setSelectedCompany(option);
  }

  const getCompaniesOptions = useCallback(async () => {
    await apiCall({
      apiToCall: companiesService.getCompaniesResumed,
      actionAfterResponse: (response: { success: boolean, companies: { name: string, id: string }[] }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar as opções de empresas.');
          navigate('/users?active=Users');
          return;
        }
        const mappedCompanies = [{ value: '', label: 'Selecione uma Empresa'}].concat(response.companies.map(cp => ({ value: cp.id, label: cp.name })));
        setCompanyOptions(mappedCompanies);
      },
      catchAction: () => {
        toast.error('Não foi possível carregar as opções de empresas.');
          navigate('/givenClasses');
          return;
      }
    })
  }, [apiCall, navigate]);

  const getUser = useCallback(async () => {
    await apiCall({
      apiToCall: usersService.getUser,
      queryParams: { id },
      actionAfterResponse: (response: { success: boolean, user: UsersType }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar o usuário. Por favor, tente novamente.');
          navigate('/users?active=Users');
          return;
        }

        setSelectedCompany({ value: response.user.company?.id || '', label: response.user.company?.name || 'Sem Empresa' });
        setUserName(response.user.name);
        setEmail(response.user.email);
        setRole(response.user.role);
        setUserBeingEditted(response.user);
      }
    })
  }, [apiCall, id, navigate]);

  const loadPage = useCallback(async () => {
    try {
      setIsLoading(true);

      await Promise.all([
        getCompaniesOptions(),
        ...(isEdit ? [getUser()] : []),
      ]);

      setIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }, [getCompaniesOptions, getUser, isEdit]);

  const addUser = useCallback(async () => {
    await apiCall({
      apiToCall: usersService.createUser,
      reqBody: JSON.stringify({
        name: userName,
        email,
        password,
        companyId: selectedCompany.value || undefined,
        role,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível adicionar o usuário. Por favor, tente novamente.');
          return;
        }
        toast.success('Usuário adicionado com sucesso!');
        setSelectedCompany({} as OptionType);
        setUserName('');
        setEmail('');
        setRole('');
        setPassword('');
        setPasswordConfirmation('');
      },
    })
  }, [apiCall, email, password, role, selectedCompany.value, userName]);

  const updateUser = useCallback(async () => {
    await apiCall({
      apiToCall: usersService.updateUser,
      queryParams: { id: userBeingEditted.id },
      reqBody: JSON.stringify({
        name: userName,
        companyId: selectedCompany.value || undefined,
        role,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível editar o usuário. Por favor, tente novamente.');
          return;
        }
        toast.success('Usuário editado com sucesso!');
        navigate('/users?active=Users');
      },
    })
  }, [apiCall, navigate, role, selectedCompany.value, userBeingEditted, userName]);

  const isFormValid = useMemo(() => (
    !!userName && !!email && (!!selectedCompany.value || role === 'admin') && (!isEdit || (!!id && !!userBeingEditted.id)) && errors.length === 0
  ), [email, errors.length, id, isEdit, role, selectedCompany.value, userBeingEditted.id, userName]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return {
    isLoading,
    isFormValid,
    userBeingEditted,
    userName,
    handleNameChange,
    email,
    handleEmailChange,
    selectedCompany,
    handleSelectedCompanyChange,
    role,
    setRole,
    addUser,
    updateUser,
    getErrorMessageByFieldName,
    handlePasswordChange,
    password,
    handlePasswordConfirmationChange,
    passwordConfirmation,
    companyOptions,
  };
}

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApiCall from "../../../../../hooks/useApiCall";
import useErrors from "../../../../../hooks/useErrors";
import companiesService from "../../../../../services/companiesService";
import floatToCurrency from "../../../../../utils/floatToCurrency";
import formatCep from "../../../../../utils/formatCep";
import formatCnpj from "../../../../../utils/formatCnpj";
import formatCurrency from "../../../../../utils/formatCurrency";
import formatPercentage from "../../../../../utils/formatPercentage";
import formatPhone from "../../../../../utils/formatPhone";
import isCnpjValid from "../../../../../utils/isCnpjValid";
import isEmailValid from "../../../../../utils/isEmailValid";
import onlyNumbers from "../../../../../utils/onlyNumbers";
import parseCurrencyStringToFloat from "../../../../../utils/parseCurrencyStringToFloat";
import { CompanyType } from "../../../types";

export default function useCompanyForm({ isEdit }: { isEdit: boolean}) {
  const [isLoading, setIsLoading] = useState(false);

  const [companyBeingEditted, setCompanyBeingEditted] = useState<CompanyType>({} as CompanyType);
  const [cnpj, setCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactRole, setContactRole] = useState('');
  const [cep, setCep] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState<number | ''>('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [isGettingCepInfo, setIsGettingCepInfo] = useState(false);
  const [minComission, setMinComission] = useState('');
  const [maxComission, setMaxComission] = useState('');
  const [comissionPercentage, setComissionPercentage] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { apiCall } = useApiCall();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getErrorMessageByFieldName, errors, setError, removeError } = useErrors();

  function handleCnpjChange(event: ChangeEvent<HTMLInputElement>) {
    setCnpj(formatCnpj(event.target.value));
    if (!event.target.value) {
      setError({ field: 'cnpj', message: 'CNPJ é obrigatório!' });
    } else if (!isCnpjValid(formatCnpj(event.target.value))) {
      setError({ field: 'cnpj', message: 'CNPJ inválido!' });
    } else {
      removeError('cnpj');
    }
  }

  function handleCompanyNameChange(event: ChangeEvent<HTMLInputElement>) {
    setCompanyName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'companyName', message: 'Razão Social é obrigatório!' });
    } else {
      removeError('companyName');
    }
  }

  function handleFantasyNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFantasyName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'fantasyName', message: 'Nome fantasia é obrigatório!' });
    } else {
      removeError('fantasyName');
    }
  }

  function handleContactNameChange(event: ChangeEvent<HTMLInputElement>) {
    setContactName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'contactName', message: 'Nome do contato é obrigatório!' });
    } else {
      removeError('contactName');
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value));
    if (!event.target.value) {
      setError({ field: 'phone', message: 'Celular de contato é obrigatório!' });
    } else {
      removeError('phone');
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    if (!event.target.value) {
      setError({ field: 'email', message: 'E-mail de contato é obrigatório!' });
    } else if (!isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido!' });
    } else {
      removeError('email');
    }
  }

  function handleStreetNumberChange(event: ChangeEvent<HTMLInputElement>) {
    setStreetNumber(onlyNumbers(event.target.value));
    if (!event.target.value) {
      setError({ field: 'streetNumber', message: 'Número é obrigatório!' });
    } else {
      removeError('streetNumber');
    }
  }

  function handleContactRoleChange(event: ChangeEvent<HTMLInputElement>) {
    setContactRole(event.target.value);
    if (!event.target.value) {
      setError({ field: 'contactRole', message: 'Cargo é obrigatório!' });
    } else {
      removeError('contactRole');
    }
  }

  function handleMinComissionChange(event: ChangeEvent<HTMLInputElement>) {
    setMinComission(formatCurrency(event.target.value));
    if (!event.target.value) {
      setError({ field: 'minComission', message: 'Comissão mínima é obrigatória!' });
    } else {
      removeError('minComission');
    }
  }

  function handleMaxComissionChange(event: ChangeEvent<HTMLInputElement>) {
    setMaxComission(formatCurrency(event.target.value));
    if (!event.target.value) {
      setError({ field: 'maxComission', message: 'Comissão máxima é obrigatória!' });
    } else {
      removeError('maxComission');
    }
  }

  function handleComissionPercentageChange(event: ChangeEvent<HTMLInputElement>) {
    setComissionPercentage(String(formatPercentage(event.target.value)));
    if (!event.target.value) {
      setError({ field: 'comissionPercentage', message: 'Porcentagem de comissão é obrigatória!' });
    } else {
      removeError('comissionPercentage');
    }
  }

    function handleLoginEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setLoginEmail(event.target.value);

    if (!isEmailValid(event.target.value)) {
      setError({ field: 'loginEmail', message: 'E-mail inválido' });
    } else {
      removeError('loginEmail');
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

  const getCompany = useCallback(async () => {
    await apiCall({
      apiToCall: companiesService.getCompany,
      queryParams: { id },
      actionAfterResponse: (response: { success: boolean, company: CompanyType }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar a empresa. Por favor, tente novamente.');
          navigate('/companies?active=Companies');
          return;
        }

        const { company } = response;

        setCompanyBeingEditted(company);
        setCnpj(company.cnpj);
        setCompanyName(company.name);
        setFantasyName(company.fantasyName);
        setEmail(company.email);
        setPhone(company.phone);
        setContactName(company.contactName);
        setContactRole(company.contactRole);
        setCep(company.cep);
        setStreetName(company.streetName);
        setStreetNumber(company.streetNumber ?? 0);
        setDistrict(company.district);
        setCity(company.city);
        setUf(company.uf);
        setMinComission(floatToCurrency(company.minComission) ?? '');
        setMaxComission(floatToCurrency(company.maxComission) ?? '');
        setComissionPercentage(String(company.comissionPercentage));
        setLoginEmail(company.userLoginEmail ?? '');
      },
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
    })
  }, [apiCall, id, navigate]);

  const addCompany = useCallback(async () => {
    await apiCall({
      apiToCall: companiesService.createCompany,
      reqBody: JSON.stringify({
        name: companyName,
        fantasyName,
        email,
        phone,
        contactName,
        contactRole,
        cnpj,
        streetName,
        cep,
        district,
        city,
        uf,
        streetNumber,
        minComission: parseCurrencyStringToFloat(minComission),
        maxComission: parseCurrencyStringToFloat(maxComission),
        comissionPercentage: Number(comissionPercentage),
        userLoginEmail: loginEmail,
        userFirstPassword: password,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível adicionar a empresa. Por favor, tente novamente.');
          return;
        }
        toast.success('Empresa adicionada com sucesso!');
        setCnpj('');
        setCompanyName('');
        setFantasyName('');
        setEmail('');
        setPhone('');
        setContactName('');
        setContactRole('');
        setCep('');
        setStreetName('');
        setStreetNumber(0);
        setDistrict('');
        setCity('');
        setUf('');
        setMinComission('');
        setMaxComission('');
        setComissionPercentage('');
        setLoginEmail('');
      },
    })
  }, [apiCall, cep, city, cnpj, comissionPercentage, companyName, contactName, contactRole, district, email, fantasyName, loginEmail, maxComission, minComission, password, phone, streetName, streetNumber, uf]);

  const updateCompany = useCallback(async () => {
    await apiCall({
      apiToCall: companiesService.updateCompany,
      queryParams: { id: companyBeingEditted.id },
      reqBody: JSON.stringify({
        name: companyName,
        fantasyName,
        email,
        phone,
        contactName,
        contactRole,
        cnpj,
        streetName,
        cep,
        district,
        city,
        uf,
        streetNumber,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível editar a empresa. Por favor, tente novamente.');
          return;
        }
        toast.success('Empresa editada com sucesso!');
        navigate('/companies?active=Companies');
      },
    })
  }, [apiCall, cep, city, cnpj, companyBeingEditted.id, companyName, contactName, contactRole, district, email, fantasyName, navigate, phone, streetName, streetNumber, uf]);

  const handleCepChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      setCep(formatCep(event.target.value));
      if (!event.target.value) {
        setError({ field: 'cep', message: 'CEP é obrigatório!' });
      }
      if (formatCep(event.target.value).length === 9) {
        setIsGettingCepInfo(true);
        const response = await fetch(`https://viacep.com.br/ws/${event.target.value}/json/`);
        const cepInfo = await response.json();
        if (cepInfo.erro) {
          setError({ field: 'cep', message: 'CEP inválido!' });
          setStreetName('');
          setDistrict('');
          setCity('');
          setUf('');
          return;
        }
        setStreetName(cepInfo.logradouro);
        setDistrict(cepInfo.bairro);
        setCity(cepInfo.localidade);
        setUf(cepInfo.uf);
      }
      if (formatCep(event.target.value).length !== 9) {
        setError({ field: 'cep', message: 'CEP inválido!' });
        setStreetName('');
        setDistrict('');
        setCity('');
        setUf('');
        return;
      }
      removeError('cep');
    } catch (error) {
      toast.error(`Ocorreu um erro ao buscar o CEP (${error})`);
    } finally {
      setIsGettingCepInfo(false);
    }
  }, [removeError, setError]);

  const isFormValid = useMemo(() => (
    !!cnpj &&
    !!email &&
    !!companyName &&
    !!fantasyName &&
    !!phone &&
    !!contactName &&
    !!contactRole &&
    !!cep &&
    !!streetName &&
    !!district &&
    !!city &&
    !!uf &&
    !!minComission &&
    !!maxComission &&
    !!comissionPercentage &&
    (loginEmail ? !!password : true) &&
    errors.length === 0
  ), [cep, city, cnpj, comissionPercentage, companyName, contactName, contactRole, district, email, errors.length, fantasyName, loginEmail, maxComission, minComission, password, phone, streetName, uf]);

  useEffect(() => {
    if (isEdit) {
      getCompany();
    }
  }, [getCompany, isEdit]);

  return {
    isLoading,
    isFormValid,
    companyBeingEditted,
    addCompany,
    updateCompany,
    getErrorMessageByFieldName,
    cnpj,
    handleCnpjChange,
    companyName,
    handleCompanyNameChange,
    fantasyName,
    handleFantasyNameChange,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    contactName,
    handleContactNameChange,
    contactRole,
    handleContactRoleChange,
    cep,
    handleCepChange,
    streetName,
    streetNumber,
    handleStreetNumberChange,
    district,
    city,
    uf,
    isGettingCepInfo,
    minComission,
    handleMinComissionChange,
    maxComission,
    handleMaxComissionChange,
    comissionPercentage,
    handleComissionPercentageChange,
    loginEmail,
    handleLoginEmailChange,
    password,
    handlePasswordChange,
    passwordConfirmation,
    handlePasswordConfirmationChange,
  };
}

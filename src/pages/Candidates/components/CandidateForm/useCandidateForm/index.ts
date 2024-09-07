import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApiCall from "../../../../../hooks/useApiCall";
import useErrors from "../../../../../hooks/useErrors";
import candidatesService from "../../../../../services/candidatesService";
import formatCep from "../../../../../utils/formatCep";
import formatPhone from "../../../../../utils/formatPhone";
import isEmailValid from "../../../../../utils/isEmailValid";
import onlyNumbers from "../../../../../utils/onlyNumbers";
import { CandidateType } from "../../../types";

export default function useCandidateForm({ isEdit }: { isEdit: boolean}) {
  const [isLoading, setIsLoading] = useState(false);

  const [candidateBeingEditted, setCandidateBeingEditted] = useState<CandidateType>({} as CandidateType);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [cep, setCep] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState<number | string>('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [isGettingCepInfo, setIsGettingCepInfo] = useState(false);

  const { apiCall } = useApiCall();
  const navigate = useNavigate();
  const { id } = useParams();
  const { getErrorMessageByFieldName, errors, setError, removeError } = useErrors();

  function handleCandidateNameChange(event: ChangeEvent<HTMLInputElement>) {
    setCandidateName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'candidateName', message: 'Nome do candidato é obrigatório!' });
    } else {
      removeError('candidateName');
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

  const getCandidate = useCallback(async () => {
    await apiCall({
      apiToCall: candidatesService.getCandidate,
      queryParams: { id },
      actionAfterResponse: (response: { success: boolean, candidate: CandidateType }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar o candidato. Por favor, tente novamente.');
          navigate('/candidates?active=Candidates');
          return;
        }

        const { candidate } = response;

        setCandidateBeingEditted(candidate);
        setEmail(candidate.email);
        setPhone(candidate.phone);
        setCandidateName(candidate.name);
        setCep(candidate.cep ?? '');
        setStreetName(candidate.streetName ?? '');
        setStreetNumber(candidate.streetNumber ?? '');
        setDistrict(candidate.district ?? '');
        setCity(candidate.city ?? '');
        setUf(candidate.uf ?? '');
      },
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
    })
  }, [apiCall, id, navigate]);

  const addCandidate = useCallback(async () => {
    await apiCall({
      apiToCall: candidatesService.createCandidate,
      reqBody: JSON.stringify({
        email,
        phone,
        name: candidateName,
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
          toast.error('Não foi possível adicionar o candidato. Por favor, tente novamente.');
          return;
        }
        toast.success('Candidato Adicionado com sucesso!');
        setEmail('');
        setPhone('');
        setCep('');
        setStreetName('');
        setStreetNumber(0);
        setDistrict('');
        setCity('');
        setUf('');
      },
    })
  }, [apiCall, candidateName, cep, city, district, email, phone, streetName, streetNumber, uf]);

  const updateCandidate = useCallback(async () => {
    await apiCall({
      apiToCall: candidatesService.updateCandidate,
      queryParams: { id: candidateBeingEditted.id },
      reqBody: JSON.stringify({
        name: candidateName,
        email,
        phone,
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
          toast.error('Não foi possível editar o candidato. Por favor, tente novamente.');
          return;
        }
        toast.success('Candidato editado com sucesso!');
        navigate('/candidates?active=Candidates');
      },
    })
  }, [apiCall, candidateBeingEditted.id, candidateName, email, phone, streetName, cep, district, city, uf, streetNumber, navigate]);

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
    !!email &&
    !!phone &&
    !!cep &&
    !!streetName &&
    !!district &&
    !!city &&
    !!uf &&
    errors.length === 0
  ), [cep, city, district, email, errors.length, phone, streetName, uf]);

  useEffect(() => {
    if (isEdit) {
      getCandidate();
    }
  }, [getCandidate, isEdit]);

  return {
    isLoading,
    isFormValid,
    candidateBeingEditted,
    addCandidate,
    updateCandidate,
    getErrorMessageByFieldName,
    cpf,
    handleCpfChange,
    rg,
    handleRgChange,
    birthDate,
    handleBirthDateChange,
    gender,
    handleGenderChange,
    candidateName,
    handleCandidateNameChange,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    maritalStatus,
    handleMaritalStatusChange,
    maritalStatusOptions,
    childrenAmount,
    handleChildrenAmountChange,
    cep,
    handleCepChange,
    streetName,
    streetNumber,
    handleStreetNumberChange,
    district,
    city,
    uf,
    isGettingCepInfo,
    linkedin,
    handleLinkedinChange,
    salaryExpected,
    handleSalaryExpectedChange,
    lastSalary,
    handleLastSalaryChange,
    lastCompany,
    handleLastCompanyChange,
    lastPosition,
    handleLastPositionChange,
    resume,
    psycologicalTest,
    candidatesForm,
    handleResumeUpload,
    handleRemoveResume,
    resumeFileName,
    handlePsycologicalTestUpload,
    handleRemovePsycologicalTest,
    psycologicalTestFileName,
    handleCandidatesFormUpload,
    handleRemoveCandidatesForm,
    candidatesFormFileName,
  };
}

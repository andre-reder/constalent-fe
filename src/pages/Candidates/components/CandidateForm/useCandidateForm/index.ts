import { format } from "date-fns";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useApiCall from "../../../../../hooks/useApiCall";
import useErrors from "../../../../../hooks/useErrors";
import candidatesService from "../../../../../services/candidatesService";
import downloadFile from "../../../../../utils/downloadFile";
import floatToCurrency from "../../../../../utils/floatToCurrency";
import formatCep from "../../../../../utils/formatCep";
import formatCpf from "../../../../../utils/formatCpf";
import formatCurrency from "../../../../../utils/formatCurrency";
import formatPhone from "../../../../../utils/formatPhone";
import formatRG from "../../../../../utils/formatRg";
import isCpfvalid from "../../../../../utils/isCpfValid";
import isEmailValid from "../../../../../utils/isEmailValid";
import isRgValid from "../../../../../utils/isRgValid";
import isUrlValid from "../../../../../utils/isUrlValid";
import onlyNumbers from "../../../../../utils/onlyNumbers";
import parseCurrencyStringToFloat from "../../../../../utils/parseCurrencyStringToFloat";
import { CandidateType, GenderType, OptionType } from "../../../types";

export default function useCandidateForm({ isEdit }: { isEdit: boolean}) {
  const [isLoading, setIsLoading] = useState(false);

  const [candidateBeingEditted, setCandidateBeingEditted] = useState<CandidateType>({} as CandidateType);

  const [candidateName, setCandidateName] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<GenderType>('');
  const [maritalStatus, setMaritalStatus] = useState<OptionType>({} as OptionType);
  const [childrenAmount, setChildrenAmount] = useState<number | string>('');
  const [educationLevel, setEducationLevel] = useState({} as OptionType);
  const [graduationCourse, setGraduationCourse] = useState('');

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const [salaryExpected, setSalaryExpected] = useState<string>('');
  const [lastSalary, setLastSalary] = useState<string>('');
  const [lastCompany, setLastCompany] = useState('');
  const [lastPosition, setLastPosition] = useState('');

  const [resume, setResume] = useState<File | string | undefined>();
  const [psycologicalTest, setPsycologicalTest] = useState<File | string | undefined>();
  const [candidatesForm, setCandidatesForm] = useState<File | string | undefined>();
  const [resumeFileName, setResumeFileName] = useState('');
  const [psycologicalTestFileName, setPsycologicalTestFileName] = useState('');
  const [candidatesFormFileName, setCandidatesFormFileName] = useState('');


  const [cep, setCep] = useState('');
  const [streetName, setStreetName] = useState('');
  const [streetNumber, setStreetNumber] = useState<number | string>('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [isGettingCepInfo, setIsGettingCepInfo] = useState(false);

  const maritalStatusOptions: OptionType[] = useMemo(() => [
    { value: 'single', label: 'Solteiro(a)' },
    { value: 'married', label: 'Casado(a)' },
    { value: 'divorced', label: 'Divorciado(a)' },
    { value: 'widower', label: 'Viúvo(a)' },
  ], []);

  const maritalStatusLiterals: { [key: string]: string } = useMemo(() => (
    {
      single: 'Solteiro(a)',
      married: 'Casado(a)',
      divorced: 'Divorciado(a)',
      widower: 'Viúvo(a)',
    }
  ), []);

  const educationLevelOptions: OptionType[] = useMemo(() => ([
    { value: 'fundamental', label: 'Ensino Fundamental' },
    { value: 'medium', label: 'Ensino Médio' },
    { value: 'technical', label: 'Técnico' },
    { value: 'superior', label: 'Superior' },
    { value: 'postGraduation', label: 'Pós-Graduação' },
    { value: 'master', label: 'Mestrado' },
    { value: 'doctorate', label: 'Doutorado' },
  ]), []);

  const educationLevelLiterals: { [key: string]: string } = useMemo(() => (
    {
      fundamental: 'Ensino Fundamental',
      medium: 'Ensino Médio',
      superior: 'Superior',
      postGraduation: 'Pós-Graduação',
      master: 'Mestrado',
      doctorate: 'Doutorado',
    }
  ), []);

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

  function handleCpfChange(event: ChangeEvent<HTMLInputElement>) {
    setCpf(formatCpf(event.target.value));
    if (!event.target.value) {
      setError({ field: 'cpf', message: 'CPF é obrigatório!' });
    } else if (!isCpfvalid(formatCpf(event.target.value))) {
      setError({ field: 'cpf', message: 'CPF inválido!' });
    } else {
      removeError('cpf');
    }
  }

  function handleRgChange(event: ChangeEvent<HTMLInputElement>) {
    setRg(formatRG(event.target.value));
    if (!event.target.value) {
      setError({ field: 'rg', message: 'RG é obrigatório!' });
    } else if (!isRgValid(formatRG(event.target.value))) {
      setError({ field: 'rg', message: 'RG inválido!' });
    } else {
      removeError('rg');
    }
  }

  function handleBirthDateChange(event: ChangeEvent<HTMLInputElement>) {
    setBirthDate(event.target.value);

    const birthDate = new Date(event.target.value);
    const isBirthDateValid = !isNaN(birthDate.getTime()) && birthDate < new Date();
    if (!event.target.value) {
      setError({ field: 'birthDate', message: 'Data de nascimento é obrigatória!' });
    } else if (!isBirthDateValid) {
      setError({ field: 'birthDate', message: 'Data de nascimento inválida!' });
    } else {
      removeError('birthDate');
    }
  }

  function handleGenderChange(gender: GenderType) {
    setGender(gender);
  }

  function handleMaritalStatusChange(maritalStatus: OptionType) {
    setMaritalStatus(maritalStatus);
  }

  function handleEducationLevelChange(educationLevel: OptionType) {
    setEducationLevel(educationLevel);
  }

  function handleGraduationCourseChange(event: ChangeEvent<HTMLInputElement>) {
    setGraduationCourse(event.target.value);
  }

  function handleChildrenAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setChildrenAmount(onlyNumbers(event.target.value));
  }

  function handleLinkedinChange(event: ChangeEvent<HTMLInputElement>) {
    setLinkedin(event.target.value);

    if (event.target.value && !isUrlValid(event.target.value)) {
      setError({ field: 'linkedin', message: 'LinkedIn inválido!' });
    } else {
      removeError('linkedin');
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

  function handleSalaryExpectedChange(event: ChangeEvent<HTMLInputElement>) {
    setSalaryExpected(formatCurrency(event.target.value));

    if (!event.target.value) {
      setError({ field: 'salaryExpected', message: 'Salário esperado é obrigatório!' });
    } else {
      removeError('salaryExpected');
    }
  }

  function handleLastSalaryChange(event: ChangeEvent<HTMLInputElement>) {
    setLastSalary(formatCurrency(event.target.value));
  }

  function handleLastCompanyChange(event: ChangeEvent<HTMLInputElement>) {
    setLastCompany(event.target.value);
  }

  function handleLastPositionChange(event: ChangeEvent<HTMLInputElement>) {
    setLastPosition(event.target.value);
  }

  function handleStreetNumberChange(event: ChangeEvent<HTMLInputElement>) {
    setStreetNumber(onlyNumbers(event.target.value));
    if (!event.target.value) {
      setError({ field: 'streetNumber', message: 'Número é obrigatório!' });
    } else {
      removeError('streetNumber');
    }
  }

  const handleResumeUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setResume(event.target.files[0]);
      setResumeFileName(event.target.files[0].name);
    }
  }, []);

  const handleRemoveResume = useCallback(() => {
    setResume(undefined);
    setResumeFileName('');
  }, []);

  const handlePsycologicalTestUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPsycologicalTest(event.target.files[0]);
      setPsycologicalTestFileName(event.target.files[0].name);
    }
  }, []);

  const handleRemovePsycologicalTest = useCallback(() => {
    setPsycologicalTest(undefined);
    setPsycologicalTestFileName('');
  }, []);

  const handleCandidatesFormUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCandidatesForm(event.target.files[0]);
      setCandidatesFormFileName(event.target.files[0].name);
    }
  }, []);

  const handleRemoveCandidatesForm = useCallback(() => {
    setCandidatesForm(undefined);
    setCandidatesFormFileName('');
  }, []);

  const downloadResume = useCallback(() => {
    if (resume) {
      downloadFile(resume, resumeFileName ?? `Curriculo - ${candidateName}`);
    }
  }, [candidateName, resume, resumeFileName]);

  const downloadPsycologicalTest = useCallback(() => {
    if (psycologicalTest) {
      downloadFile(psycologicalTest, psycologicalTestFileName ?? `Teste psicológico - ${candidateName}`);
    }
  }, [candidateName, psycologicalTest, psycologicalTestFileName]);

  const downloadCandidatesForm = useCallback(() => {
    if (candidatesForm) {
      downloadFile(candidatesForm, candidatesFormFileName ?? `Ficha do candidato - ${candidateName}`);
    }
  }, [candidateName, candidatesForm, candidatesFormFileName]);

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
        setComplement(candidate.complement ?? '');
        setDistrict(candidate.district ?? '');
        setCity(candidate.city ?? '');
        setUf(candidate.uf ?? '');
        setCpf(candidate.cpf ?? '');
        setRg(candidate.rg ?? '');
        setBirthDate(format(new Date(candidate.birthDate), 'yyyy-MM-dd') ?? '');
        setGender(candidate.gender ?? '');
        setMaritalStatus({ value: candidate.maritalStatus, label: maritalStatusLiterals[candidate.maritalStatus] });
        setChildrenAmount(candidate.childrenAmount ?? '');
        setEmail(candidate.email ?? '');
        setPhone(candidate.phone ?? '');
        setLinkedin(candidate.linkedin ?? '');
        setSalaryExpected(floatToCurrency(candidate.salaryExpected ?? 0) ?? '');
        setLastSalary(floatToCurrency(candidate.lastSalary ?? 0) ?? '');
        setLastCompany(candidate.lastCompany ?? '');
        setLastPosition(candidate.lastPosition ?? '');
        setResume(candidate.resume ?? '');
        setPsycologicalTest(candidate.psycologicalTest ?? '');
        setCandidatesForm(candidate.candidatesForm ?? '');
        setResumeFileName(candidate.resume ?? '');
        setPsycologicalTestFileName(candidate.psycologicalTest ?? '');
        setCandidatesFormFileName(candidate.candidatesForm ?? '');
        setGraduationCourse(candidate.graduationCourse ?? '');
        setEducationLevel({ value: candidate.educationLevel, label: educationLevelLiterals[candidate.educationLevel] });
      },
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
    })
  }, [apiCall, educationLevelLiterals, id, maritalStatusLiterals, navigate]);

  const addCandidate = useCallback(async () => {
    await apiCall({
      apiToCall: candidatesService.createCandidate,
      reqBody: [
        { key: 'name', value: candidateName },
        { key: 'phone', value: phone },
        { key: 'email', value: email },
        { key: 'cep', value: cep },
        { key: 'streetName', value: streetName },
        { key: 'streetNumber', value: streetNumber },
        { key: 'complement', value: complement },
        { key: 'district', value: district },
        { key: 'city', value: city },
        { key: 'uf', value: uf },
        { key: 'cpf', value: cpf },
        { key: 'rg', value: rg },
        { key: 'birthDate', value: new Date(birthDate).toISOString() },
        { key: 'gender', value: gender },
        { key: 'maritalStatus', value: maritalStatus.value },
        { key: 'childrenAmount', value: childrenAmount },
        { key: 'linkedin', value: linkedin },
        { key: 'salaryExpected', value: parseCurrencyStringToFloat(salaryExpected) },
        { key: 'lastSalary', value: parseCurrencyStringToFloat(lastSalary) },
        { key: 'lastCompany', value: lastCompany },
        { key: 'lastPosition', value: lastPosition },
        { key: 'resume', value: resume },
        { key: 'psycologicalTest', value: psycologicalTest },
        { key: 'candidatesForm', value: candidatesForm },
        { key: 'status', value: 'stored' },
        { key: 'educationLevel', value: educationLevel.value },
        { key: 'graduationCourse', value: graduationCourse },
      ],
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível adicionar o candidato. Por favor, tente novamente.');
          return;
        }
        toast.success('Candidato Adicionado com sucesso!');
        setCandidateName('');
        setEmail('');
        setStreetName('');
        setStreetNumber('');
        setDistrict('');
        setCity('');
        setUf('');
        setCpf('');
        setRg('');
        setBirthDate('');
        setGender('');
        setMaritalStatus({} as OptionType);
        setChildrenAmount('');
        setEmail('');
        setPhone('');
        setLinkedin('');
        setSalaryExpected('');
        setLastSalary('');
        setLastCompany('');
        setLastPosition('');
        setResume('');
        setPsycologicalTest('');
        setCandidatesForm('');
        setResumeFileName('');
        setPsycologicalTestFileName('');
        setCandidatesFormFileName('');
        setGraduationCourse('');
        setEducationLevel({} as OptionType);
      },
    })
  }, [apiCall, birthDate, candidateName, candidatesForm, cep, childrenAmount, city, complement, cpf, district, educationLevel.value, email, gender, graduationCourse, lastCompany, lastPosition, lastSalary, linkedin, maritalStatus.value, phone, psycologicalTest, resume, rg, salaryExpected, streetName, streetNumber, uf]);

  const updateCandidate = useCallback(async () => {
    await apiCall({
      apiToCall: candidatesService.updateCandidate,
      queryParams: { id: candidateBeingEditted.id },
      reqBody: [
        { key: 'name', value: candidateName },
        { key: 'phone', value: phone },
        { key: 'email', value: email },
        { key: 'cep', value: cep },
        { key: 'streetName', value: streetName },
        { key: 'streetNumber', value: streetNumber },
        { key: 'complement', value: complement },
        { key: 'district', value: district },
        { key: 'city', value: city },
        { key: 'uf', value: uf },
        { key: 'cpf', value: cpf },
        { key: 'rg', value: rg },
        { key: 'birthDate', value: new Date(birthDate).toISOString() },
        { key: 'gender', value: gender },
        { key: 'maritalStatus', value: maritalStatus.value },
        { key: 'childrenAmount', value: childrenAmount },
        { key: 'linkedin', value: linkedin },
        { key: 'salaryExpected', value: parseCurrencyStringToFloat(salaryExpected) },
        { key: 'lastSalary', value: parseCurrencyStringToFloat(lastSalary) },
        { key: 'lastCompany', value: lastCompany },
        { key: 'lastPosition', value: lastPosition },
        { key: 'resume', value: resume },
        { key: 'psycologicalTest', value: psycologicalTest },
        { key: 'candidatesForm', value: candidatesForm },
        { key: 'educationLevel', value: educationLevel.value },
        { key: 'graduationCourse', value: graduationCourse },
      ],
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
  }, [apiCall, candidateBeingEditted.id, candidateName, phone, email, cep, streetName, streetNumber, complement, district, city, uf, cpf, rg, birthDate, gender, maritalStatus.value, childrenAmount, linkedin, salaryExpected, lastSalary, lastCompany, lastPosition, resume, psycologicalTest, candidatesForm, educationLevel.value, graduationCourse, navigate]);

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

  const handleComplementChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setComplement(event.target.value);
  }, []);

  const isFormValid = useMemo(() => (
    !!candidateName &&
    !!cpf &&
    !!rg &&
    !!gender &&
    !!birthDate &&
    !!maritalStatus.value &&
    !!educationLevel.value &&
    !!email &&
    !!phone &&
    !!resume &&
    errors.length === 0
  ), [birthDate, candidateName, cpf, educationLevel.value, email, errors.length, gender, maritalStatus.value, phone, resume, rg]);

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
    complement,
    handleComplementChange,
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
    downloadResume,
    downloadPsycologicalTest,
    downloadCandidatesForm,
    handleEducationLevelChange,
    educationLevel,
    handleGraduationCourseChange,
    graduationCourse,
    educationLevelOptions,
  };
}

import { format, isPast } from "date-fns";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MultiValue } from "react-select";
import { toast } from "react-toastify";
import { useAppContext } from "../../../../../contexts/auth";
import useApiCall from "../../../../../hooks/useApiCall";
import useErrors from "../../../../../hooks/useErrors";
import companiesService from "../../../../../services/companiesService";
import vacanciesService from "../../../../../services/vacanciesService";
import formatCep from "../../../../../utils/formatCep";
import formatCurrency from "../../../../../utils/formatCurrency";
import formatPhone from "../../../../../utils/formatPhone";
import isEmailValid from "../../../../../utils/isEmailValid";
import onlyNumbers from "../../../../../utils/onlyNumbers";
import parseCurrencyStringToFloat from "../../../../../utils/parseCurrencyStringToFloat";
import { GenderType, OptionType, VacancyType } from "../../../types";

interface IUseVacancyForm {
  isEdit: boolean;
}

export default function useVacancyForm({ isEdit }: IUseVacancyForm) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [locationCep, setLocationCep] = useState('');
  const [operatingModel, setOperatingModel] = useState({} as OptionType);
  const [contractType, setContractType] = useState({} as OptionType);
  const [description, setDescription] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [level, setLevel] = useState({} as OptionType);
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [hasVariableComissions, setHasVariableComissions] = useState(false);
  const [responsibleName, setResponsibleName] = useState('');
  const [responsiblePhone, setResponsiblePhone] = useState('');
  const [responsibleEmail, setResponsibleEmail] = useState('');
  const [reasonForOpening, setReasonForOpening] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [vacanciesAmount, setVacanciesAmount] = useState('');
  const [subordinatesAmount, setSubordinatesAmount] = useState('');
  const [workingSchedule, setWorkingSchedule] = useState('');
  const [needsTravel, setNeedsTravel] = useState(false);
  const [needsExtraHours, setNeedsExtraHours] = useState(false);
  const [minAge, setMinAge] = useState<number | string>('');
  const [maxAge, setMaxAge] = useState<number | string>('');
  const [gender, setGender] = useState<GenderType>('indistinct');
  const [educationLevel, setEducationLevel] = useState({} as OptionType);
  const [benefits, setBenefits] = useState([] as MultiValue<OptionType>);
  const [otherBenefits, setOtherBenefits] = useState('');
  const [minExperience, setMinExperience] = useState<number | string>('');
  const [desirableExperience, setDesirableExperience] = useState('');
  const [necessaryRequirements, setNecessaryRequirements] = useState('');
  const [desirableRequirements, setDesirableRequirements] = useState('');
  const [willApplicantBeTested, setWillApplicantBeTested] = useState(false);
  const [alignmentMeetingDate, setAlignmentMeetingDate] = useState('');
  const [suggestionsOfAlignmentMeetingDates, setSuggestionsOfAlignmentMeetingDates] = useState<string[]>([]);
  const [isReposition, setIsReposition] = useState(false);
  const [status, setStatus] = useState({} as OptionType);
  const [company, setCompany] = useState({} as OptionType);
  const [companyOptions, setCompanyOptions] = useState([] as OptionType[]);
  const [vacancyBeingEditted, setVacancyBeingEditted] = useState({} as VacancyType);

  const statusOptions = useMemo(() => ([
    { value: 'waiting', label: 'Em Espera' },
    { value: 'open', label: 'Aberta' },
    // { value: 'finished', label: 'Finalizada' },
    { value: 'canceled', label: 'Cancelada' },
  ]), []);

  const educationLevelOptions = useMemo(() => ([
    { value: 'fundamental', label: 'Ensino Fundamental' },
    { value: 'medium', label: 'Ensino Médio' },
    { value: 'technical', label: 'Técnico' },
    { value: 'superior', label: 'Superior' },
    { value: 'postGraduation', label: 'Pós-graduação' },
    { value: 'master', label: 'Mestrado' },
    { value: 'doctorate', label: 'Doutorado' },
  ]), []);

  const operatingModelOptions = useMemo(() => ([
    { value: 'remote', label: 'Remoto' },
    { value: 'hybrid', label: 'Híbrido' },
    { value: 'presential', label: 'Presencial' },
  ]), []);

  const contractTypeOptions = useMemo(() => ([
    { value: 'internship', label: 'Estágio' },
    { value: 'youngApprentice', label: 'Jovem Aprendiz' },
    { value: 'clt', label: 'CLT' },
    { value: 'pj', label: 'PJ' },
  ]), []);

  const levelOptions = useMemo(() => ([
    { value: 'youngApprentice', label: 'Jovem Aprendiz' },
    { value: 'internship', label: 'Estágio' },
    { value: 'trainee', label: 'Trainee' },
    { value: 'assistant', label: 'Assistente' },
    { value: 'junior', label: 'Júnior' },
    { value: 'pleno', label: 'Pleno' },
    { value: 'senior', label: 'Sênior' },
    { value: 'coordinator', label: 'Coordenador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'director', label: 'Diretor' },
    { value: 'notApplicable', label: 'Não se aplica' },
  ]), []);

  const benefitsOptions = useMemo(() => ([
    { value: 'marketVoucher', label: 'Vale Alimentação' },
    { value: 'foodVoucher', label: 'Vale Refeição' },
    { value: 'transportVoucher', label: 'Vale Transporte' },
    { value: 'fuelVoucher', label: 'Vale Combustível' },
    { value: 'healthInsurance', label: 'Plano de Saúde' },
    { value: 'dentalInsurance', label: 'Plano Odontológico' },
    { value: 'lifeInsurance', label: 'Seguro de Vida' },
    { value: 'petInsurance', label: 'Plano Pet' },
    { value: 'dayOff', label: 'Day Off Aniversário' },
    { value: 'plr', label: 'PLR' },
    { value: 'gymPass', label: 'Gympass / Totalpass' },
    { value: 'babyCostHelp', label: 'Auxílio bebê após nascimento' },
    { value: 'homeOfficeSupport', label: 'Auxílio Home Office' },
    { value: 'studiesSupport', label: 'Bolsa de estudos' },
    { value: 'pharmacyVoucher', label: 'Cartão Farmácia' },
    { value: 'childCareSupport', label: 'Auxílio Creche' },
  ]), []);

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors();
  const { apiCall } = useApiCall();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (!e.target.value) {
      setError({ field: 'title', message: 'Título da Vaga é Obrigatório!' });
    } else {
      removeError('title');
    }
  }

  function handleDepartmentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDepartment(e.target.value);
    if (!e.target.value) {
      setError({ field: 'department', message: 'Departamento é Obrigatório!' });
    } else {
      removeError('department');
    }
  }

  function handleLevelChange(e: OptionType) {
    setLevel(e);
  }

  function handleLocationCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocationCep(formatCep(e.target.value));
    if (!e.target.value) {
      setError({ field: 'locationCep', message: 'CEP é Obrigatório!' });
    } else {
      removeError('locationCep');
    }
  }

  function handleOperatingModelChange(e: OptionType) {
    setOperatingModel(e);
  }

  function handleContractTypeChange(e: OptionType) {
    setContractType(e);
  }

  function handleIsSecret(e: boolean) {
    setIsSecret(e);
  }

  function handleVacanciesAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVacanciesAmount(e.target.value);

    if (!e.target.value && e.target.value != '0') {
      setError({ field: 'vacanciesAmount', message: 'Quantidade de Vagas é Obrigatório!' });
    } else {
      removeError('vacanciesAmount');
    }
  }

  function handleSubordinatesAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSubordinatesAmount(e.target.value);

    if (!e.target.value && e.target.value != '0') {
      setError({ field: 'subordinatesAmount', message: 'Quantidade de Subordinados é Obrigatório!' });
    } else {
      removeError('subordinatesAmount');
    }
  }

  function handleWorkingScheduleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setWorkingSchedule(e.target.value);

    if (!e.target.value) {
      setError({ field: 'workingSchedule', message: 'Jornada de trabalho é Obrigatória!' });
    } else {
      removeError('workingSchedule');
    }
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);

    if (!e.target.value) {
      setError({ field: 'description', message: 'Descrição da Vaga é Obrigatória!' });
    } else {
      removeError('description');
    }
  }

  function handleAdditionalInfoChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAdditionalInfo(e.target.value);
  }

  function handleReasonForOpeningChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setReasonForOpening(e.target.value);

    if (!e.target.value) {
      setError({ field: 'reasonForOpening', message: 'Motivo da Abertura é Obrigatório!' });
    } else {
      removeError('reasonForOpening');
    }
  }

  function handleMinSalaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMinSalary(formatCurrency(e.target.value));

    if (!e.target.value) {
      setError({ field: 'minSalary', message: 'Salário Mínimo é Obrigatório!' });
    } else {
      removeError('minSalary');
    }
  }

  function handleMaxSalaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxSalary(formatCurrency(e.target.value));

    if (!e.target.value) {
      setError({ field: 'maxSalary', message: 'Salário Máximo é Obrigatório!' });
    } else {
      removeError('maxSalary');
    }
  }

  function handleHasVariableComissions(e: boolean) {
    setHasVariableComissions(e);
  }

  function handleResponsibleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setResponsibleName(e.target.value);

    if (!e.target.value) {
      setError({ field: 'responsibleName', message: 'Nome do Responsável é Obrigatório!' });
    } else {
      removeError('responsibleName');
    }
  }

  function handleResponsiblePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setResponsiblePhone(formatPhone(e.target.value));

    if (!e.target.value) {
      setError({ field: 'responsiblePhone', message: 'Telefone do Responsável é Obrigatório!' });
    } else {
      removeError('responsiblePhone');
    }
  }

  function handleResponsibleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setResponsibleEmail(e.target.value);

    if (!e.target.value) {
      setError({ field: 'responsibleEmail', message: 'E-mail do Responsável é Obrigatório!' });
    } else if (!isEmailValid(e.target.value)) {
      setError({ field: 'responsibleEmail', message: 'E-mail Inválido!' });
    } else {
      removeError('responsibleEmail');
    }
  }

  function handleNeedsTravelChange(e: boolean) {
    setNeedsTravel(e);
  }

  function handleNeedsExtraHoursChange(e: boolean) {
    setNeedsExtraHours(e);
  }

  function handleMinAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMinAge(e.target.value);

    if (!e.target.value) {
      setError({ field: 'minAge', message: 'Idade Mínima é Obrigatória!' });
    } else {
      removeError('minAge');
    }
  }

  function handleMaxAgeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMaxAge(e.target.value);

    if (!e.target.value) {
      setError({ field: 'maxAge', message: 'Idade Máxima é Obrigatória!' });
    } else {
      removeError('maxAge');
    }
  }

  function handleGenderChange(e: GenderType) {
    setGender(e);
  }

  function handleEducationLevelChange(e: OptionType) {
    setEducationLevel(e);
  }

  function handleMinExperienceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMinExperience(onlyNumbers(e.target.value));
  }

  function handleDesirableExperienceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDesirableExperience(e.target.value);
  }

  function handleNecessaryRequirementsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setNecessaryRequirements(e.target.value);

    if (!e.target.value) {
      setError({ field: 'necessaryRequirements', message: 'Requisitos Necessários é Obrigatório!' });
    } else {
      removeError('necessaryRequirements');
    }
  }

  function handleDesirableRequirementsChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDesirableRequirements(e.target.value);
  }

  function handleWillApplicantBeTestedChange(e: boolean) {
    setWillApplicantBeTested(e);
  }

  function handleSuggestionsOfAlignmentMeetingDatesChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const date = new Date(e.target.value);

    if (isPast(date)) {
      toast.error('Data e hora não podem ser no passado!');
      setSuggestionsOfAlignmentMeetingDates((prevState) => {
        const newState = [...prevState];
        newState[index] = '';
        return newState;
      });
      return;
    }

    setSuggestionsOfAlignmentMeetingDates((prevState) => {
      const newState = [...prevState];
      newState[index] = e.target.value;
      return newState;
    });
  }

  function handleAlignmentMeetingDateChange(e: ChangeEvent<HTMLInputElement>) {
    const date = new Date(e.target.value);

    if (isPast(date)) {
      toast.error('Data e hora não podem ser no passado!');
      return;
    }

    setAlignmentMeetingDate(e.target.value);
  }

  function handleIsRepositionChange(e: boolean) {
    setIsReposition(e);
  }

  function handleStatusChange(e: OptionType) {
    setStatus(e);
  }

  function handleCompanyChange(e: OptionType) {
    setCompany(e);
  }

  function handleBenefitsChange(e: MultiValue<OptionType>) {
    setBenefits(e);
  }

  function handleOtherBenefitsChange(e: ChangeEvent<HTMLInputElement>) {
    setOtherBenefits(e.target.value);
  }

  const isFormValid = useMemo(() => (
    errors.length === 0 &&
    title &&
    department &&
    locationCep &&
    operatingModel.value &&
    contractType.value &&
    description &&
    reasonForOpening &&
    (vacanciesAmount || vacanciesAmount == '0') &&
    (subordinatesAmount || subordinatesAmount == '0') &&
    workingSchedule &&
    responsibleName &&
    responsiblePhone &&
    responsibleEmail &&
    (minSalary) &&
    maxSalary &&
    (minAge || minAge == 0) &&
    maxAge &&
    (isCustomer || company.value)
  ), [company.value, contractType.value, department, description, errors.length, isCustomer, locationCep, maxAge, maxSalary, minAge, minSalary, operatingModel.value, reasonForOpening, responsibleEmail, responsibleName, responsiblePhone, subordinatesAmount, title, vacanciesAmount, workingSchedule]);

  const addVacancy = useCallback(async () => {
    await apiCall({
      apiToCall: vacanciesService.createVacancy,
      reqBody: JSON.stringify({
        title,
        locationCep,
        operatingModel: operatingModel.value,
        contractType: contractType.value,
        description,
        additionalInfo,
        level: level.value,
        minSalary: parseCurrencyStringToFloat(minSalary),
        maxSalary: parseCurrencyStringToFloat(maxSalary),
        status: isCustomer ? 'waiting' : status?.value || 'waiting',
        companyId: isCustomer ? user?.companyId : company.value,
        department,
        hasVariableComissions,
        responsibleName,
        responsiblePhone,
        responsibleEmail,
        reasonForOpening,
        isSecret,
        vacanciesAmount: Number(vacanciesAmount),
        subordinatesAmount: Number(subordinatesAmount) || 0,
        workingSchedule,
        needsTravel,
        needsExtraHours,
        minAge: Number(minAge) || 0,
        maxAge: Number(maxAge),
        gender: gender || 'indistinct',
        educationLevel: educationLevel.value,
        benefits: benefits.map((benefit) => benefit.value),
        otherBenefits,
        minExperience: Number(minExperience) || 0,
        desirableExperience: Number(desirableExperience) || 0,
        necessaryRequirements,
        desirableRequirements,
        willApplicantBeTested,
        alignmentMeetingDate: alignmentMeetingDate ? new Date(alignmentMeetingDate) : '',
        suggestionsOfAlignmentMeetingDates: suggestionsOfAlignmentMeetingDates.map((date) => new Date(date)).filter((date) => !!date),
        isReposition,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível adicionar a vaga. Por favor, tente novamente.');
          return;
        }
        toast.success('Vaga Adicionada com sucesso!');
        setTitle('');
        setDepartment('');
        setLocationCep('');
        setOperatingModel({} as OptionType);
        setContractType({} as OptionType);
        setDescription('');
        setAdditionalInfo('');
        setLevel({} as OptionType);
        setMinSalary('');
        setMaxSalary('');
        setHasVariableComissions(false);
        setResponsibleName('');
        setResponsiblePhone('');
        setResponsibleEmail('');
        setReasonForOpening('');
        setIsSecret(false);
        setVacanciesAmount('');
        setSubordinatesAmount('');
        setWorkingSchedule('');
        setNeedsTravel(false);
        setNeedsExtraHours(false);
        setMinAge('');
        setMaxAge('');
        setGender('indistinct');
        setEducationLevel({} as OptionType);
        setBenefits([]);
        setOtherBenefits('');
        setMinExperience('');
        setDesirableExperience('');
        setNecessaryRequirements('');
        setDesirableRequirements('');
        setWillApplicantBeTested(false);
        setAlignmentMeetingDate('');
        setSuggestionsOfAlignmentMeetingDates([]);
        setIsReposition(false);
        setStatus({} as OptionType);
        setCompany({} as OptionType);
        setCompanyOptions([]);
      },
    })
  }, [additionalInfo, alignmentMeetingDate, apiCall, benefits, company.value, contractType.value, department, description, desirableExperience, desirableRequirements, educationLevel.value, gender, hasVariableComissions, isCustomer, isReposition, isSecret, level.value, locationCep, maxAge, maxSalary, minAge, minExperience, minSalary, necessaryRequirements, needsExtraHours, needsTravel, operatingModel.value, otherBenefits, reasonForOpening, responsibleEmail, responsibleName, responsiblePhone, status.value, subordinatesAmount, suggestionsOfAlignmentMeetingDates, title, user?.companyId, vacanciesAmount, willApplicantBeTested, workingSchedule]);

  const updateVacancy = useCallback(async () => {
    await apiCall({
      apiToCall: vacanciesService.updateVacancy,
      queryParams: { id: vacancyBeingEditted.id },
      reqBody: JSON.stringify({
        title,
        locationCep,
        operatingModel: operatingModel.value,
        contractType: contractType.value,
        description,
        additionalInfo,
        level: level.value,
        minSalary: parseCurrencyStringToFloat(minSalary),
        maxSalary: parseCurrencyStringToFloat(maxSalary),
        status: isCustomer ? 'waiting' : status?.value || 'waiting',
        companyId: isCustomer ? user?.companyId : company.value,
        department,
        hasVariableComissions,
        responsibleName,
        responsiblePhone,
        responsibleEmail,
        reasonForOpening,
        isSecret,
        vacanciesAmount: Number(vacanciesAmount),
        subordinatesAmount: Number(subordinatesAmount) || 0,
        workingSchedule,
        needsTravel,
        needsExtraHours,
        minAge: Number(minAge) || 0,
        maxAge: Number(maxAge),
        gender,
        educationLevel: educationLevel.value,
        benefits: benefits.map((benefit) => benefit.value),
        otherBenefits,
        minExperience: Number(minExperience) || 0,
        desirableExperience: Number(desirableExperience) || 0,
        necessaryRequirements,
        desirableRequirements,
        willApplicantBeTested,
        alignmentMeetingDate: alignmentMeetingDate ? new Date(alignmentMeetingDate) : '',
        suggestionsOfAlignmentMeetingDates: suggestionsOfAlignmentMeetingDates.map((date) => new Date(date)),
        isReposition,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível editar a vaga. Por favor, tente novamente.');
          return;
        }
        toast.success('Vaga Editada com sucesso!');
        navigate('/vacancies?active=Vacancies');
      },
    })
  }, [additionalInfo, alignmentMeetingDate, apiCall, benefits, company.value, contractType.value, department, description, desirableExperience, desirableRequirements, educationLevel.value, gender, hasVariableComissions, isCustomer, isReposition, isSecret, level.value, locationCep, maxAge, maxSalary, minAge, minExperience, minSalary, navigate, necessaryRequirements, needsExtraHours, needsTravel, operatingModel.value, otherBenefits, reasonForOpening, responsibleEmail, responsibleName, responsiblePhone, status?.value, subordinatesAmount, suggestionsOfAlignmentMeetingDates, title, user?.companyId, vacanciesAmount, vacancyBeingEditted.id, willApplicantBeTested, workingSchedule]);

  const loadPage = useCallback(async () => {
    let companiesOptions: OptionType[] = [];

    await apiCall({
      apiToCall: companiesService.getCompaniesResumed,
      actionAfterResponse: (response: { success: boolean, companies: { name: string, id: string }[] }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar as opções de empresas.');
          navigate('/interviews?active=Interviews');
          return;
        }
        const mappedCompanies = [{ value: '', label: 'Selecione uma Empresa'}].concat(response.companies.map(cp => ({ value: cp.id, label: cp.name })));
        companiesOptions = mappedCompanies;
        setCompanyOptions(mappedCompanies);
      },
    })

    if (isEdit) {
      await apiCall({
        apiToCall: vacanciesService.getVacancy,
        queryParams: { id },
        actionAfterResponse: (response: { success: boolean, vacancy: VacancyType }) => {
          if (!response.success) {
            toast.error('Não foi possível carregar a vaga. Por favor, tente novamente.');
            navigate('/vacancies?active=Vacancies');
            return;
          }

          const { vacancy } = response;

          setVacancyBeingEditted(vacancy);
          setTitle(vacancy.title);
          setDepartment(vacancy.department);
          setLocationCep(vacancy.locationCep || '');

          const correspondingOperatingModel = operatingModelOptions.find((opt) => opt.value === vacancy.operatingModel);
          setOperatingModel(correspondingOperatingModel || {} as OptionType);

          const correspondingContractType = contractTypeOptions.find((opt) => opt.value === vacancy.contractType);
          setContractType(correspondingContractType || {} as OptionType);

          setDescription(vacancy.description);
          setAdditionalInfo(vacancy.additionalInfo || '');

          const correspondingLevel = levelOptions.find((opt) => opt.value === vacancy.level);
          setLevel(correspondingLevel || {} as OptionType);
          setMinSalary(formatCurrency(vacancy.minSalary));
          setMaxSalary(formatCurrency(vacancy.maxSalary));
          setHasVariableComissions(vacancy.hasVariableComissions);
          setResponsibleName(vacancy.responsibleName);
          setResponsiblePhone(vacancy.responsiblePhone);
          setResponsibleEmail(vacancy.responsibleEmail);
          setReasonForOpening(vacancy.reasonForOpening);
          setIsSecret(vacancy.isSecret);
          setVacanciesAmount(vacancy.vacanciesAmount.toString());
          setSubordinatesAmount(vacancy.subordinatesAmount?.toString() || '');
          setWorkingSchedule(vacancy.workingSchedule);
          setNeedsTravel(vacancy.needsTravel);
          setNeedsExtraHours(vacancy.needsExtraHours);
          setMinAge(vacancy.minAge || '');
          setMaxAge(vacancy.maxAge);
          setGender(vacancy.gender);

          const correspondingEducationLevel = educationLevelOptions.find((opt) => opt.value === vacancy.educationLevel);
          setEducationLevel(correspondingEducationLevel || {} as OptionType);

          const correspondingBenefits = benefitsOptions.filter((opt) => vacancy.benefits.includes(opt.value));
          setBenefits(correspondingBenefits);
          setOtherBenefits(vacancy.otherBenefits || '');
          setMinExperience(vacancy.minExperience || '');
          setDesirableExperience(vacancy.desirableExperience?.toString() || '');
          setNecessaryRequirements(vacancy.necessaryRequirements);
          setDesirableRequirements(vacancy.desirableRequirements || '');
          setWillApplicantBeTested(vacancy.willApplicantBeTested);
          setAlignmentMeetingDate(vacancy.alignmentMeetingDate ? format(new Date(vacancy.alignmentMeetingDate), 'yyyy-MM-dd\'T\'HH:mm') : '');
          setSuggestionsOfAlignmentMeetingDates(vacancy.suggestionsOfAlignmentMeetingDates.map((date) => date ? format(new Date(date), 'yyyy-MM-dd\'T\'HH:mm') : ''));
          setIsReposition(vacancy.isReposition);

          const correspondingStatus = statusOptions.find((opt) => opt.value === vacancy.status);
          setStatus(correspondingStatus || {} as OptionType);

          const correspondingCompany = companiesOptions.find((opt) => opt.value === vacancy.companyId);
          setCompany(correspondingCompany || {} as OptionType);
        },
        onStartLoad: () => setIsLoading(true),
        onEndLoad: () => setIsLoading(false),
      })
    }
  }, [apiCall, benefitsOptions, contractTypeOptions, educationLevelOptions, id, isEdit, levelOptions, navigate, operatingModelOptions, statusOptions]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return {
    isLoading,
    isFormValid,
    vacancyBeingEditted,
    addVacancy,
    updateVacancy,
    getErrorMessageByFieldName,
    title,
    department,
    locationCep,
    operatingModel,
    contractType,
    description,
    additionalInfo,
    level,
    minSalary,
    maxSalary,
    hasVariableComissions,
    responsibleName,
    responsiblePhone,
    responsibleEmail,
    reasonForOpening,
    isSecret,
    vacanciesAmount,
    subordinatesAmount,
    workingSchedule,
    needsTravel,
    needsExtraHours,
    minAge,
    maxAge,
    gender,
    educationLevel,
    benefits,
    otherBenefits,
    minExperience,
    desirableExperience,
    necessaryRequirements,
    desirableRequirements,
    willApplicantBeTested,
    alignmentMeetingDate,
    suggestionsOfAlignmentMeetingDates,
    isReposition,
    status,
    company,
    handleTitleChange,
    handleDepartmentChange,
    levelOptions,
    handleLevelChange,
    handleLocationCepChange,
    operatingModelOptions,
    handleOperatingModelChange,
    contractTypeOptions,
    handleContractTypeChange,
    handleIsSecret,
    handleVacanciesAmountChange,
    handleSubordinatesAmountChange,
    handleWorkingScheduleChange,
    handleDescriptionChange,
    handleAdditionalInfoChange,
    handleReasonForOpeningChange,
    handleMinSalaryChange,
    handleMaxSalaryChange,
    benefitsOptions,
    handleBenefitsChange,
    handleOtherBenefitsChange,
    handleHasVariableComissions,
    handleResponsibleNameChange,
    handleResponsiblePhoneChange,
    handleResponsibleEmailChange,
    handleNeedsTravelChange,
    handleNeedsExtraHoursChange,
    handleMinAgeChange,
    handleMaxAgeChange,
    handleGenderChange,
    educationLevelOptions,
    handleEducationLevelChange,
    handleMinExperienceChange,
    handleDesirableExperienceChange,
    handleNecessaryRequirementsChange,
    handleDesirableRequirementsChange,
    handleWillApplicantBeTestedChange,
    handleSuggestionsOfAlignmentMeetingDatesChange,
    handleAlignmentMeetingDateChange,
    handleIsRepositionChange,
    handleStatusChange,
    handleCompanyChange,
    statusOptions,
    companyOptions,
  }
}

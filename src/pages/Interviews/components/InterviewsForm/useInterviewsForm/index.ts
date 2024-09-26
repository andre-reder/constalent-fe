import { format } from "date-fns";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from "../../../../../contexts/auth";
import useApiCall from "../../../../../hooks/useApiCall";
import applicationsService from "../../../../../services/applicationsService";
import candidatesService from "../../../../../services/candidatesService";
import companiesService from "../../../../../services/companiesService";
import interviewsService from "../../../../../services/interviewsService";
import vacanciesService from "../../../../../services/vacanciesService";
import floatToCurrency from "../../../../../utils/floatToCurrency";
import formatCurrency from "../../../../../utils/formatCurrency";
import parseCurrencyStringToFloat from "../../../../../utils/parseCurrencyStringToFloat";
import { InterviewStatusType, InterviewType, InterviewTypeType, OptionType } from "../../../types";

export default function useInterviewsForm({ isEdit }: { isEdit: boolean }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [interviewBeingEditted, setInterviewBeingEditted] = useState<InterviewType>({} as InterviewType);

  const [company, setCompany] = useState<OptionType>({} as OptionType);
  const [companyOptions, setCompanyOptions] = useState<OptionType[]>([]);
  const [vacancy, setVacancy] = useState<OptionType>({} as OptionType);
  const [vacancyOptions, setVacancyOptions] = useState<OptionType[]>([]);
  const [candidate, setCandidate] = useState<OptionType>({} as OptionType);
  const [candidateOptions, setCandidateOptions] = useState<OptionType[]>([]);
  const [date, setDate] = useState<string>('');
  const [type, setType] = useState<InterviewTypeType>('company');
  const [details, setDetails] = useState<string>('');
  const [aiSummary, setAiSummary] = useState<string>('');
  const [status, setStatus] = useState<InterviewStatusType>('scheduled');
  const [finalSalary, setFinalSalary] = useState<string>('');
  const [hired, setHired] = useState<boolean>(false);

  const { apiCall } = useApiCall();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  const loadPage = useCallback(async () => {
    const getCompanyOptions = async () => await apiCall({
      apiToCall: companiesService.getCompaniesResumed,
      actionAfterResponse: (response: { success: boolean, companies: { name: string, id: string }[] }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar as opções de empresas.');
          navigate('/interviews?active=Interviews');
          return;
        }
        const mappedCompanies = [{ value: '', label: 'Selecione uma Empresa'}].concat(response.companies.map(cp => ({ value: cp.id, label: cp.name })));
        setCompanyOptions(mappedCompanies);
      },
    });

    const getVacancyOptions = async () => await apiCall({
      apiToCall: vacanciesService.getVacanciesResumed,
      actionAfterResponse: (response: { success: boolean, vacancies: { title: string, id: string, companyId: string }[] }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar as opções de vagas.');
          navigate('/interviews?active=Interviews');
          return;
        }
        const mappedVacancies = [{ value: '', label: 'Selecione uma Empresa', companyId: ''}].concat(response.vacancies.map(cp => ({ value: cp.id, label: cp.title, companyId: cp.companyId })));
        setVacancyOptions(mappedVacancies);
      },
    });

    await Promise.all([
      getCompanyOptions(),
      getVacancyOptions(),
    ])

    if (isEdit) {
      await apiCall({
        apiToCall: interviewsService.getInterview,
        queryParams: { id },
        actionAfterResponse: (response: { success: boolean, interview: InterviewType }) => {
          if (!response.success) {
            toast.error('Não foi possível carregar a entrevista. Por favor, tente novamente.');
            navigate('/interviews?active=Interviews');
            return;
          }

          const { interview } = response;

          setInterviewBeingEditted(interview);
          setCompany(interview.company ? { value: interview.company.id, label: interview.company.name } : {} as OptionType);
          setVacancy(interview.vacancy ? { value: interview.vacancy.id, label: interview.vacancy.title } : {} as OptionType);
          setCandidate(interview.candidate ? { value: interview.candidate.id, label: interview.candidate.name } : {} as OptionType);
          setDate(format(new Date(interview.date), 'yyyy-MM-dd\'T\'HH:mm'));
          setType(interview.type);
          setStatus(interview.status);
          setDetails(interview.details || '');
          setAiSummary(interview.aiSummary || '');
        },
        onStartLoad: () => setIsLoading(true),
        onEndLoad: () => setIsLoading(false),
      })
    }
  }, [apiCall, id, isEdit, navigate]);

  const handleCompanyChange = useCallback((opt: OptionType) => {
    setCompany(opt);
  }, []);

  const handleVacancyChange = useCallback(async (opt: OptionType) => {
    setVacancy(opt);

    await apiCall({
      apiToCall: candidatesService.getResumedCandidatesAvailableForVacancy,
      queryParams: { vacancyId: opt.value },
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response: { success: boolean, candidates: { name: string, id: string }[] }) => {
        if (!response.success) {
          toast.error('Não foi possível carregar as opções de candidatos para a vaga selecionada.');
          return;
        }

        if (response.candidates.length === 0) {
          toast.info('Não há candidatos disponíveis para a vaga selecionada.');
          return;
        }

        const mappedCandidates = [{ value: '', label: 'Selecione um Candidato'}].concat(response.candidates.map(cp => ({ value: cp.id, label: cp.name })));
        setCandidateOptions(mappedCandidates);
      }
    });
  }, [apiCall]);

  const handleCandidateChange = useCallback((opt: OptionType) => {
    setCandidate(opt);
  }, []);

  const getApplicationInfo = useCallback(async () => {
    if (!candidate.value || !vacancy.value) return;

    await apiCall({
      apiToCall: applicationsService.getApplicationByVacancyCandidate,
      queryParams: { vacancyId: vacancy.value, candidateId: candidate.value },
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response: { success: boolean, application: { finalSalary: number, status: string } }) => {
        if (!response.application) {
          return;
        }

        if (response.application.finalSalary) {
          setFinalSalary(floatToCurrency(response.application.finalSalary) || '');
        }
      }
    });
  }, [apiCall, candidate.value, vacancy.value]);

  useEffect(() => {
    getApplicationInfo();
  }, [getApplicationInfo]);

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  function handleDetailsChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setDetails(e.target.value);
  }

  function handleAiSummaryChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setAiSummary(e.target.value);
  }

  function handleFinalSalaryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFinalSalary(formatCurrency(e.target.value));
  }

  const vacanciesBySelectedCompany = vacancyOptions.filter(v => company.value ? v.companyId === company.value : false);

  const addInterview = useCallback(async () => {
    await apiCall({
      apiToCall: interviewsService.createInterview,
      reqBody: JSON.stringify({
        vacancyId: vacancy.value,
        candidateId: candidate.value,
        date: new Date(date),
        type: isCustomer ? 'company' : type,
        status,
        details,
        aiSummary,
        finalSalary: finalSalary ? parseCurrencyStringToFloat(finalSalary) : null,
        hired: type === 'company' ? hired : false,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível adicionar a entrevista. Por favor, tente novamente.');
          return;
        }
        toast.success('Entrevista Adicionada com sucesso!');
        setCompany({} as OptionType);
        setVacancy({} as OptionType);
        setCandidate({} as OptionType);
        setDate('');
        setType('company');
        setStatus('scheduled');
        setDetails('');
        setAiSummary('');
        setCandidateOptions([]);
      },
    })
  }, [aiSummary, apiCall, candidate.value, date, details, finalSalary, hired, isCustomer, status, type, vacancy.value]);

  const updateInterview = useCallback(async () => {
    await apiCall({
      apiToCall: interviewsService.updateInterview,
      queryParams: { id },
      reqBody: JSON.stringify({
        vacancyId: vacancy.value,
        candidateId: candidate.value,
        date: new Date(date),
        type: isCustomer ? 'company' : type,
        status,
        details,
        aiSummary,
        finalSalary: finalSalary ? parseCurrencyStringToFloat(finalSalary) : null,
        hired: type === 'company' ? hired : false,
      }),
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      actionAfterResponse: (response) => {
        if (!response.success) {
          toast.error('Não foi possível editar a entrevista. Por favor, tente novamente.');
          return;
        }
        toast.success('Entrevista Editada com sucesso!');
        navigate('/interviews?active=Interviews');
      },
    })
  }, [aiSummary, apiCall, candidate.value, date, details, finalSalary, hired, id, isCustomer, navigate, status, type, vacancy.value]);

  const isFormValid = useMemo(() => (
    company.value && vacancy.value && candidate.value && date && type && status
  ), [company.value, vacancy.value, candidate.value, date, type, status]);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  return {
    company,
    companyOptions,
    handleCompanyChange,
    vacancy,
    vacancyOptions: vacanciesBySelectedCompany,
    handleVacancyChange,
    candidate,
    candidateOptions,
    handleCandidateChange,
    date,
    handleDateChange,
    type,
    setType,
    details,
    handleDetailsChange,
    aiSummary,
    handleAiSummaryChange,
    status,
    setStatus,
    isEdit,
    isLoading,
    interviewBeingEditted,
    isFormValid,
    addInterview,
    updateInterview,
    finalSalary,
    handleFinalSalaryChange,
    setHired,
    hired,
  };
}

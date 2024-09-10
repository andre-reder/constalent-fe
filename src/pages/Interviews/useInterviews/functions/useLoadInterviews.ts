import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import interviewsService from "../../../../services/interviewsService";
import removeDuplicates from "../../../../utils/removeDuplicates";
import splitArray from "../../../../utils/splitArray";
import { GetInterviewsApiResponse, InterviewType, OptionType } from "../../types";

interface IUseLoadInterviews {
  setInterviewsSplitted: Dispatch<SetStateAction<Array<InterviewType[]>>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilteredInterviews: Dispatch<SetStateAction<InterviewType[]>>;
}

export default function useLoadInterviews({
  setInterviewsSplitted,
  setCurrentPage,
  setFilteredInterviews,
}: IUseLoadInterviews) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [interviews, setInterviews] = useState<InterviewType[]>([]);
  const [companyOptions, setCompanyOptions] = useState<OptionType[]>([]);
  const [vacancyOptions, setVacancyOptions] = useState<OptionType[]>([]);

  const { apiCall } = useApiCall();

  const interviewStatusOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'scheduled', label: 'Agendada' },
    { value: 'canceled', label: 'Cancelada' },
    { value: 'approved', label: 'Aprovada' },
    { value: 'rejected', label: 'Reprovada' },
  ]), []);

  const interviewTypeOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'recruiter', label: 'Recrutador' },
    { value: 'company', label: 'Empresa' },
  ]), []);

  const getInterviews = useCallback(async () => {
    await apiCall({
      apiToCall: interviewsService.getInterviews,
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      catchAction: () => setHasError(true),
      catchMessage: 'Houve um erro ao carregar as entrevistas. Por favor, tente novamente',
      actionAfterResponse: (response: GetInterviewsApiResponse) => {
        if (!response.success) {
          setHasError(true);
          toast.error(`Houve um erro ao carregar as entrevistas - ${response.message}`);
          return;
        }

        if (!response.interviews || response.interviews.length === 0) {
          setInterviews([]);
          return;
        }

        setHasError(false);
        setInterviews(response.interviews);

        const splittedArray = splitArray(response.interviews);
        setInterviewsSplitted(splittedArray);
        setCurrentPage(0);
        setFilteredInterviews(splittedArray[0]);

        const allCompanies = response.interviews.map(candidate => ({ value: candidate.company?.id || '', label: candidate.company?.name || '' }));
        const uniqueComanies = removeDuplicates(allCompanies);
        setCompanyOptions([{ value: '', label: 'Todos' }, ...uniqueComanies]);

        const allVacancies = response.interviews.map(candidate => ({ value: candidate.vacancy?.id || '', label: candidate.vacancy?.title || '' }));
        const uniqueVacancies = removeDuplicates(allVacancies);
        setVacancyOptions([{ value: '', label: 'Todos' }, ...uniqueVacancies]);
      },
    })
  }, [apiCall, setCurrentPage, setFilteredInterviews, setInterviewsSplitted]);

  useEffect(() => {
    getInterviews();
  }, [getInterviews]);

  return {
    isLoadLoading: isLoading,
    interviews,
    interviewTypeOptions,
    interviewStatusOptions,
    companyOptions,
    vacancyOptions,
    getInterviews,
    hasError,
  };
}

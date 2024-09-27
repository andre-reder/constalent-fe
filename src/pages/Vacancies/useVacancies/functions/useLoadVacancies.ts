import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import vacanciesService from "../../../../services/vacanciesService";
import removeDuplicates from "../../../../utils/removeDuplicates";
import splitArray from "../../../../utils/splitArray";
import { GetVacanciesApiResponse, OptionType, VacancyType } from "../../types";

interface IUseLoadVacancies {
  setVacanciesSplitted: Dispatch<SetStateAction<Array<VacancyType[]>>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilteredVacancies: Dispatch<SetStateAction<VacancyType[]>>;
}

export default function useLoadVacancies({
  setVacanciesSplitted,
  setCurrentPage,
  setFilteredVacancies,
}: IUseLoadVacancies) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [vacancies, setVacancies] = useState<VacancyType[]>([]);
  const [companyOptions, setCompanyOptions] = useState<OptionType[]>([]);

  const { apiCall } = useApiCall();

  const statusOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'waiting', label: 'Em Espera' },
    { value: 'open', label: 'Aberta' },
    { value: 'finished', label: 'Finalizada' },
    { value: 'canceled', label: 'Cancelada' },
  ]), []);

  const educationLevelOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'fundamental', label: 'Ensino Fundamental' },
    { value: 'medium', label: 'Ensino Médio' },
    { value: 'technical', label: 'Técnico' },
    { value: 'superior', label: 'Superior' },
    { value: 'postGraduation', label: 'Pós-graduação' },
    { value: 'master', label: 'Mestrado' },
    { value: 'doctorate', label: 'Doutorado' },
  ]), []);

  const operatingModelOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'remote', label: 'Remoto' },
    { value: 'hybrid', label: 'Híbrido' },
    { value: 'presential', label: 'Presencial' },
  ]), []);

  const contractTypeOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'internship', label: 'Estágio' },
    { value: 'youngApprentice', label: 'Jovem Aprendiz' },
    { value: 'clt', label: 'CLT' },
    { value: 'pj', label: 'PJ' },
  ]), []);

  const vacancyLevelOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'youngApprentice', label: 'Jovem Aprendiz' },
    { value: 'internship', label: 'Estágio' },
    { value: 'trainee', label: 'Trainee' },
    { value: 'auxiliary', label: 'Auxiliar' },
    { value: 'assistant', label: 'Assistente' },
    { value: 'junior', label: 'Júnior' },
    { value: 'pleno', label: 'Pleno' },
    { value: 'senior', label: 'Sênior' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'coordinator', label: 'Coordenador' },
    { value: 'manager', label: 'Gerente' },
    { value: 'director', label: 'Diretor' },
    { value: 'notApplicable', label: 'Não se aplica' },
  ]), []);

  const getVacancies = useCallback(async () => {
    await apiCall({
      apiToCall: vacanciesService.getVacancies,
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      catchAction: () => setHasError(true),
      catchMessage: 'Houve um erro ao carregar os candidatos. Por favor, tente novamente',
      actionAfterResponse: (response: GetVacanciesApiResponse) => {
        if (!response.success) {
          setHasError(true);
          toast.error(`Houve um erro ao carregar os candidatos - ${response.message}`);
          return;
        }

        if (!response.vacancies || response.vacancies.length === 0) {
          setVacancies([]);
          return;
        }

        setHasError(false);
        setVacancies(response.vacancies);

        const splittedArray = splitArray(response.vacancies);
        setVacanciesSplitted(splittedArray);
        setCurrentPage(0);
        setFilteredVacancies(splittedArray[0]);

        const allCompanies = response.vacancies.map(candidate => ({ value: candidate.company?.id || '', label: candidate.company?.name || '' }));
        const uniqueComanies = removeDuplicates(allCompanies);
        setCompanyOptions([{ value: '', label: 'Todos' }, ...uniqueComanies]);
      },
    })
  }, [apiCall, setCurrentPage, setFilteredVacancies, setVacanciesSplitted]);

  useEffect(() => {
    getVacancies();
  }, [getVacancies]);

  return {
    isLoadLoading: isLoading,
    vacancies,
    educationLevelOptions,
    operatingModelOptions,
    contractTypeOptions,
    vacancyLevelOptions,
    statusOptions,
    companyOptions,
    getVacancies,
    hasError,
  };
}

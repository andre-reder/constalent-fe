import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import applicationsService from "../../../../services/applicationsService";
import removeDuplicates from "../../../../utils/removeDuplicates";
import splitArray from "../../../../utils/splitArray";
import { ApplicationType, GetApplicationsApiResponse, OptionType } from "../../types";

interface IUseLoadApplications {
  setApplicationsSplitted: Dispatch<SetStateAction<Array<ApplicationType[]>>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilteredApplications: Dispatch<SetStateAction<ApplicationType[]>>;
}

export default function useLoadApplications({
  setApplicationsSplitted,
  setCurrentPage,
  setFilteredApplications,
}: IUseLoadApplications) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [companyOptions, setCompanyOptions] = useState<OptionType[]>([]);
  const [allVacancies, setAllVacancies] = useState<OptionType[]>([]);
  const [allCandidates, setAllCandidates] = useState<OptionType[]>([]);

  const { apiCall } = useApiCall();

  const statusOptions = useMemo(() => ([
    { value: '', label: 'Todos' },
    { value: 'waiting', label: 'Aguardando' },
    { value: 'notContinued', label: 'Não Continuado' },
    { value: 'rejectedByRecruiter', label: 'Reprovado Recrutamento' },
    { value: 'approvedByRecruiter', label: 'Aprovado Recrutamento' },
    { value: 'rejectedByCompany', label: 'Reprovado Empresa' },
    { value: 'approvedByCompany', label: 'Aprovado Empresa' },
  ]), []);

  const getApplications = useCallback(async () => {
    await apiCall({
      apiToCall: applicationsService.getApplications,
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      catchAction: () => setHasError(true),
      catchMessage: 'Houve um erro ao carregar as aplicações. Por favor, tente novamente',
      actionAfterResponse: (response: GetApplicationsApiResponse) => {
        if (!response.success) {
          setHasError(true);
          toast.error(`Houve um erro ao carregar as aplicações - ${response.message}`);
          return;
        }

        if (!response.applications || response.applications.length === 0) {
          setApplications([]);
          return;
        }

        setHasError(false);
        setApplications(response.applications);

        const splittedArray = splitArray(response.applications);
        setApplicationsSplitted(splittedArray);
        setCurrentPage(0);
        setFilteredApplications(splittedArray[0]);

        const allCompanies = response.applications.map(candidate => candidate.company);
        const uniqueCompanies = removeDuplicates(allCompanies);
        const mappedCompanies = uniqueCompanies.map(cp => ({ value: cp.id, label: cp.name }));
        setCompanyOptions([{ value: '', label: 'Todas' }, ...mappedCompanies]);

        const allVacancies = response.applications.map(candidate => candidate.vacancy);
        const uniqueVacancies = removeDuplicates(allVacancies);
        const mappedVacancies = uniqueVacancies.map(vacancy => ({ value: vacancy.id, label: vacancy.title }));
        setAllVacancies([{ value: '', label: 'Todas' }, ...mappedVacancies]);

        const allCandidates = response.applications.map(candidate => candidate.candidate);
        const uniqueCandidates = removeDuplicates(allCandidates);
        const mappedCandidates = uniqueCandidates.map(candidate => ({ value: candidate.id, label: candidate.name }));
        setAllCandidates([{ value: '', label: 'Todos' }, ...mappedCandidates]);
      },
    })
  }, [apiCall, setCurrentPage, setFilteredApplications, setApplicationsSplitted]);

  useEffect(() => {
    getApplications();
  }, [getApplications]);

  return {
    isLoading,
    applications,
    companyOptions,
    allVacancies,
    allCandidates,
    statusOptions,
    getApplications,
    hasError,
  };
}

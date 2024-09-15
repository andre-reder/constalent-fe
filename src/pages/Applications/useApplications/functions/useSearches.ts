import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import splitArray from '../../../../utils/splitArray';
import { ApplicationType, OptionType } from '../../types';

interface IUseSearches {
  applications: ApplicationType[];
  setApplicationsSplitted: Dispatch<SetStateAction<Array<ApplicationType[]>>>;
  setFilteredApplications: Dispatch<SetStateAction<ApplicationType[]>>;
  allVacancies: OptionType[];
  allCandidates: OptionType[];
}

export default function useSearches({
  applications,
  setApplicationsSplitted,
  setFilteredApplications,
  allVacancies,
  allCandidates,
}: IUseSearches) {
  const [selectedCompany, setSelectedCompany] = useState<OptionType>({ value: '', label: 'Filtrar por Empresa' });
  const [selectedStatus, setSelectedStatus] = useState<OptionType>({ value: '', label: 'Filtrar por Status' });
  const [selectedVacancy, setSelectedVacancy] = useState<OptionType>({ value: '', label: 'Filtrar por Vaga' });
  const [selectedCandidate, setSelectedCandidate] = useState<OptionType>({ value: '', label: 'Filtrar por Candidato' });
  const [vacancyOptions, setVacancyOptions] = useState<OptionType[]>(allVacancies);
  const [candidateOptions, setCandidateOptions] = useState<OptionType[]>(allCandidates);

  const filterApplications = useCallback(() => {
    const applicationsFiltered = applications.filter((app) => {
      const companyFilter = selectedCompany.value === app.companyId || selectedCompany.value === '';
      const vacancyFilter = selectedVacancy.value === app.vacancyId || selectedVacancy.value === '';
      const candidateFilter = selectedCandidate.value === app.candidateId || selectedCandidate.value === '';
      const statusFilter = app.status === selectedStatus.value || selectedStatus.value === '';

      return companyFilter && vacancyFilter && candidateFilter && statusFilter;
    });

    const applicationsSplittedByFilters = splitArray(applicationsFiltered);
    setApplicationsSplitted(applicationsSplittedByFilters);
    setFilteredApplications(applicationsSplittedByFilters[0]);
  }, [applications, setApplicationsSplitted, setFilteredApplications, selectedCompany.value, selectedVacancy.value, selectedCandidate.value, selectedStatus.value]);

  useEffect(() => {
    filterApplications();
  }, [filterApplications]);

  useEffect(() => {
    setVacancyOptions((allVacancies));
    setCandidateOptions((allCandidates));
  }, [allCandidates, allVacancies]);

  const handleSelectedCompanyChange = useCallback((event: OptionType) => {
    setSelectedCompany(event);
    setSelectedVacancy({ value: '', label: 'Filtrar por Vaga' });
    setSelectedCandidate({ value: '', label: 'Filtrar por Candidato' });

    const applicationsOfSelectedCompany = applications.filter((app) => (app.companyId === event.value || event.value === ''));

    const vacancies = applicationsOfSelectedCompany.map((app) => app.vacancy.id);
    setVacancyOptions([{ value: '', label: 'Filtrar por Vaga' }].concat(allVacancies.filter((vacancy) => vacancies.includes(vacancy.value))));

    const candidates = applicationsOfSelectedCompany.map((app) => app.candidate.id);
    setCandidateOptions([{ value: '', label: 'Filtrar por Candidato' }].concat(allCandidates.filter((candidate) => candidates.includes(candidate.value))));
  }, [allCandidates, allVacancies, applications]);

  const handleSelectedVacancyChange = useCallback((event: OptionType) => {
    setSelectedVacancy(event);
    setSelectedCandidate({ value: '', label: 'Filtrar por Candidato' });

    const applicationsOfSelectedVacancy = applications.filter((app) => (app.vacancyId === event.value || event.value === ''));
    const candidates = applicationsOfSelectedVacancy.map((app) => app.candidate.id);
    setCandidateOptions([{ value: '', label: 'Filtrar por Candidato' }].concat(allCandidates.filter((candidate) => candidates.includes(candidate.value))));
  }, [allCandidates, applications]);

  const handleSelectedCandidateChange = useCallback((event: OptionType) => {
    setSelectedCandidate(event);
  }, []);

  const handleSelectedStatusChange = useCallback((event: OptionType) => {
    setSelectedStatus(event);
  }, []);

  // const vacancyOptions = useMemo(() => {
  //   allVacancies.filter((vacancy) => {
  //     const hasCompanySelected = selectedCompany.value !== '';
  //     if (!hasCompanySelected) return true;

  //     const applicationsOfSelectedCompany = applications.filter((app) => (app.companyId === selectedCompany.value || selectedCompany.value === ''));
  //     const vacanciesIds = applicationsOfSelectedCompany.map((app) => app.vacancyId);
  //     return vacanciesIds.includes(vacancy.value);
  //   })
  // }, [allVacancies, applications, selectedCompany.value]);

  // const candidateOptions = useMemo(() => {
  //   allCandidates.filter((candidate) => {
  //     const hasVacancySelected = selectedVacancy.value !== '';
  //     if (!hasVacancySelected) return true;

  //     const applicationsOfSelectedVacancy = applications.filter((app) => (app.vacancyId === selectedVacancy.value || selectedVacancy.value === ''));
  //     const candidatesIds = applicationsOfSelectedVacancy.map((app) => app.candidateId);
  //     return candidatesIds.includes(candidate.value);
  //   })
  // }, [allCandidates, applications, selectedVacancy.value]);

  return {
    selectedCompany,
    handleSelectedCompanyChange,
    selectedVacancy,
    handleSelectedVacancyChange,
    vacancyOptions,
    selectedCandidate,
    handleSelectedCandidateChange,
    candidateOptions,
    selectedStatus,
    handleSelectedStatusChange,
  };
}

import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import splitArray from '../../../../utils/splitArray';
import { InterviewType, OptionType } from '../../types';

interface IUseSearches {
  interviews: InterviewType[];
  setInterviewsSplitted: Dispatch<SetStateAction<Array<InterviewType[]>>>;
  setFilteredInterviews: Dispatch<SetStateAction<InterviewType[]>>;
}

export default function useSearches({
  interviews,
  setInterviewsSplitted,
  setFilteredInterviews,
}: IUseSearches) {
  const [searchTerm, setSearchTerm] = useState('');
  const [interviewStatus, setInterviewStatus] = useState<OptionType>({ value: '', label: 'Filtrar por status' });
  const [interviewType, setInterviewType] = useState<OptionType>({ value: '', label: 'Filtrar por tipo' });
  const [vacancy, setVacancy] = useState<OptionType>({ value: '', label: 'Filtrar por vaga' });
  const [company, setCompany] = useState<OptionType>({ value: '', label: 'Filtrar por empresa' });

  const filterInterviews = useCallback(() => {
    const interviewsFiltered = interviews.filter((intr) => {
      const searchTermFilter = (
        intr.candidate.name.toLowerCase().includes(String(searchTerm).toLowerCase())
      );

      const interviewStatusFilter = intr.status === interviewStatus.value || interviewStatus.value === '';
      const interviewTypeFilter = interviewType.value === intr.type || interviewType.value === '';
      const vacancyFilter = vacancy.value === intr.vacancy.id || vacancy.value === '';
      const companyFilter = company.value === intr.company.id || company.value === '';

      return searchTermFilter && interviewStatusFilter && interviewTypeFilter && vacancyFilter && companyFilter;
    });

    const interviewsSplittedByFilters = splitArray(interviewsFiltered);
    setInterviewsSplitted(interviewsSplittedByFilters);
    setFilteredInterviews(interviewsSplittedByFilters[0]);
  }, [interviews, setInterviewsSplitted, setFilteredInterviews, searchTerm, interviewStatus.value, interviewType.value, vacancy.value, company.value]);

  useEffect(() => {
    filterInterviews();
  }, [filterInterviews]);

  const handleChangeSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleCompanyChange = useCallback((value: OptionType) => {
    setCompany(value);
    setVacancy({ value: '', label: 'Filtrar por vaga' });
  }, []);

  const handleVacancyChange = useCallback((value: OptionType) => {
    setVacancy(value);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    interviewType,
    setInterviewType,
    interviewStatus,
    setInterviewStatus,
    company,
    handleCompanyChange,
    vacancy,
    handleVacancyChange,
  };
}

import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import splitArray from '../../../../utils/splitArray';
import { OptionType, VacancyType } from '../../types';

interface IUseSearches {
  vacancies: VacancyType[];
  setVacanciesSplitted: Dispatch<SetStateAction<Array<VacancyType[]>>>;
  setFilteredVacancies: Dispatch<SetStateAction<VacancyType[]>>;
}

export default function useSearches({
  vacancies,
  setVacanciesSplitted,
  setFilteredVacancies,
}: IUseSearches) {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<OptionType>({ value: '', label: 'Filtrar por status' });
  const [operatingModel, setOperatingModel] = useState<OptionType>({ value: '', label: 'Filtrar por modelo de atuação' });
  const [contractType, setContractType] = useState<OptionType>({ value: '', label: 'Filtrar por tipo de contrato' });
  const [vacancyLevel, setVacancyLevel] = useState<OptionType>({ value: '', label: 'Filtrar por nível da vaga' });
  const [educationLevel, setEducationLevel] = useState<OptionType>({ value: '', label: 'Filtrar por nível de escolaridade' });
  const [company, setCompany] = useState<OptionType>({ value: '', label: 'Filtrar por empresa' });

  const filterVacancies = useCallback(() => {
    const vacanciesFiltered = vacancies.filter((vacancy) => {
      const searchTermFilter = (
        vacancy.title.toLowerCase().includes(String(searchTerm).toLowerCase())
      );

      const statusFilter = vacancy.status === status.value || status.value === '';
      const operatingModelFilter = operatingModel.value === vacancy.operatingModel || operatingModel.value === '';
      const contractTypeFilter = contractType.value === vacancy.contractType || contractType.value === '';
      const vacancyLevelFilter = vacancyLevel.value === vacancy.level || vacancyLevel.value === '';
      const educationLevelFilter = educationLevel.value === vacancy.educationLevel || educationLevel.value === '';
      const companyFilter = company.value === vacancy.company.id || company.value === '';

      return searchTermFilter && statusFilter && educationLevelFilter && operatingModelFilter && contractTypeFilter && vacancyLevelFilter && companyFilter;
    });

    const vacanciesSplittedByFilters = splitArray(vacanciesFiltered);
    setVacanciesSplitted(vacanciesSplittedByFilters);
    setFilteredVacancies(vacanciesSplittedByFilters[0]);
  }, [vacancies, setVacanciesSplitted, setFilteredVacancies, searchTerm, status.value, operatingModel.value, contractType.value, vacancyLevel.value, educationLevel.value, company.value]);

  useEffect(() => {
    filterVacancies();
  }, [filterVacancies]);

  const handleChangeSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    operatingModel,
    setOperatingModel,
    contractType,
    setContractType,
    vacancyLevel,
    setVacancyLevel,
    educationLevel,
    setEducationLevel,
    status,
    setStatus,
    company,
    setCompany,
  };
}

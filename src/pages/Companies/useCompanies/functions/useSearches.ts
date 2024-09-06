import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import splitArray from '../../../../utils/splitArray';
import { CompanyType } from '../../types';

interface UseSearchesInterface {
  companies: CompanyType[];
  setCompaniesSplitted: Dispatch<SetStateAction<Array<CompanyType[]>>>;
  setFilteredCompanies: Dispatch<SetStateAction<CompanyType[]>>;
}

export default function useSearches({
  companies,
  setCompaniesSplitted,
  setFilteredCompanies,
}: UseSearchesInterface) {
  const [searchTerm, setSearchTerm] = useState('');

  const filterUsers = useCallback(() => {
    const companiesFilterd = companies.filter((company) => {
      const searchTermFilter = (
        company.name.toLowerCase().includes(String(searchTerm).toLowerCase()) ||
        company.cnpj.toLowerCase().includes(String(searchTerm).toLowerCase())
      );

      return searchTermFilter;
    });

    const comapniesSplittedByFilters = splitArray(companiesFilterd);
    setCompaniesSplitted(comapniesSplittedByFilters);
    setFilteredCompanies(comapniesSplittedByFilters[0]);
  }, [companies, setCompaniesSplitted, setFilteredCompanies, searchTerm]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  const handleChangeSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);
  return {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
  };
}

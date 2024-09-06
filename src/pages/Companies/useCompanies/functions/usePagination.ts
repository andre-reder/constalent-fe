import { useMemo, useState } from 'react';
import { CompanyType } from '../../types';

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyType[]>([]);
  const [companiesSplitted, setCompaniesSplitted] = useState<Array<CompanyType[]>>([]);

  const pagesQuantity = useMemo(() => companiesSplitted.length, [companiesSplitted.length]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setFilteredCompanies(companiesSplitted[page]);
  }

  return {
    currentPage,
    setCurrentPage,
    filteredCompanies,
    setFilteredCompanies,
    setCompaniesSplitted,
    pagesQuantity,
    handlePageChange,
  };
}

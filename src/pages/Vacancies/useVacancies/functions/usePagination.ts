import { useMemo, useState } from 'react';
import { VacancyType } from '../../types';

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVacancies, setFilteredVacancies] = useState<VacancyType[]>([]);
  const [vacanciesSplitted, setVacanciesSplitted] = useState<Array<VacancyType[]>>([]);

  const pagesQuantity = useMemo(() => vacanciesSplitted.length, [vacanciesSplitted.length]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setFilteredVacancies(vacanciesSplitted[page]);
  }

  return {
    currentPage,
    setCurrentPage,
    filteredVacancies,
    setFilteredVacancies,
    setVacanciesSplitted,
    pagesQuantity,
    handlePageChange,
  };
}

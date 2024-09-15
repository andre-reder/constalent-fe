import { useMemo, useState } from 'react';
import { ApplicationType } from '../../types';

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationType[]>([]);
  const [applicationsSplitted, setApplicationsSplitted] = useState<Array<ApplicationType[]>>([]);

  const pagesQuantity = useMemo(() => applicationsSplitted.length, [applicationsSplitted.length]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setFilteredApplications(applicationsSplitted[page]);
  }

  return {
    currentPage,
    setCurrentPage,
    filteredApplications,
    setFilteredApplications,
    setApplicationsSplitted,
    pagesQuantity,
    handlePageChange,
  };
}

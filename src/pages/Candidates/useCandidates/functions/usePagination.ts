import { useMemo, useState } from 'react';
import { CandidateType } from '../../types';

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateType[]>([]);
  const [candidatesSplitted, setCandidatesSplitted] = useState<Array<CandidateType[]>>([]);

  const pagesQuantity = useMemo(() => candidatesSplitted.length, [candidatesSplitted.length]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setFilteredCandidates(candidatesSplitted[page]);
  }

  return {
    currentPage,
    setCurrentPage,
    filteredCandidates,
    setFilteredCandidates,
    setCandidatesSplitted,
    pagesQuantity,
    handlePageChange,
  };
}

import { useMemo, useState } from 'react';
import { InterviewType } from '../../types';

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredInterviews, setFilteredInterviews] = useState<InterviewType[]>([]);
  const [interviewsSplitted, setInterviewsSplitted] = useState<Array<InterviewType[]>>([]);

  const pagesQuantity = useMemo(() => interviewsSplitted.length, [interviewsSplitted.length]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setFilteredInterviews(interviewsSplitted[page]);
  }

  return {
    currentPage,
    setCurrentPage,
    filteredInterviews,
    setFilteredInterviews,
    setInterviewsSplitted,
    pagesQuantity,
    handlePageChange,
  };
}

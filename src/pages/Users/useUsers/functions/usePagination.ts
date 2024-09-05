import { useMemo, useState } from 'react';
import { UsersType } from '../../types';

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<UsersType[]>([]);
  const [usersSplitted, setUsersSplitted] = useState<Array<UsersType[]>>([]);

  const pagesQuantity = useMemo(() => usersSplitted.length, [usersSplitted.length]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    setFilteredUsers(usersSplitted[page]);
  }

  return {
    currentPage,
    setCurrentPage,
    filteredUsers,
    setFilteredUsers,
    setUsersSplitted,
    pagesQuantity,
    handlePageChange,
  };
}

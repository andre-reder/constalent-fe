import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import splitArray from '../../../../utils/splitArray';
import { OptionType, UserRoleType, UsersType } from '../../types';

interface UseSearchesInterface {
  users: UsersType[];
  setUsersSplitted: Dispatch<SetStateAction<Array<UsersType[]>>>;
  setFilteredUsers: Dispatch<SetStateAction<UsersType[]>>;
}

export default function useSearches({
  users,
  setUsersSplitted,
  setFilteredUsers,
}: UseSearchesInterface) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState({ value: '', label: 'Filtrar por empresa' });
  const [selectedRole, setSelectedRole] = useState<UserRoleType>('');

  const filterUsers = useCallback(() => {
    const usersFiltered = users.filter((user) => {
      const searchTermFilter = (
        user.name.toLowerCase().includes(String(searchTerm).toLowerCase())
      );

      const companyFilter = user.company?.id === selectedCompany.value || selectedCompany.value === '';
      const roleFilter = selectedRole === user.role || selectedRole === '';

      return searchTermFilter && companyFilter && roleFilter;
    });

    const usersSplittedByFilters = splitArray(usersFiltered);
    setUsersSplitted(usersSplittedByFilters);
    setFilteredUsers(usersSplittedByFilters[0]);
  }, [searchTerm, selectedCompany.value, selectedRole, setFilteredUsers, setUsersSplitted, users]);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  const handleChangeSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleCompanyChange = useCallback((event: OptionType) => {
    setSelectedCompany(event);
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    selectedCompany,
    handleCompanyChange,
    setSelectedRole,
    selectedRole,
  };
}

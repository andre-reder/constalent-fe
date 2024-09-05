import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import usersService from "../../../../services/usersService";
import removeDuplicates from "../../../../utils/removeDuplicates";
import splitArray from "../../../../utils/splitArray";
import { GetUsersApiResponse, OptionType, UsersType } from "../../types";

interface IUseLoadUsers {
  setUsersSplitted: Dispatch<SetStateAction<Array<UsersType[]>>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setFilteredUsers: Dispatch<SetStateAction<UsersType[]>>;
}

export default function useLoadUsers({
  setUsersSplitted,
  setCurrentPage,
  setFilteredUsers,
}: IUseLoadUsers) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [users, setUsers] = useState<UsersType[]>([]);
  const [companiesOptions, setCompaniesOptions] = useState<OptionType[]>([]);

  const { apiCall } = useApiCall();

  const getUsers = useCallback(async () => {
    await apiCall({
      apiToCall: usersService.getUsers,
      onStartLoad: () => setIsLoading(true),
      onEndLoad: () => setIsLoading(false),
      catchAction: () => setHasError(true),
      catchMessage: 'Houve um erro ao carregar os usuários',
      actionAfterResponse: (response: GetUsersApiResponse) => {
        if (!response.success) {
          setHasError(true);
          toast.error(`Houve um erro ao carregar os usuários - ${response.message}`);
          return;
        }

        if (!response.users || response.users.length === 0) {
          setUsers([]);
          return;
        }

        setHasError(false);
        setUsers(response.users);

        const splittedArray = splitArray(response.users);
        setUsersSplitted(splittedArray);
        setCurrentPage(0);
        setFilteredUsers(splittedArray[0]);

        const companys = removeDuplicates(response.users.map((usr) => ({ value: usr.company?.id || '', label: usr.company?.name || 'Sem Empresa' })));
        companys.unshift({ value: '', label: 'Todas' });
        setCompaniesOptions(companys);
      },
    })
  }, [apiCall, setCurrentPage, setFilteredUsers, setUsersSplitted]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    isLoadLoading: isLoading,
    users,
    companiesOptions,
    hasError,
    getUsers,
  };
}

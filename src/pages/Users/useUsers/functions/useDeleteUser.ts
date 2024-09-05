import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useApiCall from '../../../../hooks/useApiCall';
import usersService from '../../../../services/usersService';
import { UsersType } from '../../types';

interface UseDeleteUserInterface {
  loadUsers: () => void;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function useDeleteUser({
  loadUsers,
  setSearchTerm,
}: UseDeleteUserInterface) {
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [userBeingDeleted, setUserBeingDeleted] = useState<UsersType>({} as UsersType);

  const { apiCall } = useApiCall();

  const deleteUser = useCallback(async (id: string) => {
    await apiCall({
      apiToCall: usersService.deleteUser,
      queryParams: { id },
      onStartLoad: () => setIsDeletingUser(true),
      onEndLoad: () => setIsDeletingUser(false),
      actionAfterResponse: (apiResponse) => {
        if (!apiResponse.success) {
          toast.error('Não foi possível remover o usuário. Por favor, tente novamente');
          return;
        }
        toast.success('Usuário removido com sucesso!');
        setDeleteModalShow(false);
        setSearchTerm('');
        loadUsers();
      },
      catchMessage: 'Não foi possível remover o usuário. Por favor, tente novamente'
    })
  }, [apiCall, loadUsers, setSearchTerm]);

  function handleOpenDeleteModal(user: UsersType) {
    setDeleteModalShow(true);
    setUserBeingDeleted(user);
  }

  return {
    isDeletingUser,
    deleteModalShow,
    setDeleteModalShow,
    userBeingDeleted,
    deleteUser,
    handleOpenDeleteModal,
  };
}

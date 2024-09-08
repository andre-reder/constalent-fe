import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useApiCall from '../../../../hooks/useApiCall';
import vacanciesService from '../../../../services/vacanciesService';
import { VacancyType } from '../../types';

interface IUseDeleteVacancy {
  loadVacancies: () => void;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function useDeleteVacancy({
  loadVacancies,
  setSearchTerm,
}: IUseDeleteVacancy) {
  const [isDeletingVacancy, setIsDeletingVacancy] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [vacancyBeingDeleted, setVacancyBeingDeleted] = useState<VacancyType>({} as VacancyType);

  const { apiCall } = useApiCall();

  const deleteVacancy = useCallback(async (id: string) => {
    await apiCall({
      apiToCall: vacanciesService.deleteVacancy,
      queryParams: { id },
      onStartLoad: () => setIsDeletingVacancy(true),
      onEndLoad: () => setIsDeletingVacancy(false),
      actionAfterResponse: (apiResponse) => {
        if (!apiResponse.success) {
          toast.error('Não foi possível remover a vaga. Por favor, tente novamente');
          return;
        }
        toast.success('Vaga removida com sucesso!');
        setDeleteModalShow(false);
        setSearchTerm('');
        loadVacancies();
      },
      catchMessage: 'Não foi possível remover a vaga. Por favor, tente novamente'
    })
  }, [apiCall, loadVacancies, setSearchTerm]);

  function handleOpenDeleteModal(candidate: VacancyType) {
    setDeleteModalShow(true);
    setVacancyBeingDeleted(candidate);
  }

  return {
    isDeletingVacancy,
    deleteModalShow,
    setDeleteModalShow,
    vacancyBeingDeleted,
    deleteVacancy,
    handleOpenDeleteModal,
  };
}

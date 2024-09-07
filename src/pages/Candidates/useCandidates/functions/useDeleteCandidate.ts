import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useApiCall from '../../../../hooks/useApiCall';
import candidatesService from '../../../../services/candidatesService';
import { CandidateType } from '../../types';

interface IUseDeleteCandidate {
  loadCandidates: () => void;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function useDeleteCandidate({
  loadCandidates,
  setSearchTerm,
}: IUseDeleteCandidate) {
  const [isDeletingCandidate, setIsDeletingCandidate] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [candidateBeingDeleted, setCandidateBeingDeleted] = useState<CandidateType>({} as CandidateType);

  const { apiCall } = useApiCall();

  const deleteCandidate = useCallback(async (id: string) => {
    await apiCall({
      apiToCall: candidatesService.deleteCandidate,
      queryParams: { id },
      onStartLoad: () => setIsDeletingCandidate(true),
      onEndLoad: () => setIsDeletingCandidate(false),
      actionAfterResponse: (apiResponse) => {
        if (!apiResponse.success) {
          toast.error('Não foi possível remover o usuário. Por favor, tente novamente');
          return;
        }
        toast.success('Usuário removido com sucesso!');
        setDeleteModalShow(false);
        setSearchTerm('');
        loadCandidates();
      },
      catchMessage: 'Não foi possível remover o usuário. Por favor, tente novamente'
    })
  }, [apiCall, loadCandidates, setSearchTerm]);

  function handleOpenDeleteModal(candidate: CandidateType) {
    setDeleteModalShow(true);
    setCandidateBeingDeleted(candidate);
  }

  return {
    isDeletingCandidate,
    deleteModalShow,
    setDeleteModalShow,
    candidateBeingDeleted,
    deleteCandidate,
    handleOpenDeleteModal,
  };
}

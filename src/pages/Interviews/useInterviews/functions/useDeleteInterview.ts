import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import useApiCall from '../../../../hooks/useApiCall';
import interviewsService from '../../../../services/interviewsService';
import { InterviewType } from '../../types';

interface IUseDeleteInterview {
  loadInterviews: () => void;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function useDeleteInterview({
  loadInterviews,
  setSearchTerm,
}: IUseDeleteInterview) {
  const [isDeletingInterview, setIsDeletingInterview] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [interviewBeingDeleted, setInterviewBeingDeleted] = useState<InterviewType>({} as InterviewType);

  const { apiCall } = useApiCall();

  const deleteInterview = useCallback(async (id: string) => {
    await apiCall({
      apiToCall: interviewsService.deleteInterview,
      queryParams: { id },
      onStartLoad: () => setIsDeletingInterview(true),
      onEndLoad: () => setIsDeletingInterview(false),
      actionAfterResponse: (apiResponse) => {
        if (!apiResponse.success) {
          toast.error('Não foi possível remover a entrevista. Por favor, tente novamente');
          return;
        }
        toast.success('Entrevista removida com sucesso!');
        setDeleteModalShow(false);
        setSearchTerm('');
        loadInterviews();
      },
      catchMessage: 'Não foi possível remover a entrevista. Por favor, tente novamente'
    })
  }, [apiCall, loadInterviews, setSearchTerm]);

  function handleOpenDeleteModal(candidate: InterviewType) {
    setDeleteModalShow(true);
    setInterviewBeingDeleted(candidate);
  }

  return {
    isDeletingInterview,
    deleteModalShow,
    setDeleteModalShow,
    interviewBeingDeleted,
    deleteInterview,
    handleOpenDeleteModal,
  };
}

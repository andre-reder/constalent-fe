import { Dispatch, SetStateAction } from 'react';
import MyModal from '../../../components/Modal';
import { InterviewType } from '../types';

interface IDeleteInterviewModal {
  interviewBeingDeleted: InterviewType;
  setDeleteModalShow: Dispatch<SetStateAction<boolean>>;
  deleteInterview: (companyId: string) => void;
  deleteModalShow: boolean;
}

export default function DeleteInterviewModal({
  interviewBeingDeleted,
  setDeleteModalShow,
  deleteInterview,
  deleteModalShow,
}: IDeleteInterviewModal) {
  return (
    <MyModal
      title={`Excluir entrevista de ${interviewBeingDeleted?.candidate?.name}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Excluir"
      modalBody={(
        <>
          <div>
            Tem certeza que deseja excluir a entrevista de
            {' '}
            <strong>{interviewBeingDeleted?.candidate?.name}</strong>
            {' '}
            Para a vaga de {interviewBeingDeleted?.vacancy?.title} com {interviewBeingDeleted?.type === 'recruiter' ? 'Recrutador' : 'Empresa'}
            ?
          </div>
        </>
)}
      onClose={() => setDeleteModalShow(false)}
      onAction={() => deleteInterview(interviewBeingDeleted?.id)}
      show={deleteModalShow}
      type="deleteAction"
    />
  );
}

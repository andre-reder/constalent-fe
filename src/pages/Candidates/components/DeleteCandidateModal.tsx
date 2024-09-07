import { Dispatch, SetStateAction } from 'react';
import MyModal from '../../../components/Modal';
import { CandidateType } from '../types';

interface IDeleteCandidateModal {
  candidateBeingDeleted: CandidateType;
  setDeleteModalShow: Dispatch<SetStateAction<boolean>>;
  deleteCandidate: (companyId: string) => void;
  deleteModalShow: boolean;
}

export default function DeleteCandidateModal({
  candidateBeingDeleted,
  setDeleteModalShow,
  deleteCandidate,
  deleteModalShow,
}: IDeleteCandidateModal) {
  return (
    <MyModal
      title={`Excluir candidato ${candidateBeingDeleted.name}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Excluir"
      modalBody={(
        <>
          <div>
            Tem certeza que deseja excluir o candidato
            {' '}
            <strong>{candidateBeingDeleted.name}</strong>
            {' '}
            ?
          </div>
          <br />
          <strong>Isso irá remover o candidato da base, todas as suas aplicações, e entrevistas cadastradas.</strong>
          <strong>Atenção, esta ação é irreversível!</strong>
        </>
)}
      onClose={() => setDeleteModalShow(false)}
      onAction={() => deleteCandidate(candidateBeingDeleted.id)}
      show={deleteModalShow}
      type="deleteAction"
    />
  );
}

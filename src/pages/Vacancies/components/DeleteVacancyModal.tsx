import { Dispatch, SetStateAction } from 'react';
import MyModal from '../../../components/Modal';
import { VacancyType } from '../types';

interface IDeleteVacancyModal {
  vacancyBeingDeleted: VacancyType;
  setDeleteModalShow: Dispatch<SetStateAction<boolean>>;
  deleteVacancy: (companyId: string) => void;
  deleteModalShow: boolean;
}

export default function DeleteVacancyModal({
  vacancyBeingDeleted,
  setDeleteModalShow,
  deleteVacancy,
  deleteModalShow,
}: IDeleteVacancyModal) {
  return (
    <MyModal
      title={`Excluir vaga ${vacancyBeingDeleted.title}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Excluir"
      modalBody={(
        <>
          <div>
            Tem certeza que deseja excluir a vaga de
            {' '}
            <strong>{vacancyBeingDeleted.title}</strong>
            {' '}
            ?
          </div>
          <br />
          <strong>Isso irá remover todas as aplicações e entrevistas cadastradas para ela</strong>
          <strong>Atenção, esta ação é irreversível!</strong>
        </>
)}
      onClose={() => setDeleteModalShow(false)}
      onAction={() => deleteVacancy(vacancyBeingDeleted.id)}
      show={deleteModalShow}
      type="deleteAction"
    />
  );
}

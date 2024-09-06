import { Dispatch, SetStateAction } from 'react';
import MyModal from '../../../components/Modal';
import { CompanyType } from '../types';

interface IDeleteCompanyModal {
  companyBeingDeleted: CompanyType;
  setDeleteModalShow: Dispatch<SetStateAction<boolean>>;
  deleteCompany: (companyId: string) => void;
  deleteModalShow: boolean;
}

export default function DeleteCompanyModal({
  companyBeingDeleted,
  setDeleteModalShow,
  deleteCompany,
  deleteModalShow,
}: IDeleteCompanyModal) {
  return (
    <MyModal
      title={`Excluir usuário ${companyBeingDeleted.name}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Excluir"
      modalBody={(
        <>
          <div>
            Tem certeza que deseja excluir a empresa
            {' '}
            <strong>{companyBeingDeleted.name}</strong>
            {' '}
            ?
          </div>
          <br />
          <strong>Isso irá remover a empresa da base, todos seus usuários, vagas, aplicações, e entrevistas cadastradas.</strong>
          <strong>Atenção, esta ação é irreversível!</strong>
        </>
)}
      onClose={() => setDeleteModalShow(false)}
      onAction={() => deleteCompany(companyBeingDeleted.id)}
      show={deleteModalShow}
      type="deleteAction"
    />
  );
}

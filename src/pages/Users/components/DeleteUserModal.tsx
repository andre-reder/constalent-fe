import { Dispatch, SetStateAction } from 'react';
import MyModal from '../../../components/Modal';
import { UsersType } from '../types';

interface DeleteUserModalInterface {
  userBeingDeleted: UsersType;
  setDeleteModalShow: Dispatch<SetStateAction<boolean>>;
  deleteUser: (userId: string) => void;
  deleteModalShow: boolean;
}

export default function DeleteUserModal({
  userBeingDeleted,
  setDeleteModalShow,
  deleteUser,
  deleteModalShow,
}: DeleteUserModalInterface) {
  return (
    <MyModal
      title={`Excluir usuário ${userBeingDeleted.name}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Excluir"
      modalBody={(
        <>
          <div>
            Tem certeza que deseja excluir o usuário
            {' '}
            <strong>{userBeingDeleted.name}</strong>
            {' '}
            ?
          </div>
          {/* <br />
          <strong>Isso irá: Remover o usuário da nossa base, seus agendamentos futuros, liberar (caso esteja usando) o seu id de beneficiário para ser usado novamente, remover o mesmo da Vindi caso esteja realizando algum pagamento.</strong>
          <strong>Atenção, esta ação é irreversível!</strong> */}
        </>
)}
      onClose={() => setDeleteModalShow(false)}
      onAction={() => deleteUser(userBeingDeleted.id)}
      show={deleteModalShow}
      type="deleteAction"
    />
  );
}

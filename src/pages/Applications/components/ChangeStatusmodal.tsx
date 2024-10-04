import { Dispatch, SetStateAction } from 'react';
import FilterRadioButton from '../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../components/FilterRadioButtonsContainer';
import MyModal from '../../../components/Modal';
import { useAppContext } from '../../../contexts/auth';
import { ApplicationStatus, ApplicationType } from '../types';

interface IChangeStatusModal {
  changeStatusModalShow: boolean;
  changeStatus: () => Promise<void>;
  newStatus: ApplicationStatus | '';
  setNewStatus: Dispatch<SetStateAction<ApplicationStatus | ''>>;
  appplicationBeingUpdated: ApplicationType;
  setChangeStatusModalShow: Dispatch<SetStateAction<boolean>>;
}

export default function ChangeStatusModal({
  changeStatusModalShow,
  setChangeStatusModalShow,
  changeStatus,
  newStatus,
  setNewStatus,
  appplicationBeingUpdated,
}: IChangeStatusModal) {
  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  return (
    <MyModal
      title={`Alterar Status da Aplicação de ${appplicationBeingUpdated?.candidate?.name} para ${appplicationBeingUpdated?.vacancy?.title}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Alterar"
      modalBody={(
        <>
          <FilterRadioButtonsContainer>
            {!isCustomer && (
              <FilterRadioButton onClick={() => setNewStatus('waiting')} selected={newStatus === 'waiting'}>
                Aguardando
              </FilterRadioButton>
            )}
            <FilterRadioButton onClick={() => setNewStatus('notContinued')} selected={newStatus === 'notContinued'}>
              Não Continuada
            </FilterRadioButton>
            <FilterRadioButton onClick={() => setNewStatus('standby')} selected={newStatus === 'standby'}>
              Stand-By
            </FilterRadioButton>
            {!isCustomer && (
              <>
                <FilterRadioButton onClick={() => setNewStatus('rejectedByRecruiter')} selected={newStatus === 'rejectedByRecruiter'}>
                  Reprovada Recrutamento
                </FilterRadioButton>
                <FilterRadioButton onClick={() => setNewStatus('approvedByRecruiter')} selected={newStatus === 'approvedByRecruiter'}>
                  Aprovada Recrutamento
                </FilterRadioButton>
              </>
            )}
            <FilterRadioButton onClick={() => setNewStatus('rejectedByCompany')} selected={newStatus === 'rejectedByCompany'}>
              Reprovada Empresa
            </FilterRadioButton>
            <FilterRadioButton onClick={() => setNewStatus('approvedByCompany')} selected={newStatus === 'approvedByCompany'}>
              Aprovada Empresa
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </>
)}
      onClose={() => setChangeStatusModalShow(false)}
      onAction={() => changeStatus()}
      show={changeStatusModalShow}
      type="action"
      size='xl'
    />
  );
}

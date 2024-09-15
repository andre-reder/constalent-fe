import { Dispatch, SetStateAction } from 'react';
import FormGroup from '../../../components/FormGroup';
import Input from '../../../components/Input';
import MyModal from '../../../components/Modal';
import { ApplicationType } from '../types';

interface IChangeSalaryModal {
  applicationBeingUpdated: ApplicationType;
  changeSalaryModalShow: boolean;
  changeSalary: () => Promise<void>;
  handleFinalSalaryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canChangeSalary: boolean;
  finalSalary: string;
  setChangeSalaryModalShow: Dispatch<SetStateAction<boolean>>;
}

export default function ChangeSalaryModal({
  applicationBeingUpdated,
  changeSalaryModalShow,
  changeSalary,
  handleFinalSalaryChange,
  finalSalary,
  setChangeSalaryModalShow,
  canChangeSalary,
}: IChangeSalaryModal) {
  return (
    <MyModal
      title={`Alterar Salário Final Acordado da Aplicação de ${applicationBeingUpdated?.candidate?.name} para ${applicationBeingUpdated?.vacancy?.title}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Alterar"
      modalBody={(
        <>
          <FormGroup>
            <label htmlFor="">Salário Final Acordado</label>
            <Input
              value={finalSalary}
              onChange={handleFinalSalaryChange}
              placeholder='R$ XX.XXX,XX'
            />
          </FormGroup>
        </>
)}
      onClose={() => setChangeSalaryModalShow(false)}
      onAction={() => changeSalary()}
      show={changeSalaryModalShow}
      type="action"
      isActionButtonDisabled={!canChangeSalary}
    />
  );
}

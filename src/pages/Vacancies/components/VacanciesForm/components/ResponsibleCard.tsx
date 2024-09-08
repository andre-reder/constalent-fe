import { ChangeEvent } from 'react';
import { Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface IResponsibleCard {
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
  responsibleName: string;
  handleResponsibleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  responsiblePhone: string;
  handleResponsiblePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  responsibleEmail: string;
  handleResponsibleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ResponsibleCard({
  getErrorMessageByFieldName,
  isEdit,
  responsibleName,
  handleResponsibleNameChange,
  responsiblePhone,
  handleResponsiblePhoneChange,
  responsibleEmail,
  handleResponsibleEmailChange,
}: IResponsibleCard) {
  return (
    <StyledContainer>
      <div className="card-title">
        Responsável pela Vaga
      </div>
        <FormGroup error={getErrorMessageByFieldName('responsibleName')} marginTop={16}>
          <label htmlFor="login">Nome *</label>
          <Input
            placeholder="Nome do responsável / gestor"
            value={responsibleName}
            onChange={handleResponsibleNameChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('responsibleName')}
            disabled={isEdit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('responsiblePhone')} marginTop={16}>
          <label htmlFor="login">Celular *</label>
          <Input
            placeholder="Celular ou telefone do responsável"
            value={responsiblePhone}
            onChange={handleResponsiblePhoneChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('responsiblePhone')}
            disabled={isEdit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('responsibleEmail')} marginTop={16}>
          <label htmlFor="login">E-mail *</label>
          <Input
            placeholder="E-mail do responsável"
            value={responsibleEmail}
            onChange={handleResponsibleEmailChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('responsibleEmail')}
            disabled={isEdit}
          />
        </FormGroup>
    </StyledContainer>
  );
}

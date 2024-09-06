import { ChangeEvent } from 'react';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import PasswordInputFormGroup from '../../../../../components/PasswordInputFormGroup';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface ContactDataCardInterface {
  loginEmail: string;
  handleLoginEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordConfirmation: string;
  handlePasswordConfirmationChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
}

export default function UserLoginCard({
  loginEmail,
  handleLoginEmailChange,
  password,
  handlePasswordChange,
  passwordConfirmation,
  handlePasswordConfirmationChange,
  getErrorMessageByFieldName,
  isEdit,
}: ContactDataCardInterface) {
  return (
    <StyledContainer>
      <div className="card-title">
        Dados de login (opcional)
      </div>

      <FormGroup error={getErrorMessageByFieldName('loginEmail')}>
        <label htmlFor="login">E-mail de login *</label>
        <Input
          placeholder="E-mail de login"
          value={loginEmail}
          onChange={handleLoginEmailChange}
          autoComplete="new-password"
          error={getErrorMessageByFieldName('loginEmail')}
          disabled={isEdit}
        />
      </FormGroup>

      <AsideContainer>
        <PasswordInputFormGroup
          value={password}
          onChange={handlePasswordChange}
          label='Senha inicial'
          disabled={isEdit}
        />
        <PasswordInputFormGroup
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          label='Confirmação de senha'
          disabled={isEdit}
        />
      </AsideContainer>
    </StyledContainer>
  );
}

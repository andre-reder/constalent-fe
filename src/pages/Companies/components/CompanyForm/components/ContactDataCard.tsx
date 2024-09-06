import { ChangeEvent } from 'react';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface ContactDataCardInterface {
  contactName: string;
  handleContactNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  phone: string;
  handlePhoneChange: (event: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  contactRole: string;
  handleContactRoleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactDataCard({
  contactName,
  handleContactNameChange,
  phone,
  handlePhoneChange,
  email,
  handleEmailChange,
  getErrorMessageByFieldName,
  contactRole,
  handleContactRoleChange,
}: ContactDataCardInterface) {
  return (
    <StyledContainer>
      <div className="card-title">
        Dados de contato
      </div>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('contactName')} isAside>
          <label htmlFor="login">Nome *</label>
          <Input
            placeholder="Nome do contato"
            value={contactName}
            onChange={handleContactNameChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('contactName')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('phone')} isAside>
          <label htmlFor="login">Celular / Telefone</label>
          <Input
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('phone')}
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('email')} isAside>
          <label htmlFor="login">E-mail</label>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('email')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('contactRole')} isAside>
          <label htmlFor="login">Cargo</label>
          <Input
            placeholder="Cargo"
            value={contactRole}
            onChange={handleContactRoleChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('contactRole')}
          />
        </FormGroup>

      </AsideContainer>
    </StyledContainer>
  );
}

import { ChangeEvent } from 'react';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface ContactDataCardInterface {
  phone: string;
  handlePhoneChange: (event: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  linkedin: string;
  handleLinkedinChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ContactDataCard({
  phone,
  handlePhoneChange,
  email,
  handleEmailChange,
  getErrorMessageByFieldName,
  linkedin,
  handleLinkedinChange,
}: ContactDataCardInterface) {
  return (
    <StyledContainer>
      <div className="card-title">
        Dados de contato
      </div>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('linkedin')} aside>
          <label htmlFor="login">Linkedin</label>
          <Input
            placeholder="URL do Linkedin"
            value={linkedin}
            onChange={handleLinkedinChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('linkedin')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('phone')} aside>
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
        <FormGroup error={getErrorMessageByFieldName('email')} aside>
          <label htmlFor="login">E-mail</label>
          <Input
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('email')}
          />
        </FormGroup>
      </AsideContainer>
    </StyledContainer>
  );
}

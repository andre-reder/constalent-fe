
import { ChangeEvent } from 'react';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface IGeneralDataCard {
  cnpj: string;
  handleCnpjChange: (e: ChangeEvent<HTMLInputElement>) => void;
  companyName: string;
  handleCompanyNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fantasyName: string;
  handleFantasyNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
}

export default function GeneralDataCard({
  cnpj,
  handleCnpjChange,
  companyName,
  handleCompanyNameChange,
  fantasyName,
  handleFantasyNameChange,
  isEdit,
  getErrorMessageByFieldName,
}: IGeneralDataCard) {
  return (
    <StyledContainer>
      <div className="card-title">
        Dados Gerais
      </div>
      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('cnpj')}>
          <label htmlFor="login">CNPJ *</label>
          <Input
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChange={handleCnpjChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('cnpj')}
            disabled={isEdit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('fantasyName')}>
          <label htmlFor="login">Nome Fantasia</label>
          <Input
            placeholder="Nome Fantasia"
            value={fantasyName}
            onChange={handleFantasyNameChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('fantasyName')}
          />
        </FormGroup>
      </AsideContainer>

      <FormGroup error={getErrorMessageByFieldName('name')} marginTop={16}>
        <label htmlFor="login">Razão Social</label>
        <Input
          placeholder="Razão Social"
          value={companyName}
          onChange={handleCompanyNameChange}
          autoComplete="new-password"
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>
    </StyledContainer>
  );
}

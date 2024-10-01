import { ChangeEvent } from 'react';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface AddressDataCardInterface {
  cep: string;
  handleCepChange: (event: ChangeEvent<HTMLInputElement>) => void;
  streetName: string;
  streetNumber: number | string;
  handleStreetNumberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  district: string;
  city: string;
  uf: string;
  complement: string;
  handleComplementChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isGettingCepInfo: boolean;
}

export default function AddressDataCard({
  cep,
  handleCepChange,
  streetName,
  streetNumber,
  handleStreetNumberChange,
  district,
  city,
  uf,
  complement,
  handleComplementChange,
  getErrorMessageByFieldName,
  isGettingCepInfo,
}: AddressDataCardInterface) {
  return (
    <StyledContainer>
      <div className="card-title">
        Endereço
      </div>
      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('cep')} isLoading={isGettingCepInfo}>
          <label htmlFor="">CEP *</label>
          <Input
            disabled={isGettingCepInfo}
            value={cep}
            onChange={handleCepChange}
            error={getErrorMessageByFieldName('cep')}
            placeholder="Informe o CEP"
            maxLength={9}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('number')}>
          <label htmlFor="">Número</label>
          <Input
            value={streetNumber}
            onChange={handleStreetNumberChange}
            error={getErrorMessageByFieldName('number')}
            placeholder="Informe o número do endereço"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="">Complemento</label>
          <Input
            value={complement}
            onChange={handleComplementChange}
            placeholder="Informe o complemento"
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup isLoading={isGettingCepInfo}>
          <label htmlFor="">Logradouro</label>
          <Input
            disabled
            value={streetName}
            placeholder="Preenchido automaticamente"
          />
        </FormGroup>

        <FormGroup isLoading={isGettingCepInfo}>
          <label htmlFor="">Bairro</label>
          <Input
            disabled
            value={district}
            placeholder="Preenchido automaticamente"
          />
        </FormGroup>

        <FormGroup isLoading={isGettingCepInfo}>
          <label htmlFor="">Cidade</label>
          <Input
            disabled
            value={city}
            placeholder="Preenchido automaticamente"
          />
        </FormGroup>

        <FormGroup isLoading={isGettingCepInfo}>
          <label htmlFor="">UF</label>
          <Input
            disabled
            value={uf}
            placeholder="Preenchido automaticamente"
          />
        </FormGroup>
      </AsideContainer>
    </StyledContainer>
  );
}

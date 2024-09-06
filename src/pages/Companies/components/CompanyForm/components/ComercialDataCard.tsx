import { ChangeEvent } from 'react';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface ContactDataCardInterface {
  minComission: string;
  handleMinComissionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  maxComission: string;
  handleMaxComissionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  comissionPercentage: string;
  handleComissionPercentageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
}

export default function ComercialDataCard({
  minComission,
  handleMinComissionChange,
  maxComission,
  handleMaxComissionChange,
  comissionPercentage,
  handleComissionPercentageChange,
  getErrorMessageByFieldName,
}: ContactDataCardInterface) {
  return (
    <StyledContainer>
      <div className="card-title">
        Condição Comercial
      </div>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('minComission')}>
          <label htmlFor="login">Comissão Mínima *</label>
          <Input
            placeholder="Valor mínimo de comissão"
            value={minComission}
            onChange={handleMinComissionChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('minComission')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('maxComission')}>
          <label htmlFor="login">Comissão Máxima *</label>
          <Input
            placeholder="Valor mínimo de comissão"
            value={maxComission}
            onChange={handleMaxComissionChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('maxComission')}
          />
        </FormGroup>
      </AsideContainer>

        <FormGroup error={getErrorMessageByFieldName('comissionPercentage')} marginTop={16}>
          <label htmlFor="login">Porcentagem de comissão padrão</label>
          <Input
            placeholder="XX%"
            value={comissionPercentage}
            onChange={handleComissionPercentageChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('comissionPercentage')}
          />
        </FormGroup>
    </StyledContainer>
  );
}

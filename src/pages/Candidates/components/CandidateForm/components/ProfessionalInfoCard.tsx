import { ChangeEvent } from 'react';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface IProfessionalInfoCard {
  salaryExpected: string;
  handleSalaryExpectedChange: (event: ChangeEvent<HTMLInputElement>) => void;
  lastSalary: string;
  handleLastSalaryChange: (event: ChangeEvent<HTMLInputElement>) => void;
  lastCompany: string;
  handleLastCompanyChange: (event: ChangeEvent<HTMLInputElement>) => void;
  lastPosition: string;
  handleLastPositionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
}

export default function ProfessionalInfoCard({
  lastCompany,
  handleLastCompanyChange,
  lastPosition,
  handleLastPositionChange,
  lastSalary,
  handleLastSalaryChange,
  salaryExpected,
  handleSalaryExpectedChange,
  getErrorMessageByFieldName,
}: IProfessionalInfoCard) {
  return (
    <StyledContainer>
      <div className="card-title">
        Dados Profissionais
      </div>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('lastCompany')} aside>
          <label htmlFor="login">Última Empresa</label>
          <Input
            placeholder="Última Empresa"
            value={lastCompany}
            onChange={handleLastCompanyChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('lastCompany')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('lastPosition')} aside>
          <label htmlFor="login">Último Cargo</label>
          <Input
            placeholder="Último Cargo"
            value={lastPosition}
            onChange={handleLastPositionChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('lastPosition')}
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('lastSalary')} aside>
          <label htmlFor="login">Último Salário</label>
          <Input
            placeholder="Último Salário"
            value={lastSalary}
            onChange={handleLastSalaryChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('lastSalary')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('salaryExpected')} aside>
          <label htmlFor="login">Expectativa Salarial</label>
          <Input
            placeholder="Expectativa Salarial"
            value={salaryExpected}
            onChange={handleSalaryExpectedChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('salaryExpected')}
          />
        </FormGroup>
      </AsideContainer>
    </StyledContainer>
  );
}

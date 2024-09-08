import { ChangeEvent } from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { CustomStyle } from '../../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../../components/CustomSelectStyleDarkTheme';
import FilterRadioButton from '../../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../../components/FilterRadioButtonsContainer';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import useThemeContext from '../../../../../contexts/theme';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';
import { OptionType } from '../../../types';

interface ISalaryBenefitsCard {
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
  minSalary: string;
  maxSalary: string;
  benefits: MultiValue<OptionType>;
  otherBenefits: string;
  hasVariableComissions: boolean;
  handleMinSalaryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMaxSalaryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  benefitsOptions: MultiValue<OptionType>;
  handleBenefitsChange: (e: MultiValue<OptionType>) => void;
  handleOtherBenefitsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleHasVariableComissions: (e: boolean) => void;
}

export default function SalaryBenefitsCard({
  getErrorMessageByFieldName,
  minSalary,
  maxSalary,
  benefits,
  otherBenefits,
  hasVariableComissions,
  handleMinSalaryChange,
  handleMaxSalaryChange,
  benefitsOptions,
  handleBenefitsChange,
  handleOtherBenefitsChange,
  handleHasVariableComissions,
}: ISalaryBenefitsCard) {
  const { selectedTheme } = useThemeContext();
  const animatedComponents = makeAnimated();

  return (
    <StyledContainer>
      <div className="card-title">
        Salário e Benefícios
      </div>
      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('minSalary')} aside>
          <label htmlFor="login">Salário Mínimo *</label>
          <Input
            placeholder="Menor salário oferecido"
            value={minSalary}
            onChange={handleMinSalaryChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('minSalary')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('maxSalary')} aside>
          <label htmlFor="login">Salário Máximo *</label>
          <Input
            placeholder="Maior salário oferecido"
            value={maxSalary}
            onChange={handleMaxSalaryChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('maxSalary')}
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Benefícios</label>
          <Select
            value={benefits}
            options={benefitsOptions}
            onChange={(opt) => {
              handleBenefitsChange(opt!);
            }}
            isMulti
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
            closeMenuOnSelect={false}
            components={animatedComponents}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('otherBenefits')} aside>
          <label htmlFor="login">Outros Benefícios</label>
          <Input
            placeholder="Digite outros benefícios oferecidos"
            value={otherBenefits}
            onChange={handleOtherBenefitsChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('otherBenefits')}
          />
        </FormGroup>
      </AsideContainer>

        <FormGroup marginTop={16}>
          <label htmlFor="login">Possui comissionamento variável?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton onClick={() => handleHasVariableComissions(true)} selected={hasVariableComissions}>
              Sim
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleHasVariableComissions(false)} selected={!hasVariableComissions}>
              Não
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
    </StyledContainer>
  );
}

import { ChangeEvent } from 'react';
import Select from 'react-select';
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

interface IRecruiterFillCard {
  alignmentMeetingDate: string;
  handleAlignmentMeetingDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isReposition: boolean;
  handleIsRepositionChange: (value: boolean) => void;
  status: OptionType;
  handleStatusChange: (value: OptionType) => void;
  statusOptions: OptionType[];
  company: OptionType;
  handleCompanyChange: (value: OptionType) => void;
  companyOptions: OptionType[];
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
}

export default function RecruiterFillCard({
  getErrorMessageByFieldName,
  isEdit,
  alignmentMeetingDate,
  handleAlignmentMeetingDateChange,
  isReposition,
  handleIsRepositionChange,
  status,
  statusOptions,
  handleStatusChange,
  company,
  companyOptions,
  handleCompanyChange,
}: IRecruiterFillCard ) {
  const { selectedTheme } = useThemeContext();

  return (
    <StyledContainer>
      <div className="card-title">
        Dados Complementares
      </div>
      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('alignmentMeetingDate')} aside>
          <label htmlFor="login">Data da reunião de alinhamento *</label>
          <Input
            placeholder="Tempo de experiência mínimo"
            type='datetime-local'
            value={alignmentMeetingDate || ''}
            onChange={handleAlignmentMeetingDateChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('alignmentMeetingDate')}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">É reposição (garantia)?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton onClick={() => handleIsRepositionChange(false)} selected={!isReposition}>
              Não
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleIsRepositionChange(true)} selected={isReposition}>
              Sim
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Status da Vaga</label>
          <Select
            value={{ value: status?.value, label: status?.label }}
            options={statusOptions}
            onChange={(opt) => {
              handleStatusChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Empresa</label>
          <Select
            value={{ value: company?.value, label: company?.label }}
            options={companyOptions}
            onChange={(opt) => {
              handleCompanyChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
            isDisabled={isEdit}
          />
        </FormGroup>
      </AsideContainer>
    </StyledContainer>
  );
}

import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import { CustomStyle } from '../../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../../components/CustomSelectStyleDarkTheme';
import FilterRadioButton from '../../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../../components/FilterRadioButtonsContainer';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { useAppContext } from '../../../../../contexts/auth';
import useThemeContext from '../../../../../contexts/theme';
import { InterviewTypeType, OptionType } from '../../../types';

interface IGeneralDataCard {
  company: OptionType;
  companyOptions: OptionType[];
  handleCompanyChange: (opt: OptionType) => void;
  vacancy: OptionType;
  vacancyOptions: OptionType[];
  handleVacancyChange: (opt: OptionType) => void;
  candidate: OptionType;
  candidateOptions: OptionType[];
  handleCandidateChange: (opt: OptionType) => void;
  date: string;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: InterviewTypeType;
  setType: Dispatch<SetStateAction<InterviewTypeType>>;
  isEdit: boolean;
}

export default function GeneralDataCard({
  company,
  companyOptions,
  handleCompanyChange,
  vacancy,
  vacancyOptions,
  handleVacancyChange,
  candidate,
  candidateOptions,
  handleCandidateChange,
  date,
  handleDateChange,
  type,
  setType,
  isEdit,
}: IGeneralDataCard) {
  const { selectedTheme } = useThemeContext();
  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  return (
    <StyledContainer>
      <div className="card-title">
        Dados Gerais
      </div>
      <AsideContainer>
        {!isCustomer && (
          <FormGroup aside>
            <label htmlFor="login">Empresa *</label>
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
        )}

        <FormGroup aside>
          <label htmlFor="login">Vaga *</label>
          <Select
            placeholder="Selecione a vaga para a qual a entrevista está sendo realizada"
            value={{ value: vacancy?.value, label: vacancy?.label }}
            options={vacancyOptions}
            onChange={(opt) => {
              handleVacancyChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
            isDisabled={isEdit}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Candidato</label>
          <Select
            value={{ value: candidate?.value, label: candidate?.label }}
            options={candidateOptions}
            onChange={(opt) => {
              handleCandidateChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
            isDisabled={isEdit}
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Data e hora da entrevista</label>
          <Input
            placeholder="Data e hora da entrevista"
            value={date}
            onChange={handleDateChange}
            autoComplete="new-password"
            type='datetime-local'
          />
        </FormGroup>

        {!isCustomer && (
          <FormGroup aside>
            <label htmlFor="login">Tipo</label>
            <FilterRadioButtonsContainer>
              <FilterRadioButton disabled={isEdit} onClick={() => setType('recruiter')} selected={type === 'recruiter'}>
                Com Recrutador
              </FilterRadioButton>
              <FilterRadioButton disabled={isEdit} onClick={() => setType('company')} selected={type === 'company'}>
                Com Empresa
              </FilterRadioButton>
            </FilterRadioButtonsContainer>
          </FormGroup>
        )}
      </AsideContainer>
    </StyledContainer>
  );
}

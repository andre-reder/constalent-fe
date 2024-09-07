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
import { GenderType, OptionType } from '../../../types';

interface IGeneralDataCard {
  cpf: string;
  handleCpfChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rg: string;
  handleRgChange: (e: ChangeEvent<HTMLInputElement>) => void;
  candidateName: string;
  handleCandidateNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  birthDate: string;
  handleBirthDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  gender: GenderType;
  handleGenderChange: (e: GenderType) => void;
  maritalStatus: OptionType;
  handleMaritalStatusChange: (e: OptionType) => void;
  childrenAmount: number | string;
  handleChildrenAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maritalStatusOptions: OptionType[];
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
}

export default function GeneralDataCard({
  getErrorMessageByFieldName,
  cpf,
  handleCpfChange,
  rg,
  handleRgChange,
  candidateName,
  handleCandidateNameChange,
  birthDate,
  handleBirthDateChange,
  gender,
  handleGenderChange,
  maritalStatus,
  handleMaritalStatusChange,
  maritalStatusOptions,
  childrenAmount,
  handleChildrenAmountChange,
  isEdit,
}: IGeneralDataCard) {
  const { selectedTheme } = useThemeContext();

  return (
    <StyledContainer>
      <div className="card-title">
        Dados Gerais
      </div>
      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('candidateName')} aside>
          <label htmlFor="login">Nome *</label>
          <Input
            placeholder="Nome do Candidato"
            value={candidateName}
            onChange={handleCandidateNameChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('candidateName')}
            disabled={isEdit}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Gênero</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton selected={gender === 'male'} onClick={() => handleGenderChange('male')}>
              Masculino
            </FilterRadioButton>
            <FilterRadioButton selected={gender === 'male'} onClick={() => handleGenderChange('female')}>
              Feminino
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
      </AsideContainer>


      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('cpf')}>
          <label htmlFor="login">CPF *</label>
          <Input
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('cpf')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('rg')}>
          <label htmlFor="login">RG *</label>
          <Input
            placeholder="00.000.000-0"
            value={rg}
            onChange={handleRgChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('rg')}
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('birthDate')} aside>
          <label htmlFor="login">Data de nascimento *</label>
          <Input
            value={birthDate}
            onChange={handleBirthDateChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('birthDate')}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Estado Civil</label>
          <Select
            value={{ value: maritalStatus?.value, label: maritalStatus?.label }}
            options={maritalStatusOptions}
            onChange={(opt) => {
              handleMaritalStatusChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
          />
        </FormGroup>
      </AsideContainer>

      <FormGroup error={getErrorMessageByFieldName('childrenAmount')} marginTop={16}>
        <label htmlFor="login">Quantidade de Filhos</label>
        <Input
          placeholder='Se não houver, preencha 0'
          value={childrenAmount}
          onChange={handleChildrenAmountChange}
          autoComplete="new-password"
          error={getErrorMessageByFieldName('childrenAmount')}
        />
      </FormGroup>
    </StyledContainer>
  );
}

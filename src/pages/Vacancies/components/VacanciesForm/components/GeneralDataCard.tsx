import { ChangeEvent } from 'react';
import Select from 'react-select';
import { CustomStyle } from '../../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../../components/CustomSelectStyleDarkTheme';
import FilterRadioButton from '../../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../../components/FilterRadioButtonsContainer';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import Textarea from '../../../../../components/Textarea';
import useThemeContext from '../../../../../contexts/theme';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';
import { OptionType } from '../../../types';

interface IGeneralDataCard {
  title: string;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  department: string;
  handleDepartmentChange: (e: ChangeEvent<HTMLInputElement>) => void;
  level: OptionType;
  levelOptions: OptionType[];
  handleLevelChange: (e: OptionType) => void;
  locationCep: string;
  handleLocationCepChange: (e: ChangeEvent<HTMLInputElement>) => void;
  operatingModel: OptionType;
  operatingModelOptions: OptionType[];
  handleOperatingModelChange: (e: OptionType) => void;
  contractType: OptionType;
  contractTypeOptions: OptionType[];
  handleContractTypeChange: (e: OptionType) => void;
  description: string;
  handleDescriptionChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  additionalInfo: string;
  handleAdditionalInfoChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  reasonForOpening: string;
  handleReasonForOpeningChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  isSecret: boolean;
  handleIsSecret: (e: boolean) => void;
  vacanciesAmount: number | string;
  handleVacanciesAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  subordinatesAmount?: number | string;
  handleSubordinatesAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  workingSchedule: string;
  handleWorkingScheduleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
}

export default function GeneralDataCard({
  getErrorMessageByFieldName,
  isEdit,
  title,
  handleTitleChange,
  department,
  handleDepartmentChange,
  level,
  levelOptions,
  handleLevelChange,
  locationCep,
  handleLocationCepChange,
  operatingModel,
  operatingModelOptions,
  handleOperatingModelChange,
  contractType,
  contractTypeOptions,
  handleContractTypeChange,
  isSecret,
  handleIsSecret,
  vacanciesAmount,
  handleVacanciesAmountChange,
  subordinatesAmount,
  handleSubordinatesAmountChange,
  workingSchedule,
  handleWorkingScheduleChange,
  description,
  handleDescriptionChange,
  additionalInfo,
  handleAdditionalInfoChange,
  reasonForOpening,
  handleReasonForOpeningChange,
}: IGeneralDataCard) {
  const { selectedTheme } = useThemeContext();

  return (
    <StyledContainer>
      <div className="card-title">
        Dados Gerais
      </div>
      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('title')} aside>
          <label htmlFor="login">Título *</label>
          <Input
            placeholder="Título da Vaga"
            value={title}
            onChange={handleTitleChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('title')}
            disabled={isEdit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('department')} aside>
          <label htmlFor="login">Departamento *</label>
          <Input
            placeholder="Departamento"
            value={department}
            onChange={handleDepartmentChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('department')}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Nível</label>
          <Select
            value={{ value: level?.value, label: level?.label }}
            options={levelOptions}
            onChange={(opt) => {
              handleLevelChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('locationCep')}>
          <label htmlFor="login">CEP do local de atuação</label>
          <Input
            placeholder="00000-000"
            value={locationCep}
            onChange={handleLocationCepChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('locationCep')}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Modelo de atuação</label>
          <Select
            value={{ value: operatingModel?.value, label: operatingModel?.label }}
            options={operatingModelOptions}
            onChange={(opt) => {
              handleOperatingModelChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Tipo de contrato</label>
          <Select
            value={{ value: contractType?.value, label: contractType?.label }}
            options={contractTypeOptions}
            onChange={(opt) => {
              handleContractTypeChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('birthDate')} aside>
          <label htmlFor="login">Vaga Sigilosa?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton onClick={() => handleIsSecret(true)} selected={isSecret}>
              Sim
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleIsSecret(false)} selected={!isSecret}>
              Não
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('vacanciesAmount')} aside>
          <label htmlFor="login">Quantidade de vagas *</label>
          <Input
            placeholder="Quantidade de vagas para a posição"
            value={vacanciesAmount}
            onChange={handleVacanciesAmountChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('vacanciesAmount')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('subordinatesAmount')} aside>
          <label htmlFor="login">Quantidade de subordinados</label>
          <Input
            placeholder="Quantidade de subordinados para a posição"
            value={subordinatesAmount}
            onChange={handleSubordinatesAmountChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('subordinatesAmount')}
          />
        </FormGroup>
      </AsideContainer>

      <FormGroup error={getErrorMessageByFieldName('workingSchedule')} marginTop={16}>
        <label htmlFor="login">Jornada de trabalho</label>
        <Textarea
          onChange={handleWorkingScheduleChange}
          placeholder="Descreva a jornada de trabalho (ex: 8h às 18h de segunda a sexta)"
          value={workingSchedule}
          height={75}
        />
      </FormGroup>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('description')} aside>
        <label htmlFor="login">Descrição</label>
          <Textarea
            onChange={handleDescriptionChange}
            placeholder="Informe a descrição da vaga. Quais serão as responsablidades do encarregado, quais os requisitos necessários, etc."
            value={description}
            height={120}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('additionalInfo')} aside>
        <label htmlFor="login">Informação Adicional</label>
          <Textarea
            onChange={handleAdditionalInfoChange}
            placeholder="Informe qualquer informação adicional que desejar e julgue necessário para esta vaga."
            value={additionalInfo}
            height={120}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('reasonForOpening')} aside>
        <label htmlFor="login">Motivo de abertura</label>
          <Textarea
            onChange={handleReasonForOpeningChange}
            placeholder="Informe o motivo pelo qual essa vaga está sendo aberta."
            value={reasonForOpening}
            height={120}
          />
        </FormGroup>

      </AsideContainer>
    </StyledContainer>
  );
}

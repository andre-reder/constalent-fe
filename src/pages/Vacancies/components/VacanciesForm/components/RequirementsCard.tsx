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
import { GenderType, OptionType } from '../../../types';

interface IRequirementsCard {
  needsTravel: boolean;
  handleNeedsTravelChange: (e: boolean) => void;
  needsExtraHours: boolean;
  handleNeedsExtraHoursChange: (e: boolean) => void;
  minAge: number | string;
  handleMinAgeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  maxAge: number | string;
  handleMaxAgeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  gender: GenderType;
  handleGenderChange: (e: GenderType) => void;
  educationLevel: OptionType;
  educationLevelOptions: OptionType[];
  handleEducationLevelChange: (e: OptionType) => void;
  minExperience: number | string;
  handleMinExperienceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  desirableExperience: number | string;
  handleDesirableExperienceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  necessaryRequirements: string;
  handleNecessaryRequirementsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  desirableRequirements: string;
  handleDesirableRequirementsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  willApplicantBeTested: boolean;
  handleWillApplicantBeTestedChange: (e: boolean) => void;
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
}

export default function RequirementsCard({
  getErrorMessageByFieldName,
  educationLevel,
  educationLevelOptions,
  handleEducationLevelChange,
  minExperience,
  handleMinExperienceChange,
  desirableExperience,
  handleDesirableExperienceChange,
  minAge,
  handleMinAgeChange,
  maxAge,
  handleMaxAgeChange,
  gender,
  handleGenderChange,
  needsTravel,
  handleNeedsTravelChange,
  needsExtraHours,
  handleNeedsExtraHoursChange,
  willApplicantBeTested,
  handleWillApplicantBeTestedChange,
  necessaryRequirements,
  handleNecessaryRequirementsChange,
  desirableRequirements,
  handleDesirableRequirementsChange,
}: IRequirementsCard ) {
  const { selectedTheme } = useThemeContext();

  return (
    <StyledContainer>
      <div className="card-title">
        Requisitos
      </div>
      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Nível de escolaridade</label>
          <Select
            value={{ value: educationLevel?.value, label: educationLevel?.label }}
            options={educationLevelOptions}
            onChange={(opt) => {
              handleEducationLevelChange(opt!);
            }}
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('minExperience')} aside>
          <label htmlFor="login">Tempo de experiência necessário (em meses) *</label>
          <Input
            placeholder="Tempo de experiência mínimo"
            value={minExperience}
            onChange={handleMinExperienceChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('minExperience')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('desirableExperience')} aside>
          <label htmlFor="login">Tempo de experiência desejável (em meses) *</label>
          <Input
            placeholder="Tempo de experiência ideal"
            value={desirableExperience}
            onChange={handleDesirableExperienceChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('desirableExperience')}
          />
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('minAge')}>
          <label htmlFor="login">Idade mínima *</label>
          <Input
            placeholder="Idade mínima"
            value={minAge}
            onChange={handleMinAgeChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('minAge')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('maxAge')}>
          <label htmlFor="login">Idade máxima *</label>
          <Input
            placeholder="Idade máxima"
            value={maxAge}
            onChange={handleMaxAgeChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('maxAge')}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Gênero</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton onClick={() => handleGenderChange('indistinct')} selected={gender === 'indistinct'}>
              Indiferente
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleGenderChange('male')} selected={gender === 'male'}>
              Masculino
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleGenderChange('female')} selected={gender === 'female'}>
              Feminino
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Disponibilidade para viagens?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton onClick={() => handleNeedsTravelChange(false)} selected={!needsTravel}>
              Não Necessário
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleNeedsTravelChange(true)} selected={needsTravel}>
              Necessário
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Disponibilidade de hora extra?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton onClick={() => handleNeedsExtraHoursChange(false)} selected={!needsExtraHours}>
              Não Necessário
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleNeedsExtraHoursChange(true)} selected={needsExtraHours}>
              Necessário
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Haverá teste para comprovar habilidade?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton onClick={() => handleWillApplicantBeTestedChange(false)} selected={!willApplicantBeTested}>
              Não
            </FilterRadioButton>
            <FilterRadioButton onClick={() => handleWillApplicantBeTestedChange(true)} selected={willApplicantBeTested}>
              Sim
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('necessaryRequirements')} aside>
          <Textarea
            onChange={handleNecessaryRequirementsChange}
            placeholder="Informe os requisitos necessário para essa vaga."
            value={necessaryRequirements}
            height={120}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('desirableRequirements')} aside>
          <Textarea
            onChange={handleDesirableRequirementsChange}
            placeholder="Informe conhecimentos e habilidades desejáveis para essa vaga (que será um diferencial)."
            value={desirableRequirements}
            height={120}
          />
        </FormGroup>
      </AsideContainer>
    </StyledContainer>
  );
}

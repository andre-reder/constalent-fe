
import Select from 'react-select';

import { CustomStyle } from '../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../components/CustomSelectStyleDarkTheme';
import { Container } from './styles';

import { Dispatch, SetStateAction } from 'react';
import filter from '../../../../assets/images/icons/filter.svg';
import FilterRadioButton from '../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../components/FilterRadioButtonsContainer';
import useThemeContext from '../../../../contexts/theme';
import { GenderType, OptionType } from '../../types';

interface IFilters {
  gender: GenderType;
  setGender: Dispatch<SetStateAction<GenderType>>;
  selectedEducationLevel: OptionType;
  handleSelectedEducationLevelChange: (educationLevel: OptionType) => void;
  educationLevelOptions: OptionType[];
  selectedGraduationCourse: OptionType;
  handleSelectedGraduationCourseChange: (graduationCourse: OptionType) => void;
  graduationCourseOptions: OptionType[];
  selectedStatus: OptionType;
  handleSelectedStatusChange: (status: OptionType) => void;
  statusOptions: OptionType[];
}

export default function Filters({
  gender,
  setGender,
  selectedEducationLevel,
  handleSelectedEducationLevelChange,
  educationLevelOptions,
  selectedGraduationCourse,
  handleSelectedGraduationCourseChange,
  graduationCourseOptions,
  selectedStatus,
  handleSelectedStatusChange,
  statusOptions,
}: IFilters) {
  const { selectedTheme } = useThemeContext();

  return (
    <Container>
      <header>
        <img src={filter} alt="filter" className="primaryColor" />
        <div>Pesquise através dos filtros abaixo</div>
      </header>

      <div>
        <Select
          value={{ value: selectedEducationLevel.value, label: selectedEducationLevel.label === 'Todos' ? 'Filtrar por escolaridade' : selectedEducationLevel.label }}
          options={educationLevelOptions}
          onChange={(edc) => handleSelectedEducationLevelChange(edc as OptionType)}
          placeholder="Filtrar por escolaridade"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <Select
          value={{ value: selectedGraduationCourse.value, label: selectedGraduationCourse.label === 'Todos' ? 'Filtrar por curso' : selectedGraduationCourse.label }}
          options={graduationCourseOptions}
          onChange={(crs) => handleSelectedGraduationCourseChange(crs as OptionType)}
          placeholder="Filtrar por curso"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <Select
          value={{ value: selectedStatus.value, label: selectedStatus.label === 'Todos' ? 'Filtrar por status' : selectedStatus.label }}
          options={statusOptions}
          onChange={(stt) => handleSelectedStatusChange(stt as OptionType)}
          placeholder="Filtrar por status"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <FilterRadioButtonsContainer>
          <FilterRadioButton onClick={() => setGender('')} selected={gender === ''}>
            Todos
          </FilterRadioButton>

          <FilterRadioButton onClick={() => setGender('male')} selected={gender === 'male'}>
            Masculino
          </FilterRadioButton>

          <FilterRadioButton onClick={() => setGender('female')} selected={gender === 'female'}>
            Feminino
          </FilterRadioButton>
        </FilterRadioButtonsContainer>
      </div>
    </Container>
  );
}


import Select from 'react-select';

import { CustomStyle } from '../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../components/CustomSelectStyleDarkTheme';
import { Container } from './styles';

import { Dispatch, SetStateAction } from 'react';
import filter from '../../../../assets/images/icons/filter.svg';
import { useAppContext } from '../../../../contexts/auth';
import useThemeContext from '../../../../contexts/theme';
import { OptionType } from '../../types';

interface IFilters {
  interviewType: OptionType;
  setInterviewType: Dispatch<SetStateAction<OptionType>>;
  interviewTypeOptions: OptionType[];
  interviewStatus: OptionType;
  setInterviewStatus: Dispatch<SetStateAction<OptionType>>;
  interviewStatusOptions: OptionType[];
  vacancy: OptionType;
  handleVacancyChange: (opt: OptionType) => void;
  vacancyOptions: OptionType[];
  company: OptionType;
  handleCompanyChange: (opt: OptionType) => void;
  companyOptions: OptionType[];
}

export default function Filters({
  interviewType,
  setInterviewType,
  interviewTypeOptions,
  interviewStatus,
  setInterviewStatus,
  interviewStatusOptions,
  vacancy,
  handleVacancyChange,
  vacancyOptions,
  company,
  handleCompanyChange,
  companyOptions,
}: IFilters) {
  const { selectedTheme } = useThemeContext();
  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  return (
    <Container>
      <header>
        <img src={filter} alt="filter" className="primaryColor" />
        <div>Pesquise através dos filtros abaixo</div>
      </header>

      <div>
        <Select
          value={{ value: interviewType.value, label: interviewType.label === 'Todos' ? 'Filtrar por Tipo' : interviewType.label }}
          options={interviewTypeOptions}
          onChange={(opmd) => setInterviewType(opmd as OptionType)}
          placeholder="Filtrar por Tipo"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <Select
          value={{ value: interviewStatus.value, label: interviewStatus.label === 'Todos' ? 'Filtrar por status' : interviewStatus.label }}
          options={interviewStatusOptions}
          onChange={(stt) => setInterviewStatus(stt as OptionType)}
          placeholder="Filtrar por status"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        {!isCustomer && (
          <Select
            value={{ value: company.value, label: company.label === 'Todos' ? 'Filtrar por empresa' : company.label }}
            options={companyOptions}
            onChange={(vclv) => handleCompanyChange(vclv as OptionType)}
            placeholder="Filtrar por Escolaridade"
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            // menuPortalTarget={document.body}
            classNamePrefix="react-select"
            className="react-select-container-as-filter"
          />
        )}

        <Select
          value={{ value: vacancy.value, label: vacancy.label === 'Todos' ? 'Filtrar por vaga' : vacancy.label }}
          options={vacancyOptions}
          onChange={(vclv) => handleVacancyChange(vclv as OptionType)}
          placeholder="Filtrar por vaga"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />
      </div>
    </Container>
  );
}

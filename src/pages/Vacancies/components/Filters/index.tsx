
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
  operatingModel: OptionType;
  setOperatingModel: Dispatch<SetStateAction<OptionType>>;
  operatingModelOptions: OptionType[];
  contractType: OptionType;
  setContractType: Dispatch<SetStateAction<OptionType>>;
  contractTypeOptions: OptionType[];
  vacancyLevel: OptionType;
  setVacancyLevel: Dispatch<SetStateAction<OptionType>>;
  vacancyLevelOptions: OptionType[];
  educationLevel: OptionType;
  setEducationLevel: Dispatch<SetStateAction<OptionType>>;
  educationLevelOptions: OptionType[];
  status: OptionType;
  setStatus: Dispatch<SetStateAction<OptionType>>;
  statusOptions: OptionType[];
  company: OptionType;
  setCompany: Dispatch<SetStateAction<OptionType>>;
  companyOptions: OptionType[];
}

export default function Filters({
  operatingModel,
  setOperatingModel,
  operatingModelOptions,
  contractType,
  setContractType,
  contractTypeOptions,
  vacancyLevel,
  setVacancyLevel,
  vacancyLevelOptions,
  educationLevel,
  setEducationLevel,
  educationLevelOptions,
  status,
  setStatus,
  statusOptions,
  company,
  setCompany,
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
          value={{ value: operatingModel.value, label: operatingModel.label === 'Todos' ? 'Filtrar por Atuação' : operatingModel.label }}
          options={operatingModelOptions}
          onChange={(opmd) => setOperatingModel(opmd as OptionType)}
          placeholder="Filtrar por Atuação"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <Select
          value={{ value: contractType.value, label: contractType.label === 'Todos' ? 'Filtrar por contrato' : contractType.label }}
          options={contractTypeOptions}
          onChange={(ctt) => setContractType(ctt as OptionType)}
          placeholder="Filtrar por contrato"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <Select
          value={{ value: vacancyLevel.value, label: vacancyLevel.label === 'Todos' ? 'Filtrar por nível' : vacancyLevel.label }}
          options={vacancyLevelOptions}
          onChange={(vclv) => setVacancyLevel(vclv as OptionType)}
          placeholder="Filtrar por nível"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />
      </div>

      <div>
        <Select
          value={{ value: educationLevel.value, label: educationLevel.label === 'Todos' ? 'Filtrar por escolaridade' : educationLevel.label }}
          options={educationLevelOptions}
          onChange={(vclv) => setEducationLevel(vclv as OptionType)}
          placeholder="Filtrar por Escolaridade"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <Select
          value={{ value: status.value, label: status.label === 'Todos' ? 'Filtrar por Status' : status.label }}
          options={statusOptions}
          onChange={(vclv) => setStatus(vclv as OptionType)}
          placeholder="Filtrar por Status"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

      {!isCustomer && (
        <Select
          value={{ value: company.value, label: company.label === 'Todos' ? 'Filtrar por empresa' : company.label }}
          options={companyOptions}
          onChange={(vclv) => setCompany(vclv as OptionType)}
          placeholder="Filtrar por Escolaridade"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />
      )}
      </div>
    </Container>
  );
}

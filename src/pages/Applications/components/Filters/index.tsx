
import Select from 'react-select';

import { CustomStyle } from '../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../components/CustomSelectStyleDarkTheme';
import { Container } from './styles';

import filter from '../../../../assets/images/icons/filter.svg';
import { useAppContext } from '../../../../contexts/auth';
import useThemeContext from '../../../../contexts/theme';
import { OptionType } from '../../types';

interface IFilters {
  selectedCompany: OptionType;
  handleSelectedCompanyChange: (selectedCompany: OptionType) => void;
  companyOptions: OptionType[];
  selectedVacancy: OptionType;
  handleSelectedVacancyChange: (selectedVacancy: OptionType) => void;
  vacancyOptions: OptionType[];
  selectedCandidate: OptionType;
  handleSelectedCandidateChange: (selectedCandidate: OptionType) => void;
  candidateOptions: OptionType[];
  selectedStatus: OptionType;
  handleSelectedStatusChange: (selectedStatus: OptionType) => void;
  statusOptions: OptionType[];
}

export default function Filters({
  selectedCompany,
  handleSelectedCompanyChange,
  companyOptions,
  selectedVacancy,
  handleSelectedVacancyChange,
  vacancyOptions,
  selectedCandidate,
  handleSelectedCandidateChange,
  candidateOptions,
  selectedStatus,
  handleSelectedStatusChange,
  statusOptions,
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
        {!isCustomer && (
          <Select
            value={{ value: selectedCompany.value, label: selectedCompany.label === 'Todas' ? 'Filtrar por empresa' : selectedCompany.label }}
            options={companyOptions}
            onChange={(cp) => handleSelectedCompanyChange(cp as OptionType)}
            placeholder="Filtrar por Empresa"
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            // menuPortalTarget={document.body}
            classNamePrefix="react-select"
            className="react-select-container-as-filter"
          />
        )}

        <Select
          value={{ value: selectedVacancy.value, label: selectedVacancy.label === 'Todas' ? 'Filtrar por Vaga' : selectedVacancy.label }}
          options={vacancyOptions}
          onChange={(crs) => handleSelectedVacancyChange(crs as OptionType)}
          placeholder="Filtrar por Vaga"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <Select
          value={{ value: selectedCandidate.value, label: selectedCandidate.label === 'Todos' ? 'Filtrar por Candidato' : selectedCandidate.label }}
          options={candidateOptions}
          onChange={(stt) => handleSelectedCandidateChange(stt as OptionType)}
          placeholder="Filtrar por Candidato"
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
      </div>
    </Container>
  );
}

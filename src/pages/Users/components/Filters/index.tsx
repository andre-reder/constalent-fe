
import Select from 'react-select';

import { CustomStyle } from '../../../../components/CustomSelectStyle';
import { CustomStyle as CustomStyleDarkTheme } from '../../../../components/CustomSelectStyleDarkTheme';
import { Container } from './styles';

import { Dispatch, SetStateAction } from 'react';
import filter from '../../../../assets/images/icons/filter.svg';
import FilterRadioButton from '../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../components/FilterRadioButtonsContainer';
import useThemeContext from '../../../../contexts/theme';
import { OptionType, UserRoleType } from '../../types';

interface FiltersInterface {
  companiesOptions: OptionType[];
  selectedCompany: OptionType;
  handleCompanyChange: (company: OptionType) => void;
  selectedRole: UserRoleType;
  setSelectedRole: Dispatch<SetStateAction<UserRoleType>>;
}

export default function Filters({
  companiesOptions,
  selectedCompany,
  handleCompanyChange,
  selectedRole,
  setSelectedRole,
}: FiltersInterface) {
  const { selectedTheme } = useThemeContext();

  return (
    <Container>
      <header>
        <img src={filter} alt="filter" className="primaryColor" />
        <div>Pesquise através dos filtros abaixo</div>
      </header>

      <div>
        <Select
          value={{ value: selectedCompany.value, label: selectedCompany.label === 'Todas' ? 'Filtrar por empresa' : selectedCompany.label }}
          options={companiesOptions}
          onChange={(company) => handleCompanyChange(company as OptionType)}
          placeholder="Filtrar por empresa"
          styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
          // menuPortalTarget={document.body}
          classNamePrefix="react-select"
          className="react-select-container-as-filter"
        />

        <FilterRadioButtonsContainer>
          <FilterRadioButton onClick={() => setSelectedRole('')} selected={selectedRole === ''}>
            Todos
          </FilterRadioButton>

          <FilterRadioButton onClick={() => setSelectedRole('admin')} selected={selectedRole === 'admin'}>
            Administradores
          </FilterRadioButton>

          <FilterRadioButton onClick={() => setSelectedRole('customer')} selected={selectedRole === 'customer'}>
            Clientes
          </FilterRadioButton>
        </FilterRadioButtonsContainer>
      </div>
    </Container>
  );
}

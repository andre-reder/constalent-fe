
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Select from 'react-select';
import { CustomStyle } from '../../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../../components/CustomSelectStyleDarkTheme';
import FilterRadioButton from '../../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../../components/FilterRadioButtonsContainer';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import PasswordInputFormGroup from '../../../../../components/PasswordInputFormGroup';
import { useAppContext } from '../../../../../contexts/auth';
import useThemeContext from '../../../../../contexts/theme';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';
import { OptionType, UserRoleType } from '../../../types';

interface GeneralDataCardInterface {
  userName: string;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedCompany: OptionType;
  handleSelectedCompanyChange: (opt: OptionType) => void;
  role: UserRoleType;
  setRole: Dispatch<SetStateAction<UserRoleType>>;
  isEdit: boolean;
  companyOptions: OptionType[];
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handlePasswordConfirmationChange: (event: ChangeEvent<HTMLInputElement>) => void;
  passwordConfirmation: string;
}

export default function GeneralDataCard({
  userName,
  handleNameChange,
  email,
  handleEmailChange,
  selectedCompany,
  handleSelectedCompanyChange,
  companyOptions,
  role,
  setRole,
  handlePasswordChange,
  password,
  handlePasswordConfirmationChange,
  passwordConfirmation,
  isEdit,
  getErrorMessageByFieldName,
}: GeneralDataCardInterface) {
  const { selectedTheme } = useThemeContext();
  const { user } = useAppContext();

  return (
    <StyledContainer>
      <div className="card-title">
        Dados Gerais
      </div>
      <AsideContainer>
        <FormGroup error={getErrorMessageByFieldName('userName')}>
          <label htmlFor="login">Nome *</label>
          <Input
            placeholder="Nome do usuário"
            value={userName}
            onChange={handleNameChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('userName')}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('email')}>
          <label htmlFor="login">E-mail *</label>
          <Input
            placeholder="E-mail de login"
            value={email}
            onChange={handleEmailChange}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('email')}
            disabled={isEdit}
          />
        </FormGroup>
      </AsideContainer>

      {user?.role === 'admin' && (
        <AsideContainer>
          <FormGroup>
            <label htmlFor="login">Perfil *</label>
            <FilterRadioButtonsContainer>
              <FilterRadioButton selected={role === 'admin'} onClick={() => setRole('admin')} disabled={isEdit}>
                Administrador
              </FilterRadioButton>
              <FilterRadioButton selected={role === 'customer'} onClick={() => setRole('customer')} disabled={isEdit}>
                Cliente
              </FilterRadioButton>
            </FilterRadioButtonsContainer>
          </FormGroup>

          {role === 'customer' && (
            <FormGroup>
              <label htmlFor="login">Empresa *</label>
              <Select
                value={{ value: selectedCompany?.value, label: selectedCompany?.label }}
                options={companyOptions}
                onChange={(opt) => {
                  handleSelectedCompanyChange(opt!);
                }}
                styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
                classNamePrefix="react-select"
                className="react-select-container"
              />
            </FormGroup>
          )}
        </AsideContainer>
      )}

      {!isEdit && (
        <AsideContainer>
          <PasswordInputFormGroup
            label='Senha Inicial *'
            onChange={handlePasswordChange}
            value={password}
            error={getErrorMessageByFieldName('password')}
          />

          <PasswordInputFormGroup
            label='Confirmação de Senha *'
            onChange={handlePasswordConfirmationChange}
            value={passwordConfirmation}
            error={getErrorMessageByFieldName('passwordConfirmation')}
          />
        </AsideContainer>
      )}
    </StyledContainer>
  );
}

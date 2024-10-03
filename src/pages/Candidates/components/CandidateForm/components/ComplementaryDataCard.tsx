import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from 'react-toastify';
import { CustomStyle } from '../../../../../components/CustomSelectStyle';
import { CustomStyleDarkTheme } from '../../../../../components/CustomSelectStyleDarkTheme';
import FilterRadioButton from '../../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../../components/FilterRadioButtonsContainer';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import useThemeContext from '../../../../../contexts/theme';
import { OptionType } from '../../../types';

interface IComplementaryDataCard {
  isPortfolioFile: boolean;
  portfolio: string | File | undefined;
  handlePortfolioChange: (e: ChangeEvent<HTMLInputElement>) => void;
  courtCases: MultiValue<OptionType>
  courtCasesOptions: MultiValue<OptionType>;
  handleCourtCasesChange: (e: MultiValue<OptionType>) => void;
  isRegularWithGovernmentTax: boolean;
  setIsRegularWithGovernmentTax: Dispatch<SetStateAction<boolean>>;
  hasCriminalRecord: boolean;
  setHasCriminalRecord: Dispatch<SetStateAction<boolean>>;
  sentenceServed: boolean;
  setSentenceServed: Dispatch<SetStateAction<boolean>>;
  setIsPortfolioFile: Dispatch<SetStateAction<boolean>>;
}

export default function ComplementaryDataCard({
  isPortfolioFile,
  setIsPortfolioFile,
  portfolio,
  handlePortfolioChange,
  courtCases,
  courtCasesOptions,
  handleCourtCasesChange,
  isRegularWithGovernmentTax,
  setIsRegularWithGovernmentTax,
  hasCriminalRecord,
  setHasCriminalRecord,
  sentenceServed,
  setSentenceServed,
}: IComplementaryDataCard) {
  const { selectedTheme } = useThemeContext();
  const animatedComponents = makeAnimated();

  return (
    <StyledContainer>
      <div className="card-title">
        Dados Complementares
      </div>
      <AsideContainer>
      {!isPortfolioFile && (
          <FormGroup aside>
            <label htmlFor="login">Link do portifólio</label>
            <Input
              placeholder="https://www.meuportfolio.com"
              value={portfolio as string}
              onChange={handlePortfolioChange}
              autoComplete="new-password"
            />
          </FormGroup>
        )}

        <FormGroup aside>
          <label htmlFor="login">Tipo de portfólio (caso haja)</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton selected={!isPortfolioFile} onClick={() => setIsPortfolioFile(false)}>
              Link
            </FilterRadioButton>
            <FilterRadioButton selected={isPortfolioFile} onClick={() => {
              setIsPortfolioFile(true)
              toast.info('O arquivo deve ser enviado no quadro de arquivos')
            }}>
              Arquivo
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Processos</label>
          <Select
            value={courtCases}
            options={courtCasesOptions}
            onChange={(opt) => {
              handleCourtCasesChange(opt!);
            }}
            isMulti
            styles={selectedTheme === 'dark' ? CustomStyleDarkTheme : CustomStyle}
            classNamePrefix="react-select"
            className="react-select-container"
            closeMenuOnSelect={false}
            components={animatedComponents}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Está regular na Receita Federal?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton selected={isRegularWithGovernmentTax} onClick={() => setIsRegularWithGovernmentTax(true)}>
              Sim
            </FilterRadioButton>
            <FilterRadioButton selected={!isRegularWithGovernmentTax} onClick={() => setIsRegularWithGovernmentTax(false)}>
              Não
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
      </AsideContainer>

      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Possui antecedentes criminais?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton selected={hasCriminalRecord} onClick={() => setHasCriminalRecord(true)}>
              Sim
            </FilterRadioButton>
            <FilterRadioButton selected={!hasCriminalRecord} onClick={() => setHasCriminalRecord(false)}>
              Não
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>

        {hasCriminalRecord && (
          <FormGroup aside>
          <label htmlFor="login">Pena cumprida?</label>
          <FilterRadioButtonsContainer>
            <FilterRadioButton selected={sentenceServed} onClick={() => setSentenceServed(true)}>
              Sim
            </FilterRadioButton>
            <FilterRadioButton selected={!sentenceServed} onClick={() => setSentenceServed(false)}>
              Não
            </FilterRadioButton>
          </FilterRadioButtonsContainer>
        </FormGroup>
        )}
      </AsideContainer>
    </StyledContainer>
  );
}

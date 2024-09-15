import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import FilterRadioButton from '../../../../../components/FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../../../../../components/FilterRadioButtonsContainer';
import { AsideContainer, Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import Textarea from '../../../../../components/Textarea';
import { InterviewStatusType, InterviewTypeType } from '../../../types';

interface IConclusionCard {
  details: string;
  handleDetailsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  aiSummary: string;
  handleAiSummaryChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  status: InterviewStatusType;
  setStatus: Dispatch<SetStateAction<InterviewStatusType>>;
  type: InterviewTypeType;
  finalSalary: string;
  handleFinalSalaryChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ConclusionCard({
  details,
  handleDetailsChange,
  aiSummary,
  handleAiSummaryChange,
  status,
  setStatus,
  type,
  finalSalary,
  handleFinalSalaryChange,
}: IConclusionCard) {
  return (
    <StyledContainer>
      <div className="card-title">
        Conclusão Entrevista
      </div>
      <AsideContainer>
        <FormGroup aside>
          <label htmlFor="login">Detalhes</label>
          <Textarea
            placeholder="Detalhes / relatório da entrevista"
            value={details}
            onChange={handleDetailsChange}
            height={120}
          />
        </FormGroup>

        <FormGroup aside>
          <label htmlFor="login">Resumo (Gerado por IA)</label>
          <Textarea
            placeholder="Resumo da entrevista gerado por IA"
            value={aiSummary}
            onChange={handleAiSummaryChange}
            height={120}
          />
        </FormGroup>
      </AsideContainer>

      <FormGroup marginTop={16}>
        <label htmlFor="login">Status</label>
        <FilterRadioButtonsContainer>
          <FilterRadioButton onClick={() => setStatus('scheduled')} selected={status === 'scheduled'}>
            Agendado
          </FilterRadioButton>
          <FilterRadioButton onClick={() => setStatus('approved')} selected={status === 'approved'}>
            Aprovado
          </FilterRadioButton>
          <FilterRadioButton onClick={() => setStatus('rejected')} selected={status === 'rejected'}>
            Reprovado
          </FilterRadioButton>
          <FilterRadioButton onClick={() => setStatus('canceled')} selected={status === 'canceled'}>
            Cancelada
          </FilterRadioButton>
        </FilterRadioButtonsContainer>
      </FormGroup>

    {(status === 'approved' && type === 'company') && (
      <FormGroup>
        <label htmlFor="">Salário Final Acordado</label>
        <Input
          value={finalSalary}
          onChange={handleFinalSalaryChange}
          placeholder='R$ XX.XXX,XX'
        />
      </FormGroup>
    )}
    </StyledContainer>
  );
}

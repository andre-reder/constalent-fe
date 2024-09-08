import { ChangeEvent } from 'react';
import { Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';
import Input from '../../../../../components/Input';
import { GetErrorMessageByFieldNameType } from '../../../../../hooks/useErrors';

interface ISuggestionsMeetingDatesCard {
  getErrorMessageByFieldName: GetErrorMessageByFieldNameType;
  isEdit: boolean;
  suggestionsOfAlignmentMeetingDates: string[];
  handleSuggestionsOfAlignmentMeetingDatesChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

export default function SuggestionsMeetingDatesCard({
  getErrorMessageByFieldName,
  isEdit,
  suggestionsOfAlignmentMeetingDates,
  handleSuggestionsOfAlignmentMeetingDatesChange,
}: ISuggestionsMeetingDatesCard) {
  return (
    <StyledContainer>
      <div className="card-title">
        Sugestões de datas e horas para reunião de alinhamento da vaga
      </div>
        <FormGroup error={getErrorMessageByFieldName('suggestionDate1')} marginTop={16}>
          <label htmlFor="login">Data e hora 1 *</label>
          <Input
            type='datetime-local'
            value={suggestionsOfAlignmentMeetingDates[0]}
            onChange={(e) => handleSuggestionsOfAlignmentMeetingDatesChange(e, 0)}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('suggestionDate1')}
            disabled={isEdit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('suggestionDate2')} marginTop={16}>
          <label htmlFor="login">Data e hora 2 *</label>
          <Input
            type='datetime-local'
            value={suggestionsOfAlignmentMeetingDates[1]}
            onChange={(e) => handleSuggestionsOfAlignmentMeetingDatesChange(e, 1)}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('suggestionDate2')}
            disabled={isEdit}
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('suggestionDate3')} marginTop={16}>
          <label htmlFor="login">Data e hora 3 *</label>
          <Input
            type='datetime-local'
            value={suggestionsOfAlignmentMeetingDates[2]}
            onChange={(e) => handleSuggestionsOfAlignmentMeetingDatesChange(e, 2)}
            autoComplete="new-password"
            error={getErrorMessageByFieldName('suggestionDate3')}
            disabled={isEdit}
          />
        </FormGroup>
    </StyledContainer>
  );
}

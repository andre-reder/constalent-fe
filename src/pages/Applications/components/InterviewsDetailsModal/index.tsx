import { format } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import FilterRadioButton from "../../../../components/FilterRadioButtons";
import { FilterRadioButtonsContainer } from "../../../../components/FilterRadioButtonsContainer";
import MyModal from "../../../../components/Modal";
import { ApplicationType, InterviewDetailsType } from "../../types";
import { InterviewContainer } from "./styles";

interface IInterviewsDetailsModal {
  applicationBeingViewedInterviews: ApplicationType;
  interviewsDetails: InterviewDetailsType[];
  interviewDetailsModalShow: boolean;
  setInterviewDetailsModalShow: Dispatch<SetStateAction<boolean>>;
}

export default function InterviewsDetailsModal({
  applicationBeingViewedInterviews,
  interviewsDetails,
  interviewDetailsModalShow,
  setInterviewDetailsModalShow,
}: IInterviewsDetailsModal) {
  const [interviewBeingViewed, setInterviewBeingViewed] = useState<'recruiter' | 'company'>('recruiter');
  const [specificInterview, setSpecificInterview] = useState<InterviewDetailsType | null>(null);

  const recruiterInterview = interviewsDetails?.find(interview => interview.type === 'recruiter');
  const companyInterviews = interviewsDetails?.filter(interview => interview.type === 'company');

  const interviewStatusLiterals: { [key: string]: string } = {
    'scheduled': 'Agendada',
    'canceled': 'Cancelada',
    'approved': 'Aprovada',
    'rejected': 'Rejeitada',
  }

  return (
    <MyModal
      title={`Entrevistas da Aplicação de ${applicationBeingViewedInterviews?.candidate?.name} para ${applicationBeingViewedInterviews?.vacancy?.title}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Alterar"
      modalBody={(
        <>
          <FilterRadioButtonsContainer>
            {recruiterInterview && (
              <FilterRadioButton onClick={() => setInterviewBeingViewed('recruiter')} selected={interviewBeingViewed === 'recruiter'}>
                Recrutador
              </FilterRadioButton>
            )}
            {companyInterviews && companyInterviews.length > 0 && (
              <>
                {companyInterviews.map((companyInterview, index) => (
                  <FilterRadioButton
                    key={companyInterview.id}
                    onClick={() => {
                      setInterviewBeingViewed('company');
                      setSpecificInterview(companyInterview);
                    }}
                    selected={interviewBeingViewed === 'company' && specificInterview?.id === companyInterview.id}
                  >
                    #{index + 1} Empresa
                  </FilterRadioButton>
                ))}
              </>
            )}
          </FilterRadioButtonsContainer>

          {(interviewBeingViewed === 'recruiter' && recruiterInterview) && (
            <InterviewContainer>
              <div className="group">
                <strong>Status</strong>
                <span>{interviewStatusLiterals[recruiterInterview?.status]}</span>
              </div>

              <div className="group">
                <strong>Data</strong>
                <span>{format(new Date(recruiterInterview?.date), 'dd/MM/yyyy\' ás \'HH:mm')}</span>
              </div>

              <div className="group">
                <strong>Relatório / Detalhes</strong>
                <span>{recruiterInterview?.details || 'Não informado'}</span>
              </div>

              <div className="group">
                <strong>Resumo IA</strong>
                <span>{recruiterInterview?.aiSummary || 'Não informado'}</span>
              </div>
            </InterviewContainer>
          )}

          {(interviewBeingViewed === 'company' && companyInterviews && companyInterviews.length > 0 && specificInterview) && (
            <InterviewContainer>
              <div className="group">
                <strong>Status</strong>
                <span>{interviewStatusLiterals[specificInterview?.status]}</span>
              </div>

              <div className="group">
                <strong>Data</strong>
                <span>{format(new Date(specificInterview?.date), 'dd/MM/yyyy\' ás \'HH:mm')}</span>
              </div>

              <div className="group">
                <strong>Relatório / Detalhes</strong>
                <span>{specificInterview?.details || 'Não informado'}</span>
              </div>

              <div className="group">
                <strong>Resumo IA</strong>
                <span>{specificInterview?.aiSummary || 'Não informado'}</span>
              </div>
            </InterviewContainer>
          )}
        </>
  )}
      onClose={() => setInterviewDetailsModalShow(false)}
      show={interviewDetailsModalShow}
      type="info"
  />
  )
}

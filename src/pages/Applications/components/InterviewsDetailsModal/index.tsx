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

  const recruiterInterview = interviewsDetails?.find(interview => interview.type === 'recruiter');
  const companyInterview = interviewsDetails?.find(interview => interview.type === 'company');

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
            {companyInterview && (
              <FilterRadioButton onClick={() => setInterviewBeingViewed('company')} selected={interviewBeingViewed === 'company'}>
                Empresa
              </FilterRadioButton>
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

          {(interviewBeingViewed === 'company' && companyInterview) && (
            <InterviewContainer>
              <div className="group">
                <strong>Status</strong>
                <span>{companyInterview?.status}</span>
              </div>

              <div className="group">
                <strong>Data</strong>
                <span>{format(new Date(companyInterview?.date), 'dd/MM/yyyy\' ás \'HH:mm')}</span>
              </div>

              <div className="group">
                <strong>Relatório / Detalhes</strong>
                <span>{companyInterview?.details || 'Não informado'}</span>
              </div>

              <div className="group">
                <strong>Resumo IA</strong>
                <span>{companyInterview?.aiSummary || 'Não informado'}</span>
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

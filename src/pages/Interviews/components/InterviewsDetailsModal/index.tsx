import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import MyModal from "../../../../components/Modal";
import { InterviewType } from "../../types";
import { InterviewContainer } from "./styles";

interface IInterviewDetailsModal {
  interviewDetails: InterviewType;
  interviewDetailsModalShow: boolean;
  setInterviewDetailsModalShow: Dispatch<SetStateAction<boolean>>;
}

export default function InterviewDetailsModal({
  interviewDetails,
  interviewDetailsModalShow,
  setInterviewDetailsModalShow,
}: IInterviewDetailsModal) {
  const interviewStatusLiterals: { [key: string]: string } = {
    'scheduled': 'Agendada',
    'canceled': 'Cancelada',
    'approved': 'Aprovada',
    'rejected': 'Rejeitada',
  }

  if (!interviewDetails.date) return;

  return (
    <MyModal
      title={`Detalhes da entrevista de ${interviewDetails?.candidate?.name} para ${interviewDetails?.vacancy?.title}`}
      closeButtonLabel="Fechar"
      modalBody={(
        <>
            <InterviewContainer>
              <div className="group">
                <strong>Status</strong>
                <span>{interviewStatusLiterals[interviewDetails?.status]}</span>
              </div>

              <div className="group">
                <strong>Data</strong>
                <span>{format(new Date(interviewDetails?.date), 'dd/MM/yyyy\' ás \'HH:mm')}</span>
              </div>

              <div className="group">
                <strong>Relatório / Detalhes</strong>
                <span>{interviewDetails?.details || 'Não informado'}</span>
              </div>

              <div className="group">
                <strong>Resumo IA</strong>
                <span>{interviewDetails?.aiSummary || 'Não informado'}</span>
              </div>
            </InterviewContainer>
        </>
  )}
      onClose={() => setInterviewDetailsModalShow(false)}
      show={interviewDetailsModalShow}
      type="info"
  />
  )
}

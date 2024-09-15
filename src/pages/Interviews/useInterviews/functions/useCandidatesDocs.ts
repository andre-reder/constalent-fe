import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import applicationsService from "../../../../services/applicationsService";
import { CandidatesDocsType, InterviewType } from "../../types";

export default function useCandidatesDocs() {
  const [interviewBeingViewedCandidatesDocs, setInterviewBeingViewedCandidatesDocs] = useState({} as InterviewType);
  const [candidatesDocs, setCandidatesDocs] = useState<CandidatesDocsType>({} as CandidatesDocsType);

  const [candidatesDocsModalShow, setCandidatesDocsModalShow] = useState(false);
  const [isGettingCandidatesDocs, setIsGettingCandidatesDocs] = useState(false);

  const { apiCall } = useApiCall();

  const onOpenCandidatesDocsModal = useCallback(async (interview: InterviewType) => {
    await apiCall({
      apiToCall: applicationsService.getCandidatesDocsOfApplication,
      queryParams: { candidateId: interview.candidate.id },
      onStartLoad: () => setIsGettingCandidatesDocs(true),
      onEndLoad: () => setIsGettingCandidatesDocs(false),
      actionAfterResponse: (response: { success: boolean, candidatesDocs: CandidatesDocsType }) => {
        if (!response.success) {
          setCandidatesDocsModalShow(false);
          toast.error('Erro ao buscar documentos do candidato desta entrevista');
          return;
        }

        setCandidatesDocs(response.candidatesDocs);
        setInterviewBeingViewedCandidatesDocs(interview);
        setCandidatesDocsModalShow(true);
      },
      catchAction: () => {
        setCandidatesDocsModalShow(false);
      },
      catchMessage: 'Erro ao buscar documentos do candidato desta entrevista',
    })
  }, [apiCall]);

  return {
    interviewBeingViewedCandidatesDocs,
    onOpenCandidatesDocsModal,
    candidatesDocsModalShow,
    setCandidatesDocsModalShow,
    candidatesDocs,
    isGettingCandidatesDocs,
  }
}

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import applicationsService from "../../../../services/applicationsService";
import { ApplicationType, CandidatesDocsType } from "../../types";

export default function useCandidatesDocs() {
  const [applicationBeingViewedCandidatesDocs, setApplicationBeingViewedCandidatesDocs] = useState({} as ApplicationType);
  const [candidatesDocs, setCandidatesDocs] = useState<CandidatesDocsType>({} as CandidatesDocsType);

  const [candidatesDocsModalShow, setCandidatesDocsModalShow] = useState(false);
  const [isGettingCandidatesDocs, setIsGettingCandidatesDocs] = useState(false);

  const { apiCall } = useApiCall();

  const onOpenCandidatesDocsModal = useCallback(async (application: ApplicationType) => {
    await apiCall({
      apiToCall: applicationsService.getCandidatesDocsOfApplication,
      queryParams: { candidateId: application.candidateId },
      onStartLoad: () => setIsGettingCandidatesDocs(true),
      onEndLoad: () => setIsGettingCandidatesDocs(false),
      actionAfterResponse: (response: { success: boolean, candidatesDocs: CandidatesDocsType }) => {
        if (!response.success) {
          setCandidatesDocsModalShow(false);
          toast.error('Erro ao buscar documentos do candidato desta aplicação');
          return;
        }

        setCandidatesDocs(response.candidatesDocs);
        setApplicationBeingViewedCandidatesDocs(application);
        setCandidatesDocsModalShow(true);
      },
      catchAction: () => {
        setCandidatesDocsModalShow(false);
      },
      catchMessage: 'Erro ao buscar documentos do candidato desta aplicação',
    })
  }, [apiCall]);

  return {
    applicationBeingViewedCandidatesDocs,
    onOpenCandidatesDocsModal,
    candidatesDocsModalShow,
    setCandidatesDocsModalShow,
    candidatesDocs,
    isGettingCandidatesDocs,
  }
}

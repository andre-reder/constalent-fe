import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useApiCall from "../../../../hooks/useApiCall";
import applicationsService from "../../../../services/applicationsService";
import { ApplicationType, InterviewDetailsType } from "../../types";

export default function useInterviewDetails() {
  const [applicationBeingViewedInterviews, setApplicationBeingViewedInterviews] = useState({} as ApplicationType);
  const [interviewsDetails, setInterviewsDetails] = useState<InterviewDetailsType[]>([]);

  const [interviewDetailsModalShow, setInterviewDetailsModalShow] = useState(false);
  const [isGettingInterviews, setIsGettingInterviews] = useState(false);

  const { apiCall } = useApiCall();

  const onOpenInterviewDetailsModal = useCallback(async (application: ApplicationType) => {
    await apiCall({
      apiToCall: applicationsService.getInterviewsOfApplication,
      queryParams: { applicationId: application.id },
      onStartLoad: () => setIsGettingInterviews(true),
      onEndLoad: () => setIsGettingInterviews(false),
      actionAfterResponse: (response: { success: boolean, interviews: InterviewDetailsType[] }) => {
        if (!response.success) {
          setInterviewDetailsModalShow(false);
          toast.error('Erro ao buscar entrevistas desta aplicação');
          return;
        }

        setInterviewsDetails(response.interviews);
        setApplicationBeingViewedInterviews(application);
        setInterviewDetailsModalShow(true);
      },
      catchAction: () => {
        setInterviewDetailsModalShow(false);
      },
      catchMessage: 'Erro ao buscar entrevistas desta aplicação',
    })
  }, [apiCall]);

  return {
    applicationBeingViewedInterviews,
    onOpenInterviewDetailsModal,
    interviewsDetails,
    interviewDetailsModalShow,
    setInterviewDetailsModalShow,
    isGettingInterviews,
  }
}

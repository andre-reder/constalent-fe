import { useState } from "react";
import { InterviewType } from "../../types";

export default function useInterviewDetails() {
  const [interviewDetails, setInterviewDetails] = useState<InterviewType>({} as InterviewType);
  const [interviewDetailsModalShow, setInterviewDetailsModalShow] = useState(false);

  function onOpenInterviewDetailsModal(interview: InterviewType) {
    setInterviewDetails(interview);
    setInterviewDetailsModalShow(true);
  }

  return {
    onOpenInterviewDetailsModal,
    interviewDetails,
    interviewDetailsModalShow,
    setInterviewDetailsModalShow,
  }
}

import useCandidatesDocs from "./functions/useCandidatesDocs";
import useInterviewDetails from "./functions/useInterviewDetails";
import useLoadApplications from "./functions/useLoadApplications";
import usePagination from "./functions/usePagination";
import useSearches from "./functions/useSearches";
import useUpdateApplication from "./functions/useUpdateApplication";

export default function useApplications() {
  const {
    currentPage,
    setCurrentPage,
    filteredApplications,
    setFilteredApplications,
    setApplicationsSplitted,
    pagesQuantity,
    handlePageChange,
  } = usePagination();

  const {
    isLoading,
    applications,
    companyOptions,
    allVacancies,
    allCandidates,
    statusOptions,
    getApplications,
    hasError,
  } = useLoadApplications({
    setApplicationsSplitted,
    setCurrentPage,
    setFilteredApplications,
  });

  const {
    selectedCompany,
    handleSelectedCompanyChange,
    selectedVacancy,
    handleSelectedVacancyChange,
    vacancyOptions,
    selectedCandidate,
    handleSelectedCandidateChange,
    candidateOptions,
    selectedStatus,
    handleSelectedStatusChange,
  } = useSearches({
    applications,
    setApplicationsSplitted,
    setFilteredApplications,
    allVacancies,
    allCandidates,
  });

  const {
    applicationBeingUpdated,
    handleOpenChangeStatusModal,
    handleOpenChangeSalaryModal,
    changeStatusModalShow,
    changeSalaryModalShow,
    changeStatus,
    changeSalary,
    isUpdatingApplication,
    handleFinalSalaryChange,
    newStatus,
    setNewStatus,
    finalSalary,
    setChangeStatusModalShow,
    setChangeSalaryModalShow,
    canChangeSalary,
  } = useUpdateApplication({
    getApplications,
  });

  const {
    applicationBeingViewedInterviews,
    onOpenInterviewDetailsModal,
    interviewsDetails,
    interviewDetailsModalShow,
    setInterviewDetailsModalShow,
    isGettingInterviews,
  } = useInterviewDetails();

  const {
    applicationBeingViewedCandidatesDocs,
    onOpenCandidatesDocsModal,
    candidatesDocsModalShow,
    setCandidatesDocsModalShow,
    candidatesDocs,
    isGettingCandidatesDocs,
  } = useCandidatesDocs();

  return {
    isLoading: isLoading || isUpdatingApplication || isGettingInterviews || isGettingCandidatesDocs,
    applications,
    selectedStatus,
    handleSelectedStatusChange,
    statusOptions,
    selectedCompany,
    handleSelectedCompanyChange,
    companyOptions,
    selectedVacancy,
    handleSelectedVacancyChange,
    vacancyOptions,
    selectedCandidate,
    handleSelectedCandidateChange,
    candidateOptions,
    hasError,
    filteredApplications,
    handlePageChange,
    pagesQuantity,
    currentPage,
    handleTryAgain: getApplications,
    applicationBeingUpdated,
    handleOpenChangeStatusModal,
    handleOpenChangeSalaryModal,
    changeStatusModalShow,
    changeSalaryModalShow,
    changeStatus,
    changeSalary,
    isUpdatingApplication,
    handleFinalSalaryChange,
    newStatus,
    setNewStatus,
    finalSalary,
    setChangeStatusModalShow,
    appplicationBeingUpdated: applicationBeingUpdated,
    setChangeSalaryModalShow,
    canChangeSalary,
    onOpenInterviewDetailsModal,
    interviewsDetails,
    interviewDetailsModalShow,
    setInterviewDetailsModalShow,
    applicationBeingViewedInterviews,
    applicationBeingViewedCandidatesDocs,
    onOpenCandidatesDocsModal,
    candidatesDocsModalShow,
    setCandidatesDocsModalShow,
    candidatesDocs,
  }
}

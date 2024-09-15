import { useMemo } from "react";
import useCandidatesDocs from "./functions/useCandidatesDocs";
import useDeleteInterview from "./functions/useDeleteInterview";
import useInterviewDetails from "./functions/useInterviewDetails";
import useLoadInterviews from "./functions/useLoadInterviews";
import usePagination from "./functions/usePagination";
import useSearches from "./functions/useSearches";

export default function useInterviews() {
  const {
    currentPage,
    setCurrentPage,
    filteredInterviews,
    setFilteredInterviews,
    setInterviewsSplitted,
    pagesQuantity,
    handlePageChange,
  } = usePagination();

  const {
    isLoadLoading,
    interviews,
    interviewTypeOptions,
    interviewStatusOptions,
    companyOptions,
    vacancyOptions,
    getInterviews,
    hasError,
  } = useLoadInterviews({
    setInterviewsSplitted,
    setCurrentPage,
    setFilteredInterviews,
  });

  const {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    interviewType,
    setInterviewType,
    interviewStatus,
    setInterviewStatus,
    company,
    handleCompanyChange,
    vacancy,
    handleVacancyChange,
  } = useSearches({
    interviews,
    setInterviewsSplitted,
    setFilteredInterviews,
  });

  const {
    isDeletingInterview,
    deleteModalShow,
    setDeleteModalShow,
    interviewBeingDeleted,
    deleteInterview,
    handleOpenDeleteModal,
  } = useDeleteInterview({
    loadInterviews: getInterviews,
    setSearchTerm,
  });

  const {
    interviewBeingViewedCandidatesDocs,
    onOpenCandidatesDocsModal,
    candidatesDocsModalShow,
    setCandidatesDocsModalShow,
    candidatesDocs,
    isGettingCandidatesDocs,
  } = useCandidatesDocs();

  const {
    onOpenInterviewDetailsModal,
    interviewDetails,
    interviewDetailsModalShow,
    setInterviewDetailsModalShow,
  } = useInterviewDetails();

  const isLoading = isLoadLoading || isDeletingInterview || isGettingCandidatesDocs;

  const updatedVacancyOptionsBySelectedCompany = useMemo(() => vacancyOptions.filter((vcyOpt) => {
    const interviewsOfCompany = interviews.filter((interview) => interview.company.id === company.value);

    if (vcyOpt.value === '') {
      return true;
    }

    return interviewsOfCompany.some((interview) => interview.vacancy.id === vcyOpt.value);
  }), [company.value, interviews, vacancyOptions])

  function handleTryAgain() {
    getInterviews();
  }

  return {
    isLoading,
    interviews,
    searchTerm,
    handleChangeSearchTerm,
    interviewType,
    setInterviewType,
    interviewTypeOptions,
    interviewStatus,
    setInterviewStatus,
    interviewStatusOptions,
    company,
    handleCompanyChange,
    companyOptions,
    vacancy,
    handleVacancyChange,
    vacancyOptions: updatedVacancyOptionsBySelectedCompany,
    hasError,
    filteredInterviews,
    handlePageChange,
    pagesQuantity,
    currentPage,
    deleteModalShow,
    setDeleteModalShow,
    interviewBeingDeleted,
    deleteInterview,
    handleOpenDeleteModal,
    handleTryAgain,
    interviewBeingViewedCandidatesDocs,
    candidatesDocs,
    candidatesDocsModalShow,
    setCandidatesDocsModalShow,
    onOpenCandidatesDocsModal,
    onOpenInterviewDetailsModal,
    interviewDetails,
    interviewDetailsModalShow,
    setInterviewDetailsModalShow,
  }
}

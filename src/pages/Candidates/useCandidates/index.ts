import useDeleteCandidate from "./functions/useDeleteCandidate";
import useLoadCandidates from "./functions/useLoadCandidates";
import usePagination from "./functions/usePagination";
import useSearches from "./functions/useSearches";

export default function useCandidates() {
  const {
    currentPage,
    setCurrentPage,
    filteredCandidates,
    setFilteredCandidates,
    setCandidatesSplitted,
    pagesQuantity,
    handlePageChange,
  } = usePagination();

  const {
    isLoadLoading,
    candidates,
    educationLevelOptions,
    graduationCourseOptions,
    getCandidates,
    hasError,
    statusOptions,
  } = useLoadCandidates({
    setCandidatesSplitted,
    setCurrentPage,
    setFilteredCandidates,
  });

  const {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    gender,
    setGender,
    selectedEducationLevel,
    handleSelectedEducationLevelChange,
    selectedGraduationCourse,
    handleSelectedGraduationCourseChange,
    selectedStatus,
    handleSelectedStatusChange,
  } = useSearches({
    candidates,
    setCandidatesSplitted,
    setFilteredCandidates,
  });

  const {
    isDeletingCandidate,
    deleteModalShow,
    setDeleteModalShow,
    candidateBeingDeleted,
    deleteCandidate,
    handleOpenDeleteModal,
  } = useDeleteCandidate({
    loadCandidates: getCandidates,
    setSearchTerm,
  });

  const isLoading = isLoadLoading || isDeletingCandidate;

  return {
    isLoading,
    candidates,
    searchTerm,
    handleChangeSearchTerm,
    gender,
    setGender,
    selectedEducationLevel,
    handleSelectedEducationLevelChange,
    educationLevelOptions,
    selectedGraduationCourse,
    handleSelectedGraduationCourseChange,
    graduationCourseOptions,
    selectedStatus,
    handleSelectedStatusChange,
    statusOptions,
    hasError,
    filteredCandidates,
    handlePageChange,
    pagesQuantity,
    currentPage,
    deleteModalShow,
    setDeleteModalShow,
    candidateBeingDeleted,
    deleteCandidate,
    handleOpenDeleteModal,
    handleTryAgain: getCandidates,
  }
}

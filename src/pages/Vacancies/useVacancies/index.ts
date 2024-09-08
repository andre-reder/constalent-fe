import useDeleteVacancy from "./functions/useDeleteVacancy";
import useLoadVacancies from "./functions/useLoadVacancies";
import usePagination from "./functions/usePagination";
import useSearches from "./functions/useSearches";

export default function useVacancies() {
  const {
    currentPage,
    setCurrentPage,
    filteredVacancies,
    setFilteredVacancies,
    setVacanciesSplitted,
    pagesQuantity,
    handlePageChange,
  } = usePagination();

  const {
    isLoadLoading,
    vacancies,
    educationLevelOptions,
    operatingModelOptions,
    contractTypeOptions,
    vacancyLevelOptions,
    statusOptions,
    companyOptions,
    getVacancies,
    hasError,
  } = useLoadVacancies({
    setVacanciesSplitted,
    setCurrentPage,
    setFilteredVacancies,
  });

  const {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    operatingModel,
    setOperatingModel,
    contractType,
    setContractType,
    vacancyLevel,
    setVacancyLevel,
    educationLevel,
    setEducationLevel,
    status,
    setStatus,
    company,
    setCompany,
  } = useSearches({
    vacancies,
    setVacanciesSplitted,
    setFilteredVacancies,
  });

  const {
    isDeletingVacancy,
    deleteModalShow,
    setDeleteModalShow,
    vacancyBeingDeleted,
    deleteVacancy,
    handleOpenDeleteModal,
  } = useDeleteVacancy({
    loadVacancies: getVacancies,
    setSearchTerm,
  });

  const isLoading = isLoadLoading || isDeletingVacancy;

  return {
    isLoading,
    vacancies,
    searchTerm,
    handleChangeSearchTerm,
    operatingModel,
    setOperatingModel,
    operatingModelOptions,
    contractType,
    setContractType,
    contractTypeOptions,
    vacancyLevel,
    setVacancyLevel,
    vacancyLevelOptions,
    educationLevel,
    setEducationLevel,
    educationLevelOptions,
    status,
    setStatus,
    statusOptions,
    company,
    setCompany,
    companyOptions,
    hasError,
    filteredVacancies,
    handlePageChange,
    pagesQuantity,
    currentPage,
    deleteModalShow,
    setDeleteModalShow,
    vacancyBeingDeleted,
    deleteVacancy,
    handleOpenDeleteModal,
    handleTryAgain: getVacancies,
  }
}

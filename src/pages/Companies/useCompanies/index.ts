import useDeleteCompany from "./functions/useDeleteCompany";
import useLoadCompanies from "./functions/useLoadCompanies";
import usePagination from "./functions/usePagination";
import useSearches from "./functions/useSearches";

export default function useCompanies() {
  const {
    currentPage,
    setCurrentPage,
    filteredCompanies,
    setFilteredCompanies,
    setCompaniesSplitted,
    pagesQuantity,
    handlePageChange,
  } = usePagination();

  const {
    isLoadLoading,
    companies,
    getCompanies,
    hasError,
  } = useLoadCompanies({
    setCompaniesSplitted,
    setCurrentPage,
    setFilteredCompanies,
  });

  const {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
  } = useSearches({
    companies,
    setCompaniesSplitted,
    setFilteredCompanies,
  });

  const {
    isDeletingCompany,
    deleteModalShow,
    setDeleteModalShow,
    companyBeingDeleted,
    deleteCompany,
    handleOpenDeleteModal,
  } = useDeleteCompany({
    loadCompanies: getCompanies,
    setSearchTerm,
  });

  const isLoading = isLoadLoading || isDeletingCompany;

  return {
    isLoading,
    companies,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredCompanies,
    handlePageChange,
    pagesQuantity,
    currentPage,
    deleteModalShow,
    setDeleteModalShow,
    companyBeingDeleted,
    deleteCompany,
    handleOpenDeleteModal,
    handleTryAgain: getCompanies,
  }
}

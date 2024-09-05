
import useDeleteUser from "./functions/useDeleteUser";
import useLoadUsers from "./functions/useLoadUsers";
import usePagination from "./functions/usePagination";
import useSearches from "./functions/useSearches";

export default function useUsers() {
  const {
    currentPage,
    setCurrentPage,
    filteredUsers,
    setFilteredUsers,
    setUsersSplitted,
    pagesQuantity,
    handlePageChange,
  } = usePagination();

  const {
    isLoadLoading,
    users,
    companiesOptions,
    getUsers,
    hasError,
  } = useLoadUsers({
    setUsersSplitted,
    setCurrentPage,
    setFilteredUsers,
  });

  const {
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    selectedCompany,
    handleCompanyChange,
    selectedRole,
    setSelectedRole,
  } = useSearches({
    users,
    setUsersSplitted,
    setFilteredUsers,
  });

  const {
    isDeletingUser,
    deleteModalShow,
    setDeleteModalShow,
    userBeingDeleted,
    deleteUser,
    handleOpenDeleteModal,
  } = useDeleteUser({
    loadUsers: getUsers,
    setSearchTerm,
  });

  const isLoading = isLoadLoading || isDeletingUser;

  return {
    isLoading,
    users,
    companiesOptions,
    selectedCompany,
    handleCompanyChange,
    selectedRole,
    setSelectedRole,
    searchTerm,
    setSearchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredUsers,
    handlePageChange,
    pagesQuantity,
    currentPage,
    deleteModalShow,
    setDeleteModalShow,
    userBeingDeleted,
    deleteUser,
    handleOpenDeleteModal,
    handleTryAgain: getUsers,
  };
}

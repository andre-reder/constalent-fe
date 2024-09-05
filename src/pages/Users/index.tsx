
import { Header } from "../../components/Header";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import OpacityAnimation from "../../components/OpacityAnimation";
import SearchAtPage from "../../components/SearchAtPage";
import { useAppContext } from "../../contexts/auth";
import DeleteUserModal from "./components/DeleteUserModal";
import Filters from "./components/Filters";
import List from "./components/List";
import ListHeader from "./components/ListHeader";
import useUsers from "./useUsers";

export default function Users() {
  const {
    isLoading,
    users,
    companiesOptions,
    selectedCompany,
    handleCompanyChange,
    selectedRole,
    setSelectedRole,
    searchTerm,
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
    handleTryAgain,
  } = useUsers();

  const { user } = useAppContext();

  const hasUsers = users?.length !== 0 && !!users;
  const filteredListLength = filteredUsers?.length ?? 0;
  const searchNotFound = filteredListLength === 0 && hasUsers;
  const isListEmpty = !hasError && (!isLoading && users.length === 0);

  return (
    <>
      <OpacityAnimation>
        <Header title='Usuários' detail={`Gerencie os usuários com acesso ao sistema`} />

        <Loader isLoading={isLoading} />

        {hasUsers && (
          <>
            {user?.role === 'admin' && (
              <>
                <Filters
                  companiesOptions={companiesOptions}
                  selectedCompany={selectedCompany}
                  handleCompanyChange={handleCompanyChange}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />

                <SearchAtPage
                  searchTerm={searchTerm}
                  onChangeSearchTerm={handleChangeSearchTerm}
                  singularLabel="usuário"
                />
            </>
            )}
          </>
        )}

        <ListHeader
          doesListExists={hasUsers}
          hasError={hasError}
          filteredListLength={filteredListLength}
          singularLabel="usuário"
          pluralLabel="usuários"
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
        />

        {hasUsers && (
          <List
            filteredList={filteredUsers}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
        )}

        <DeleteUserModal
          userBeingDeleted={userBeingDeleted}
          setDeleteModalShow={setDeleteModalShow}
          deleteUser={deleteUser}
          deleteModalShow={deleteModalShow}
        />

        {searchNotFound && (
          <NoData
            icon="searchNotFound"
            label={(
              <>
                Nenhum resultado foi encontrado para
                {' '}
                <strong>{searchTerm || '" "'}</strong>
              </>
            )}
          />
        )}

        {hasError && (
          <NoData
            icon="sad"
            label={(
              <>
                Ocorreu um erro ao obter a lista dos usuários.
                <button type="button" onClick={handleTryAgain}>Tentar Novamente</button>
                .
              </>
            )}
          />
        )}

        {isListEmpty && (
          <NoData
            icon="emptyBox"
            label={(
              <>
                Não há nenhum usuário, baixe o app para cadastrar.
              </>
            )}
          />
        )}
      </OpacityAnimation>
    </>
  );
}

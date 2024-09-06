import { Header } from "../../components/Header";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import OpacityAnimation from "../../components/OpacityAnimation";
import SearchAtPage from "../../components/SearchAtPage";
import DeleteCompanyModal from "./components/DeleteCompanyModal";
import List from "./components/List";
import ListHeader from "./components/ListHeader";
import useCompanies from "./useCompanies";

export default function Companies() {
  const {
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
    handleTryAgain,
  } = useCompanies();

  const hasCompanies = companies?.length !== 0 && !!companies;
  const filteredListLength = filteredCompanies?.length ?? 0;
  const searchNotFound = filteredListLength === 0 && hasCompanies;
  const isListEmpty = !hasError && (!isLoading && companies.length === 0);

  return (
    <>
      <OpacityAnimation>
        <Header title='Empresas' detail={`Visualize e gerencie as empresas (clientes)`} />

        <Loader isLoading={isLoading} />

        {hasCompanies && (
          <SearchAtPage
            searchTerm={searchTerm}
            onChangeSearchTerm={handleChangeSearchTerm}
            singularLabel="empresa (por nome ou CNPJ)"
          />
        )}

        <ListHeader
          doesListExists={hasCompanies}
          hasError={hasError}
          filteredListLength={filteredListLength}
          singularLabel="empresa"
          pluralLabel="empresas"
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
        />

        {hasCompanies && (
          <List
            filteredList={filteredCompanies}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
        )}

        <DeleteCompanyModal
          companyBeingDeleted={companyBeingDeleted}
          setDeleteModalShow={setDeleteModalShow}
          deleteCompany={deleteCompany}
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
                Ocorreu um erro ao obter a lista de empresas.
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
                Não há nenhuma empresa cadastrada. Clique no botão <br /> <strong>Nova Empresa</strong> <br /> acima para cadastrar sua primeira!
              </>
            )}
          />
        )}
      </OpacityAnimation>
    </>
  );
}

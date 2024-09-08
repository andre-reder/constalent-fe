import { Header } from "../../components/Header";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import OpacityAnimation from "../../components/OpacityAnimation";
import SearchAtPage from "../../components/SearchAtPage";
import DeleteVacancyModal from "./components/DeleteVacancyModal";
import Filters from "./components/Filters";
import List from "./components/List";
import ListHeader from "./components/ListHeader";
import useVacancies from "./useVacancies";

export default function Vacancies() {
  const {
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
    handleTryAgain,
  } = useVacancies();

  const hasVacancies = vacancies?.length !== 0 && !!vacancies;
  const filteredListLength = filteredVacancies?.length ?? 0;
  const searchNotFound = filteredListLength === 0 && hasVacancies;
  const isListEmpty = !hasError && (!isLoading && vacancies.length === 0);

  return (
    <>
      <OpacityAnimation>
        <Header title='Vagas' detail={`Visualize e gerencie suas vagas`} />

        <Loader isLoading={isLoading} />

        {hasVacancies && (
          <>
            <Filters
              operatingModel={operatingModel}
              setOperatingModel={setOperatingModel}
              operatingModelOptions={operatingModelOptions}
              contractType={contractType}
              setContractType={setContractType}
              contractTypeOptions={contractTypeOptions}
              vacancyLevel={vacancyLevel}
              setVacancyLevel={setVacancyLevel}
              vacancyLevelOptions={vacancyLevelOptions}
              educationLevel={educationLevel}
              setEducationLevel={setEducationLevel}
              educationLevelOptions={educationLevelOptions}
              status={status}
              setStatus={setStatus}
              statusOptions={statusOptions}
              company={company}
              setCompany={setCompany}
              companyOptions={companyOptions}
            />

            <SearchAtPage
              searchTerm={searchTerm}
              onChangeSearchTerm={handleChangeSearchTerm}
              singularLabel="vaga"
            />
          </>
        )}

        <ListHeader
          doesListExists={hasVacancies}
          hasError={hasError}
          filteredListLength={filteredListLength}
          singularLabel="vaga"
          pluralLabel="vagas"
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
        />

        {hasVacancies && (
          <List
            filteredList={filteredVacancies}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
        )}

        <DeleteVacancyModal
          vacancyBeingDeleted={vacancyBeingDeleted}
          setDeleteModalShow={setDeleteModalShow}
          deleteVacancy={deleteVacancy}
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
                Ocorreu um erro ao obter a lista de vagas.
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
                Não há nenhuma vaga cadastrada. Clique no botão <br /> <strong>Nova vaga</strong> <br /> acima para cadastrar dua primeira!
              </>
            )}
          />
        )}
      </OpacityAnimation>
    </>
  );
}

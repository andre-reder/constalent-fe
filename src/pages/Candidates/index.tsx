import { Header } from "../../components/Header";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import OpacityAnimation from "../../components/OpacityAnimation";
import SearchAtPage from "../../components/SearchAtPage";
import DeleteCandidateModal from "./components/DeleteCandidateModal";
import Filters from "./components/Filters";
import List from "./components/List";
import ListHeader from "./components/ListHeader";
import useCandidates from "./useCandidates";

export default function Candidates() {
  const {
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
    handleTryAgain,
  } = useCandidates();

  const hasCandidates = candidates?.length !== 0 && !!candidates;
  const filteredListLength = filteredCandidates?.length ?? 0;
  const searchNotFound = filteredListLength === 0 && hasCandidates;
  const isListEmpty = !hasError && (!isLoading && candidates.length === 0);

  return (
    <>
      <OpacityAnimation>
        <Header title='Candidatos' detail={`Visualize e gerencie candidatos`} />

        <Loader isLoading={isLoading} />

        {hasCandidates && (
          <>
            <Filters
              gender={gender}
              setGender={setGender}
              selectedEducationLevel={selectedEducationLevel}
              handleSelectedEducationLevelChange={handleSelectedEducationLevelChange}
              educationLevelOptions={educationLevelOptions}
              selectedGraduationCourse={selectedGraduationCourse}
              handleSelectedGraduationCourseChange={handleSelectedGraduationCourseChange}
              graduationCourseOptions={graduationCourseOptions}
              selectedStatus={selectedStatus}
              handleSelectedStatusChange={handleSelectedStatusChange}
              statusOptions={statusOptions}
            />

            <SearchAtPage
              searchTerm={searchTerm}
              onChangeSearchTerm={handleChangeSearchTerm}
              singularLabel="candidato"
            />
          </>
        )}

        <ListHeader
          doesListExists={hasCandidates}
          hasError={hasError}
          filteredListLength={filteredListLength}
          singularLabel="candidato"
          pluralLabel="candidatos"
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
        />

        {hasCandidates && (
          <List
            filteredList={filteredCandidates}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
        )}

        <DeleteCandidateModal
          candidateBeingDeleted={candidateBeingDeleted}
          setDeleteModalShow={setDeleteModalShow}
          deleteCandidate={deleteCandidate}
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
                Ocorreu um erro ao obter a lista de candidatos.
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
                Não há nenhum candidato cadastrado. Clique no botão <br /> <strong>Novo Candidato</strong> <br /> acima para cadastrar seu primeiro!
              </>
            )}
          />
        )}
      </OpacityAnimation>
    </>
  );
}

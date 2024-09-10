import { Header } from "../../components/Header";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import OpacityAnimation from "../../components/OpacityAnimation";
import SearchAtPage from "../../components/SearchAtPage";
import DeleteInterviewModal from "./components/DeleteInterviewModal";
import Filters from "./components/Filters";
import List from "./components/List";
import ListHeader from "./components/ListHeader";
import useInterviews from "./useInterviews";

export default function Interviews() {
  const {
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
    vacancyOptions,
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
  } = useInterviews();

  const hasInterviews = interviews?.length !== 0 && !!interviews;
  const filteredListLength = filteredInterviews?.length ?? 0;
  const searchNotFound = filteredListLength === 0 && hasInterviews;
  const isListEmpty = !hasError && (!isLoading && interviews.length === 0);

  return (
    <>
      <OpacityAnimation>
        <Header title='Entrevistas' detail={`Visualize e gerencie as entrevistas com recrutador e com empresa`} />

        <Loader isLoading={isLoading} />

        {hasInterviews && (
          <>
            <Filters
              interviewType={interviewType}
              setInterviewType={setInterviewType}
              interviewTypeOptions={interviewTypeOptions}
              interviewStatus={interviewStatus}
              setInterviewStatus={setInterviewStatus}
              interviewStatusOptions={interviewStatusOptions}
              vacancy={vacancy}
              handleVacancyChange={handleVacancyChange}
              vacancyOptions={vacancyOptions}
              company={company}
              handleCompanyChange={handleCompanyChange}
              companyOptions={companyOptions}
            />

            <SearchAtPage
              searchTerm={searchTerm}
              onChangeSearchTerm={handleChangeSearchTerm}
              singularLabel="entrevista por nome do candidato"
            />
          </>
        )}

        <ListHeader
          doesListExists={hasInterviews}
          hasError={hasError}
          filteredListLength={filteredListLength}
          singularLabel="entrevista"
          pluralLabel="entrevistas"
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
        />

        {hasInterviews && (
          <List
            filteredList={filteredInterviews}
            onOpenDeleteModal={handleOpenDeleteModal}
          />
        )}

        <DeleteInterviewModal
          interviewBeingDeleted={interviewBeingDeleted}
          setDeleteModalShow={setDeleteModalShow}
          deleteInterview={deleteInterview}
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
                Ocorreu um erro ao obter a lista de entrevistas.
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
                Não há nenhuma entrevista cadastrada. Clique no botão <br /> <strong>Nova entrevista</strong> <br /> acima para cadastrar sua primeira!
              </>
            )}
          />
        )}
      </OpacityAnimation>
    </>
  );
}

import { Header } from "../../components/Header";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import OpacityAnimation from "../../components/OpacityAnimation";
import CandidatesDocsModal from "./components/CandidatesDocsModal";
import ChangeSalaryModal from "./components/ChangeSalaryModal";
import ChangeStatusModal from "./components/ChangeStatusmodal";
import Filters from "./components/Filters";
import InterviewsDetailsModal from "./components/InterviewsDetailsModal";
import List from "./components/List";
import ListHeader from "./components/ListHeader";
import useApplications from "./useApplications";

export default function Applications() {
  const {
    isLoading,
    applications,
    selectedStatus,
    handleSelectedStatusChange,
    statusOptions,
    selectedCompany,
    handleSelectedCompanyChange,
    companyOptions,
    selectedVacancy,
    handleSelectedVacancyChange,
    vacancyOptions,
    selectedCandidate,
    handleSelectedCandidateChange,
    candidateOptions,
    hasError,
    filteredApplications,
    handlePageChange,
    pagesQuantity,
    currentPage,
    handleTryAgain,
    applicationBeingUpdated,
    handleOpenChangeStatusModal,
    handleOpenChangeSalaryModal,
    changeStatusModalShow,
    changeStatus,
    newStatus,
    setNewStatus,
    changeSalaryModalShow,
    changeSalary,
    handleFinalSalaryChange,
    canChangeSalary,
    finalSalary,
    setChangeStatusModalShow,
    setChangeSalaryModalShow,
    onOpenInterviewDetailsModal,
    applicationBeingViewedInterviews,
    interviewsDetails,
    interviewDetailsModalShow,
    setInterviewDetailsModalShow,
    onOpenCandidatesDocsModal,
    applicationBeingViewedCandidatesDocs,
    candidatesDocsModalShow,
    setCandidatesDocsModalShow,
    candidatesDocs,
  } = useApplications();

  const hasApplications = applications?.length !== 0 && !!applications;
  const filteredListLength = filteredApplications?.length ?? 0;
  const searchNotFound = filteredListLength === 0 && hasApplications;
  const isListEmpty = !hasError && (!isLoading && applications.length === 0);

  return (
    <>
      <OpacityAnimation>
        <Header title='Aplicações' detail={`Visualize e acompanhe o status das aplicações às vagas.`} />

        <Loader isLoading={isLoading} />

        {hasApplications && (
          <>
            <Filters
              selectedCompany={selectedCompany}
              handleSelectedCompanyChange={handleSelectedCompanyChange}
              companyOptions={companyOptions}
              selectedVacancy={selectedVacancy}
              handleSelectedVacancyChange={handleSelectedVacancyChange}
              vacancyOptions={vacancyOptions}
              selectedCandidate={selectedCandidate}
              handleSelectedCandidateChange={handleSelectedCandidateChange}
              candidateOptions={candidateOptions}
              selectedStatus={selectedStatus}
              handleSelectedStatusChange={handleSelectedStatusChange}
              statusOptions={statusOptions}
            />
          </>
        )}

        <ListHeader
          doesListExists={hasApplications}
          hasError={hasError}
          filteredListLength={filteredListLength}
          singularLabel="aplicação"
          pluralLabel="aplicações"
          onPageChange={handlePageChange}
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
        />

        {hasApplications && (
          <List
            filteredList={filteredApplications}
            onOpenChangeStatusModal={handleOpenChangeStatusModal}
            onOpenChangeSalaryModal={handleOpenChangeSalaryModal}
            onOpenInterviewDetailsModal={onOpenInterviewDetailsModal}
            onOpenCandidatesDocsModal={onOpenCandidatesDocsModal}
          />
        )}

        <ChangeStatusModal
          changeStatusModalShow={changeStatusModalShow}
          setChangeStatusModalShow={setChangeStatusModalShow}
          changeStatus={changeStatus}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          appplicationBeingUpdated={applicationBeingUpdated}
        />

        <ChangeSalaryModal
          applicationBeingUpdated={applicationBeingUpdated}
          changeSalaryModalShow={changeSalaryModalShow}
          changeSalary={changeSalary}
          handleFinalSalaryChange={handleFinalSalaryChange}
          canChangeSalary={canChangeSalary}
          finalSalary={finalSalary}
          setChangeSalaryModalShow={setChangeSalaryModalShow}
        />

        <InterviewsDetailsModal
          applicationBeingViewedInterviews={applicationBeingViewedInterviews}
          interviewsDetails={interviewsDetails}
          interviewDetailsModalShow={interviewDetailsModalShow}
          setInterviewDetailsModalShow={setInterviewDetailsModalShow}
        />

        <CandidatesDocsModal
            applicationBeingViewedCandidatesDocs={applicationBeingViewedCandidatesDocs}
            candidatesDocs={candidatesDocs}
            candidatesDocsModalShow={candidatesDocsModalShow}
            setCandidatesDocsModalShow={setCandidatesDocsModalShow}
        />

        {searchNotFound && (
          <NoData
            icon="searchNotFound"
            label={(
              <>
                Nenhum resultado foi encontrado conforme filtros selecionados
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

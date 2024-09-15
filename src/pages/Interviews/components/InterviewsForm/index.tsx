import { Col, Container, Row } from "react-bootstrap";
import Button from '../../../../components/Button';
import { ButtonContainer } from "../../../../components/Form";
import Loader from "../../../../components/Loader";
import ReturnHeader from "../../../../components/ReturnHeader";
import ConclusionCard from "./components/ConclusionCard";
import GeneralDataCard from "./components/GeneralDataCard";
import useInterviewsForm from "./useInterviewsForm";

export default function InterviewsForm({ isEdit }: { isEdit: boolean }) {
  const {
    company,
    companyOptions,
    handleCompanyChange,
    vacancy,
    vacancyOptions,
    handleVacancyChange,
    candidate,
    candidateOptions,
    handleCandidateChange,
    date,
    handleDateChange,
    type,
    setType,
    details,
    handleDetailsChange,
    aiSummary,
    handleAiSummaryChange,
    status,
    setStatus,
    isLoading,
    interviewBeingEditted,
    isFormValid,
    addInterview,
    updateInterview,
    finalSalary,
    handleFinalSalaryChange,
  } = useInterviewsForm({ isEdit });

  return (
    <>
      <Loader isLoading={isLoading} />
      <ReturnHeader
        title={isEdit ? `Editar Entrevista de ${interviewBeingEditted?.candidate?.name} para ${interviewBeingEditted?.vacancy?.title}` : `Adicionar Entrevista`}
        link="/interviews?active=Interviews"
      />

      <Container>
        <Row xs={1} md={1} lg={1}>
          <Col>
            <GeneralDataCard
              company={company}
              companyOptions={companyOptions}
              handleCompanyChange={handleCompanyChange}
              vacancy={vacancy}
              vacancyOptions={vacancyOptions}
              handleVacancyChange={handleVacancyChange}
              candidate={candidate}
              candidateOptions={candidateOptions}
              handleCandidateChange={handleCandidateChange}
              date={date}
              handleDateChange={handleDateChange}
              type={type}
              setType={setType}
              isEdit={isEdit}
            />
          </Col>

          <Col>
            <ConclusionCard
              details={details}
              handleDetailsChange={handleDetailsChange}
              aiSummary={aiSummary}
              handleAiSummaryChange={handleAiSummaryChange}
              status={status}
              setStatus={setStatus}
              type={type}
              finalSalary={finalSalary}
              handleFinalSalaryChange={handleFinalSalaryChange}
            />
          </Col>
        </Row>

        <ButtonContainer>
          {!isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => addInterview()}
            >
              {`Adicionar Entrevista`}
            </Button>
          )}

          {isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => updateInterview()}
            >
              {`Salvar Alterações`}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    </>
  )
}

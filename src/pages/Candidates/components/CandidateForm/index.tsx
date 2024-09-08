import { Col, Container, Row } from "react-bootstrap";
import Button from '../../../../components/Button';
import { ButtonContainer } from "../../../../components/Form";
import Loader from "../../../../components/Loader";
import ReturnHeader from "../../../../components/ReturnHeader";
import AddressDataCard from "./components/AddressDataCard";
import ContactDataCard from "./components/ContactDataCard";
import FilesCard from "./components/FilesCard";
import GeneralDataCard from "./components/GeneralDataCard";
import ProfessionalInfoCard from "./components/ProfessionalInfoCard";
import useCandidateForm from "./useCandidateForm";

interface ICandidateForm {
  isEdit: boolean;
}

export default function CandidateForm({ isEdit = false }: ICandidateForm) {
  const {
    isLoading,
    isFormValid,
    candidateBeingEditted,
    addCandidate,
    updateCandidate,
    getErrorMessageByFieldName,
    cpf,
    handleCpfChange,
    rg,
    handleRgChange,
    birthDate,
    handleBirthDateChange,
    gender,
    handleGenderChange,
    candidateName,
    handleCandidateNameChange,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    maritalStatus,
    handleMaritalStatusChange,
    maritalStatusOptions,
    childrenAmount,
    handleChildrenAmountChange,
    cep,
    handleCepChange,
    streetName,
    streetNumber,
    handleStreetNumberChange,
    district,
    city,
    uf,
    isGettingCepInfo,
    linkedin,
    handleLinkedinChange,
    salaryExpected,
    handleSalaryExpectedChange,
    lastSalary,
    handleLastSalaryChange,
    lastCompany,
    handleLastCompanyChange,
    lastPosition,
    handleLastPositionChange,
    handleResumeUpload,
    handleRemoveResume,
    resumeFileName,
    handlePsycologicalTestUpload,
    handleRemovePsycologicalTest,
    psycologicalTestFileName,
    handleCandidatesFormUpload,
    handleRemoveCandidatesForm,
    candidatesFormFileName,
    downloadResume,
    downloadPsycologicalTest,
    downloadCandidatesForm,
    educationLevel,
    handleGraduationCourseChange,
    graduationCourse,
    educationLevelOptions,
    handleEducationLevelChange,
  } = useCandidateForm({ isEdit });

  return (
    <>
      <Loader isLoading={isLoading} />
      <ReturnHeader
        title={isEdit ? `Editar Candidato ${candidateBeingEditted.name}` : `Adicionar Candidato`}
        link="/candidates?active=Candidates"
      />

      <Container>
        <Row xs={1} md={1} lg={1}>
          <Col>
            <GeneralDataCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              cpf={cpf}
              handleCpfChange={handleCpfChange}
              rg={rg}
              handleRgChange={handleRgChange}
              candidateName={candidateName}
              handleCandidateNameChange={handleCandidateNameChange}
              birthDate={birthDate}
              handleBirthDateChange={handleBirthDateChange}
              gender={gender}
              handleGenderChange={handleGenderChange}
              maritalStatus={maritalStatus}
              handleMaritalStatusChange={handleMaritalStatusChange}
              childrenAmount={childrenAmount}
              handleChildrenAmountChange={handleChildrenAmountChange}
              maritalStatusOptions={maritalStatusOptions}
              educationLevel={educationLevel}
              handleGraduationCourseChange={handleGraduationCourseChange}
              graduationCourse={graduationCourse}
              educationLevelOptions={educationLevelOptions}
              handleEducationLevelChange={handleEducationLevelChange}
              isEdit={isEdit}
            />
          </Col>
        </Row>

        <Row xs={1} md={1} lg={1}>
          <Col>
            <AddressDataCard
              cep={cep}
              handleCepChange={handleCepChange}
              streetName={streetName}
              streetNumber={streetNumber}
              handleStreetNumberChange={handleStreetNumberChange}
              district={district}
              city={city}
              uf={uf}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              isGettingCepInfo={isGettingCepInfo}
            />
          </Col>
        </Row>

        <Row xs={1} md={1} lg={2}>
          <Col>
            <ContactDataCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              phone={phone}
              handlePhoneChange={handlePhoneChange}
              email={email}
              handleEmailChange={handleEmailChange}
              linkedin={linkedin}
              handleLinkedinChange={handleLinkedinChange}
            />
          </Col>
          <Col>
            <ProfessionalInfoCard
              salaryExpected={salaryExpected}
              handleSalaryExpectedChange={handleSalaryExpectedChange}
              lastSalary={lastSalary}
              handleLastSalaryChange={handleLastSalaryChange}
              lastCompany={lastCompany}
              handleLastCompanyChange={handleLastCompanyChange}
              lastPosition={lastPosition}
              handleLastPositionChange={handleLastPositionChange}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
            />
          </Col>
        </Row>

        <Row xs={1} md={1} lg={1}>
          <Col>
            <FilesCard
              handleResumeUpload={handleResumeUpload}
              handleRemoveResume={handleRemoveResume}
              resumeFileName={resumeFileName}
              handlePsycologicalTestUpload={handlePsycologicalTestUpload}
              removePsycologicalTest={handleRemovePsycologicalTest}
              psycologicalTestFileName={psycologicalTestFileName}
              handleCandidatesFormUpload={handleCandidatesFormUpload}
              handleRemoveCandidatesForm={handleRemoveCandidatesForm}
              candidatesFormFileName={candidatesFormFileName}
              downloadResume={downloadResume}
              downloadPsycologicalTest={downloadPsycologicalTest}
              downloadCandidatesForm={downloadCandidatesForm}
            />
          </Col>
        </Row>

        <ButtonContainer>
          {!isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => addCandidate()}
            >
              {`Adicionar Candidato`}
            </Button>
          )}

          {isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => updateCandidate()}
            >
              {`Salvar Alterações`}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    </>
  )
}

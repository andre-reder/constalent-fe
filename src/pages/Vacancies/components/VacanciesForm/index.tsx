import { Col, Container, Row } from "react-bootstrap";
import Button from '../../../../components/Button';
import { ButtonContainer } from "../../../../components/Form";
import Loader from "../../../../components/Loader";
import ReturnHeader from "../../../../components/ReturnHeader";
import { useAppContext } from "../../../../contexts/auth";
import GeneralDataCard from "./components/GeneralDataCard";
import RecruiterFillCard from "./components/RecruiterFillCard";
import RequirementsCard from "./components/RequirementsCard";
import ResponsibleCard from "./components/ResponsibleCard";
import SalaryBenefitsCard from "./components/SalaryBenefitsCard";
import SuggestionsMeetingDatesCard from "./components/SuggestionsMeetingDatesCard";
import useVacancyForm from "./useVacanciesForm";

interface IVacanciesForm {
  isEdit: boolean;
}

export default function VacanciesForm({ isEdit = false }: IVacanciesForm) {
  const {
    isLoading,
    isFormValid,
    vacancyBeingEditted,
    addVacancy,
    updateVacancy,
    getErrorMessageByFieldName,
    title,
    department,
    locationCep,
    operatingModel,
    contractType,
    description,
    additionalInfo,
    level,
    minSalary,
    maxSalary,
    hasVariableComissions,
    responsibleName,
    responsiblePhone,
    responsibleEmail,
    reasonForOpening,
    isSecret,
    vacanciesAmount,
    subordinatesAmount,
    workingSchedule,
    needsTravel,
    needsExtraHours,
    minAge,
    maxAge,
    gender,
    educationLevel,
    benefits,
    otherBenefits,
    minExperience,
    desirableExperience,
    necessaryRequirements,
    desirableRequirements,
    willApplicantBeTested,
    alignmentMeetingDate,
    suggestionsOfAlignmentMeetingDates,
    isReposition,
    status,
    company,
    handleTitleChange,
    handleDepartmentChange,
    levelOptions,
    handleLevelChange,
    handleLocationCepChange,
    operatingModelOptions,
    handleOperatingModelChange,
    contractTypeOptions,
    handleContractTypeChange,
    handleIsSecret,
    handleVacanciesAmountChange,
    handleSubordinatesAmountChange,
    handleWorkingScheduleChange,
    handleDescriptionChange,
    handleAdditionalInfoChange,
    handleReasonForOpeningChange,
    handleMinSalaryChange,
    handleMaxSalaryChange,
    benefitsOptions,
    handleBenefitsChange,
    handleOtherBenefitsChange,
    handleHasVariableComissions,
    handleResponsibleNameChange,
    handleResponsiblePhoneChange,
    handleResponsibleEmailChange,
    handleNeedsTravelChange,
    handleNeedsExtraHoursChange,
    handleMinAgeChange,
    handleMaxAgeChange,
    handleGenderChange,
    educationLevelOptions,
    handleEducationLevelChange,
    handleMinExperienceChange,
    handleDesirableExperienceChange,
    handleNecessaryRequirementsChange,
    handleDesirableRequirementsChange,
    handleWillApplicantBeTestedChange,
    handleSuggestionsOfAlignmentMeetingDatesChange,
    handleAlignmentMeetingDateChange,
    handleIsRepositionChange,
    handleStatusChange,
    handleCompanyChange,
    statusOptions,
    companyOptions,
  } = useVacancyForm({ isEdit });

  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  return (
    <>
      <Loader isLoading={isLoading} />
      <ReturnHeader
        title={isEdit ? `Editar Vaga ${vacancyBeingEditted.title}` : `Adicionar Vaga`}
        link="/vacancies?active=Vacancies"
      />

      <Container>
        <Row xs={1} md={1} lg={1}>
          <Col>
            <GeneralDataCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              isEdit={isEdit}
              title={title}
              handleTitleChange={handleTitleChange}
              department={department}
              handleDepartmentChange={handleDepartmentChange}
              level={level}
              levelOptions={levelOptions}
              handleLevelChange={handleLevelChange}
              locationCep={locationCep}
              handleLocationCepChange={handleLocationCepChange}
              operatingModel={operatingModel}
              operatingModelOptions={operatingModelOptions}
              handleOperatingModelChange={handleOperatingModelChange}
              contractType={contractType}
              contractTypeOptions={contractTypeOptions}
              handleContractTypeChange={handleContractTypeChange}
              isSecret={isSecret}
              handleIsSecret={handleIsSecret}
              vacanciesAmount={vacanciesAmount}
              handleVacanciesAmountChange={handleVacanciesAmountChange}
              subordinatesAmount={subordinatesAmount}
              handleSubordinatesAmountChange={handleSubordinatesAmountChange}
              workingSchedule={workingSchedule}
              handleWorkingScheduleChange={handleWorkingScheduleChange}
              description={description}
              handleDescriptionChange={handleDescriptionChange}
              additionalInfo={additionalInfo}
              handleAdditionalInfoChange={handleAdditionalInfoChange}
              reasonForOpening={reasonForOpening}
              handleReasonForOpeningChange={handleReasonForOpeningChange}
            />
          </Col>
        </Row>

        <Row xs={1} md={1} lg={2}>
          <Col>
            <SalaryBenefitsCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              isEdit={isEdit}
              minSalary={minSalary}
              maxSalary={maxSalary}
              benefits={benefits}
              otherBenefits={otherBenefits}
              hasVariableComissions={hasVariableComissions}
              handleMinSalaryChange={handleMinSalaryChange}
              handleMaxSalaryChange={handleMaxSalaryChange}
              benefitsOptions={benefitsOptions}
              handleBenefitsChange={handleBenefitsChange}
              handleOtherBenefitsChange={handleOtherBenefitsChange}
              handleHasVariableComissions={handleHasVariableComissions}
            />
          </Col>

          <Col>
            <ResponsibleCard
              responsibleName={responsibleName}
              handleResponsibleNameChange={handleResponsibleNameChange}
              responsiblePhone={responsiblePhone}
              handleResponsiblePhoneChange={handleResponsiblePhoneChange}
              responsibleEmail={responsibleEmail}
              handleResponsibleEmailChange={handleResponsibleEmailChange}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              isEdit={isEdit}
            />
          </Col>
        </Row>

        <Row xs={1} md={1} lg={1}>
          <Col>
            <RequirementsCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              isEdit={isEdit}
              needsTravel={needsTravel}
              handleNeedsTravelChange={handleNeedsTravelChange}
              needsExtraHours={needsExtraHours}
              handleNeedsExtraHoursChange={handleNeedsExtraHoursChange}
              minAge={minAge}
              handleMinAgeChange={handleMinAgeChange}
              maxAge={maxAge}
              handleMaxAgeChange={handleMaxAgeChange}
              gender={gender}
              handleGenderChange={handleGenderChange}
              educationLevel={educationLevel}
              educationLevelOptions={educationLevelOptions}
              handleEducationLevelChange={handleEducationLevelChange}
              minExperience={minExperience}
              handleMinExperienceChange={handleMinExperienceChange}
              desirableExperience={desirableExperience}
              handleDesirableExperienceChange={handleDesirableExperienceChange}
              necessaryRequirements={necessaryRequirements}
              handleNecessaryRequirementsChange={handleNecessaryRequirementsChange}
              desirableRequirements={desirableRequirements}
              handleDesirableRequirementsChange={handleDesirableRequirementsChange}
              willApplicantBeTested={willApplicantBeTested}
              handleWillApplicantBeTestedChange={handleWillApplicantBeTestedChange}
            />
          </Col>
        </Row>

        <Row xs={1} md={1} lg={1}>
          <Col>
            <SuggestionsMeetingDatesCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              isEdit={isEdit}
              suggestionsOfAlignmentMeetingDates={suggestionsOfAlignmentMeetingDates}
              handleSuggestionsOfAlignmentMeetingDatesChange={handleSuggestionsOfAlignmentMeetingDatesChange}
            />
          </Col>
        </Row>

        {!isCustomer && (
          <Row xs={1} md={1} lg={1}>
            <Col>
              <RecruiterFillCard
                getErrorMessageByFieldName={getErrorMessageByFieldName}
                isEdit={isEdit}
                alignmentMeetingDate={alignmentMeetingDate}
                handleAlignmentMeetingDateChange={handleAlignmentMeetingDateChange}
                isReposition={isReposition}
                handleIsRepositionChange={handleIsRepositionChange}
                status={status}
                handleStatusChange={handleStatusChange}
                company={company}
                handleCompanyChange={handleCompanyChange}
                statusOptions={statusOptions}
                companyOptions={companyOptions}
              />
            </Col>
          </Row>
        )}

        <ButtonContainer>
          {!isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => addVacancy()}
            >
              {`Adicionar Vaga`}
            </Button>
          )}

          {isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => updateVacancy()}
            >
              {`Salvar Alterações`}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    </>
  )
}

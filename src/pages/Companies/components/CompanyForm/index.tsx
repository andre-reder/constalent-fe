import { Col, Container, Row } from "react-bootstrap";
import Button from '../../../../components/Button';
import { ButtonContainer } from "../../../../components/Form";
import Loader from "../../../../components/Loader";
import ReturnHeader from "../../../../components/ReturnHeader";
import AddressDataCard from "./components/AddressDataCard";
import ComercialDataCard from "./components/ComercialDataCard";
import ContactDataCard from "./components/ContactDataCard";
import GeneralDataCard from "./components/GeneralDataCard";
import UserLoginCard from "./components/UserLoginCard";
import useCompanyForm from "./useCompanyForm";

interface ICompanyForm {
  isEdit: boolean;
}

export default function CompanyForm({ isEdit = false }: ICompanyForm) {
  const {
    isLoading,
    isFormValid,
    companyBeingEditted,
    addCompany,
    updateCompany,
    getErrorMessageByFieldName,
    cnpj,
    handleCnpjChange,
    companyName,
    handleCompanyNameChange,
    fantasyName,
    handleFantasyNameChange,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    contactName,
    handleContactNameChange,
    contactRole,
    handleContactRoleChange,
    cep,
    handleCepChange,
    streetName,
    streetNumber,
    handleStreetNumberChange,
    district,
    city,
    uf,
    isGettingCepInfo,
    minComission,
    handleMinComissionChange,
    maxComission,
    handleMaxComissionChange,
    comissionPercentage,
    handleComissionPercentageChange,
    loginEmail,
    handleLoginEmailChange,
    password,
    handlePasswordChange,
    passwordConfirmation,
    handlePasswordConfirmationChange,
  } = useCompanyForm({ isEdit });

  return (
    <>
      <Loader isLoading={isLoading} />
      <ReturnHeader
        title={isEdit ? `Editar Empresa ${companyBeingEditted.name}` : `Adicionar Empresa`}
        link="/companies?active=Companies"
      />

      <Container>
        <Row xs={1} md={1} lg={2}>
          <Col>
            <GeneralDataCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              cnpj={cnpj}
              handleCnpjChange={handleCnpjChange}
              companyName={companyName}
              handleCompanyNameChange={handleCompanyNameChange}
              fantasyName={fantasyName}
              handleFantasyNameChange={handleFantasyNameChange}
              isEdit={isEdit}
            />
          </Col>
          <Col>
            <ContactDataCard
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              contactName={contactName}
              handleContactNameChange={handleContactNameChange}
              phone={phone}
              handlePhoneChange={handlePhoneChange}
              email={email}
              handleEmailChange={handleEmailChange}
              contactRole={contactRole}
              handleContactRoleChange={handleContactRoleChange}
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
            <ComercialDataCard
              minComission={minComission}
              handleMinComissionChange={handleMinComissionChange}
              maxComission={maxComission}
              handleMaxComissionChange={handleMaxComissionChange}
              comissionPercentage={comissionPercentage}
              handleComissionPercentageChange={handleComissionPercentageChange}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
            />
          </Col>
          <Col>
            <UserLoginCard
              loginEmail={loginEmail}
              handleLoginEmailChange={handleLoginEmailChange}
              password={password}
              handlePasswordChange={handlePasswordChange}
              passwordConfirmation={passwordConfirmation}
              handlePasswordConfirmationChange={handlePasswordConfirmationChange}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              isEdit={isEdit}
            />
          </Col>
        </Row>

        <ButtonContainer>
          {!isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => addCompany()}
            >
              {`Adicionar Usuário`}
            </Button>
          )}

          {isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => updateCompany()}
            >
              {`Salvar Alterações`}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    </>
  )
}

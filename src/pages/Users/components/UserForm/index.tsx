import { Col, Container, Row } from "react-bootstrap";
import Button from '../../../../components/Button';
import { ButtonContainer } from "../../../../components/Form";
import Loader from "../../../../components/Loader";
import ReturnHeader from "../../../../components/ReturnHeader";
import GeneralDataCard from "./components/GeneralDataCard";
import useUserForm from "./useUserForm";

interface IUserForm {
  isEdit: boolean;
}

export default function UserForm({ isEdit = false }: IUserForm) {
  const {
    isLoading,
    isFormValid,
    userBeingEditted,
    userName,
    handleNameChange,
    email,
    handleEmailChange,
    selectedCompany,
    handleSelectedCompanyChange,
    role,
    setRole,
    addUser,
    updateUser,
    getErrorMessageByFieldName,
    handlePasswordChange,
    password,
    handlePasswordConfirmationChange,
    passwordConfirmation,
    companyOptions,
  } = useUserForm({ isEdit });

  return (
    <>
      <Loader isLoading={isLoading} />
      <ReturnHeader
        title={isEdit ? `Editar Usuário ${userBeingEditted.name}` : `Adicionar Usuário`}
        link="/users?active=Users"
      />

      <Container>
        <Row xs={1} md={1} lg={1}>
          <Col>
            <GeneralDataCard
              userName={userName}
              handleNameChange={handleNameChange}
              email={email}
              handleEmailChange={handleEmailChange}
              selectedCompany={selectedCompany}
              handleSelectedCompanyChange={handleSelectedCompanyChange}
              role={role}
              setRole={setRole}
              getErrorMessageByFieldName={getErrorMessageByFieldName}
              handlePasswordChange={handlePasswordChange}
              password={password}
              handlePasswordConfirmationChange={handlePasswordConfirmationChange}
              passwordConfirmation={passwordConfirmation}
              isEdit={isEdit}
              companyOptions={companyOptions}
            />
          </Col>
        </Row>

        <ButtonContainer>
          {!isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => addUser()}
            >
              {`Adicionar Usuário`}
            </Button>
          )}

          {isEdit && (
            <Button
              disabled={!isFormValid}
              onClick={() => updateUser()}
            >
              {`Salvar Alterações`}
            </Button>
          )}
        </ButtonContainer>
      </Container>
    </>
  )
}

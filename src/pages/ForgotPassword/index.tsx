import { Link } from 'react-router-dom';
import forgotPassword from '../../assets/images/icons/forgotPassword.svg';
import logo from '../../assets/images/icons/logo.svg';
import Button from '../../components/Button';
import { ButtonContainer } from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import { Container } from './styles';

import Loader from '../../components/Loader';
import Transitions from '../../components/Transition';
import useForgotPassword from './useForgoutPassword';

export default function ForgotPassword() {
  const {
    isLoading,
    getErrorMessageByFieldName,
    email,
    handleEmailChange,
    resetPassword,
    isReadyToResetPassword,
  } = useForgotPassword();

  return (
    <Transitions>
      <Loader isLoading={isLoading} />
      <Container>
        <div className="asideGif">
          <img src={forgotPassword} alt="busGif" />
        </div>

        <div className="asideLogin">
          <div className="loginTitle">
            <div className="labelTitle">
              <div>
                Alteração de senha
              </div>
              <div className="subtitle">
                Informe seu e-mail de acesso para alterar sua senha
              </div>
            </div>
            <img src={logo} alt="logo" className="logo" />
          </div>

          <div className="loginForm">
            <div className="loginInput">
              <FormGroup error={getErrorMessageByFieldName('email')}>
                <label htmlFor="login">E-mail</label>
                <Input
                  placeholder="teste@email.com"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="new-password"
                  error={getErrorMessageByFieldName('email')}
                />
              </FormGroup>
            </div>
          </div>

          <ButtonContainer flexDirection="column">
            <Button type="button" onClick={resetPassword} disabled={!isReadyToResetPassword}>
              Enviar e-mail para alteração de senha
            </Button>
            <div className="backToLogin">
              <Link to="/">Realizar login</Link>
            </div>
          </ButtonContainer>
        </div>
      </Container>
    </Transitions>
  );
}

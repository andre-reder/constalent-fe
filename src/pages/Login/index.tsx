import { Link } from 'react-router-dom';
import login from '../../assets/images/icons/login.svg';
import logo from '../../assets/images/icons/logo.svg';
import {
  LoginContainer,
} from './styles';

import Button from '../../components/Button';
import { ButtonContainer } from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import PasswordInputFormGroup from '../../components/PasswordInputFormGroup';
import useLogin from './useLogin';

export default function Login() {
  const {
    isLoading,
    getErrorMessageByFieldName,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    handleLogin,
    isReadyToLogin,
  } = useLogin();

  return (
    <>
      <Loader isLoading={isLoading} />
      <LoginContainer>
        <div className="asideGif">
          <img src={login} alt="busGif" />
        </div>

        <div className="asideLogin">
          <div className="loginTitle">
            <div className="labelTitle">
              <div>
                Bem-vindo à Constalent!
              </div>
              <div className="subtitle">
                Realize abaixo seu login para acessar o sistema.
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

            <div className="passwordInput">
              <PasswordInputFormGroup
                label='Senha'
                onChange={handlePasswordChange}
                value={password}
                error={getErrorMessageByFieldName('password')}
              />
            </div>
          </div>

          <ButtonContainer flexDirection="column">
            <Button type="button" onClick={handleLogin} disabled={!isReadyToLogin}>
              Acessar
            </Button>
            <div className="forgotPassword">
              <Link to="/forgot">Esqueci minha senha</Link>
            </div>
          </ButtonContainer>
        </div>
      </LoginContainer>
    </>
  );
}

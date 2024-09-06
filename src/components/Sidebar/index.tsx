import { Link } from 'react-router-dom';
import application from '../../assets/images/icons/application.svg';
import briefcase from '../../assets/images/icons/briefcase.svg';
import chat from '../../assets/images/icons/chat.svg';
import company from '../../assets/images/icons/company.svg';
import home from '../../assets/images/icons/home.svg';
import logo from '../../assets/images/icons/logo.svg';
import off from '../../assets/images/icons/off.svg';
import userCircle from '../../assets/images/icons/userCircle.svg';
import users from '../../assets/images/icons/users.svg';
import { useAppContext } from '../../contexts/auth';

import { Container, EndingElements, LogoText, NavItem, NavItemsContainer } from './styles';

interface SidebarProps {
  active?: string | null;
}

export function Sidebar({ active }: SidebarProps) {
  const { signOut } = useAppContext();
  return (
    <Container>
      <LogoText>
        <img src={logo} alt="" className='logo' />
      </LogoText>

      <NavItemsContainer>
        <Link to='/?active=Home'>
          <NavItem active={active === 'Home' || !active}>
            <img src={home} alt="" />
            <span>Home</span>
            {active === 'Home' && (
              <strong>__</strong>
            )}
          </NavItem>
        </Link>

        <Link to='/vacancies?active=Vacancies'>
          <NavItem active={active === 'Vacancies'}>
            <img src={briefcase} alt="" />
            <span>Vagas</span>
            {active === 'Vacancies' && (
              <strong>__</strong>
            )}
          </NavItem>
        </Link>

        <Link to='/candidates?active=Candidates'>
          <NavItem active={active === 'Candidates'}>
            <img src={users} alt="" />
            <span>Candidatos</span>
            {active === 'Candidates' && (
              <strong>__</strong>
            )}
          </NavItem>
        </Link>

        <Link to='/applications?active=Applications'>
          <NavItem active={active === 'Applications'}>
            <img src={application} alt="" />
            <span>Aplicações</span>
            {active === 'Applications' && (
              <strong>__</strong>
            )}
          </NavItem>
        </Link>

        <Link to='/interviews?active=Interviews'>
          <NavItem active={active === 'Interviews'}>
            <img src={chat} alt="" />
            <span>Entrevistas</span>
            {active === 'Interviews' && (
              <strong>__</strong>
            )}
          </NavItem>
        </Link>

        <Link to='/users?active=Users'>
          <NavItem active={active === 'Users'}>
            <img src={userCircle} alt="" />
            <span>Usuários</span>
            {active === 'Users' && (
              <strong>__</strong>
            )}
          </NavItem>
        </Link>

        <Link to='/companies?active=Companies'>
          <NavItem active={active === 'Companies'}>
            <img src={company} alt="" />
            <span>Empresas</span>
            {active === 'Companies' && (
              <strong>__</strong>
            )}
          </NavItem>
        </Link>
      </NavItemsContainer>

      <EndingElements>
        <NavItem active={false} onClick={() => signOut()}>
          <img src={off} alt="" />
          <span>Sair</span>
        </NavItem>
      </EndingElements>
    </Container>
  );
}

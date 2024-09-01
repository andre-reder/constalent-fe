import { FC } from 'react';
import application from '../../assets/images/icons/application.svg';
import briefcase from '../../assets/images/icons/briefcase.svg';
import chat from '../../assets/images/icons/chat.svg';
import company from '../../assets/images/icons/company.svg';
import home from '../../assets/images/icons/home.svg';
import profile from '../../assets/images/icons/profile.svg';
import userCircle from '../../assets/images/icons/userCircle.svg';
import users from '../../assets/images/icons/users.svg';
import { Container, Detail, Title } from './styles';

interface HeaderProps {
  title: keyof typeof iconsLiterals;
  detail: string;
}

const iconsLiterals = {
  Home: home,
  Vagas: briefcase,
  Candidatos: users,
  Entrevistas: chat,
  Aplicações: application,
  Usuários: userCircle,
  Empresas: company,
  Perfil: profile,
};

export const Header: FC<HeaderProps> = ({ title, detail }) => {
  const Icon = iconsLiterals[title];

  return (
    <Container>
      <Title>
        <img src={Icon} alt="icon" />
        <span>{title}</span>
      </Title>

      <Detail>
        <span>{detail}</span>
      </Detail>
    </Container>
  );
};

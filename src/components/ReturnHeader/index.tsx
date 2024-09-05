import { Link } from 'react-router-dom';

import arrow from '../../assets/images/icons/arrow.svg';
import { Container } from './styles';

interface PageHeaderInterface {
  title: string;
  link?: string;
}

export default function ReturnHeader({ title, link }: PageHeaderInterface) {
  return (
    <Container>
      {link && (
      <Link to={link}>
        <img src={arrow} alt="back" className="primaryColor" />
        <span>Voltar</span>
      </Link>
      )}
      <h1>{title}</h1>
    </Container>
  );
}

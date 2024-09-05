import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import edit from '../../../assets/images/icons/edit.svg';
import trash from '../../../assets/images/icons/trash.svg';
import { Card } from '../../../components/Card';
import OpacityAnimation from '../../../components/OpacityAnimation';
import { UsersType } from '../types';

interface ListInterface {
  filteredList: UsersType[];
  onOpenDeleteModal: (user: UsersType) => void;
}

export default function List({
  filteredList,
  onOpenDeleteModal,
}: ListInterface) {
  const smallTagColorByRoleLiterals: { [key: string]: string } = {
    admin: 'green',
    customer: 'orange',
  };

  const labelByRoleLiterals: { [key: string]: string } = {
    admin: 'Administrador',
    customer: 'Cliente',
  };

  return (
    <Container>
      <Row xs={1} md={2} lg={2}>
        {filteredList?.map((user) => (
          <Col key={user.id}>
            <OpacityAnimation delay={0.1}>
              <Card title="Expandir detalhes">
                <div className="info">
                  <div className="card-title">
                    <strong>{user.name}</strong>
                    <small className={smallTagColorByRoleLiterals[user.role]}>{labelByRoleLiterals[user.role]}</small>
                  </div>
                  <span>
                    E-mail:
                    {' '}
                    {user.email || 'Não informado'}
                  </span>
                  <span>
                    Empresa:
                    {' '}
                    {user.company?.name || 'Sem Empresa'}
                  </span>
                </div>
                <div className="actions">
                  <Link to={`/users/${user.id}?active=Users`}>
                    <img src={edit} alt="" title={`Editar usuário ${user.name}`} />
                  </Link>
                    <button
                      type="button"
                      onClick={() => onOpenDeleteModal(user)}
                    >
                      <img src={trash} alt="" title={`Remover usuário ${user.name}`} />
                    </button>
                </div>
              </Card>
            </OpacityAnimation>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

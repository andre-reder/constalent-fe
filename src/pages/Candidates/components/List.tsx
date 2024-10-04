import { differenceInYears } from 'date-fns';
import { ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import edit from '../../../assets/images/icons/edit.svg';
import trash from '../../../assets/images/icons/trash.svg';
import { Card } from '../../../components/Card';
import OpacityAnimation from '../../../components/OpacityAnimation';
import { useAppContext } from '../../../contexts/auth';
import { CandidateType } from '../types';

interface ListInterface {
  filteredList: CandidateType[];
  onOpenDeleteModal: (candidate: CandidateType) => void;
}

export default function List({
  filteredList,
  onOpenDeleteModal,
}: ListInterface) {
  const smallTagRenderByStatusLiterals: { [key: string]: ReactNode } = {
    'stored': <small>Disponível</small>,
    'applied': <small className='orange'>Em Aplicação</small>,
    'hired': <small className='green'>Contratado</small>,
  }

  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  return (
    <Container>
      <Row xs={1} md={2} lg={2}>
        {filteredList?.map((candidate) => (
          <Col key={candidate.id}>
            <OpacityAnimation delay={0.1}>
              <Card title="Expandir detalhes">
                <div className="info">
                  <div className="card-title">
                    <strong>{candidate.name}</strong>
                    {smallTagRenderByStatusLiterals[candidate.status]}
                  </div>

                  <span>
                    E-mail:
                    {' '}
                    {candidate.email || 'Não informado'}
                  </span>
                  <span>
                    Celular:
                    {' '}
                    {candidate.phone || 'Não informado'}
                  </span>
                  <span>
                    Idade:
                    {' '}
                    {differenceInYears(candidate.birthDate, new Date()) || 'Não informado'}
                  </span>
                  <span>
                    Curso:
                    {' '}
                    {candidate.graduationCourse || 'Não informado'}
                  </span>
                  <span>
                    Cidade:
                    {' '}
                    {candidate.city || 'Não informado'}
                  </span>
                </div>
                <div className="actions">
                  <Link to={`/candidates/${candidate.id}?active=Candidates`}>
                    <img src={edit} alt="" title={`Editar empresa ${candidate.name}`} />
                  </Link>
                  {!isCustomer && (
                    <button
                      type="button"
                      onClick={() => onOpenDeleteModal(candidate)}
                    >
                      <img src={trash} alt="" title={`Remover empresa ${candidate.name}`} />
                    </button>
                  )}
                </div>
              </Card>
            </OpacityAnimation>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

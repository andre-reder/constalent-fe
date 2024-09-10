import { format } from 'date-fns';
import { ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import edit from '../../../assets/images/icons/edit.svg';
import trash from '../../../assets/images/icons/trash.svg';
import { Card } from '../../../components/Card';
import OpacityAnimation from '../../../components/OpacityAnimation';
import { useAppContext } from '../../../contexts/auth';
import { InterviewType } from '../types';

interface ListInterface {
  filteredList: InterviewType[];
  onOpenDeleteModal: (interview: InterviewType) => void;
}

export default function List({
  filteredList,
  onOpenDeleteModal,
}: ListInterface) {
  const smallTagRenderByStatusLiterals: { [key: string]: ReactNode } = {
    'scheduled': <small>Agendada</small>,
    'canceled': <small className='orange'>Cancelada</small>,
    'approved': <small className='green'>Aprovada</small>,
    'rejected': <small className='red'>Rejeitada</small>,
  }

  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  return (
    <Container>
      <Row xs={1} md={2} lg={2}>
        {filteredList?.map((interview) => (
          <Col key={interview.id}>
            <OpacityAnimation delay={0.1}>
              <Card title="Expandir detalhes">
                <div className="info">
                  <div className="card-title">
                    <strong>{interview.candidate.name}</strong>
                    {smallTagRenderByStatusLiterals[interview.status]}
                  </div>

                  <span>
                    Vaga:
                    {' '}
                    {interview.vacancy.title}
                  </span>

                  <span>
                    Data:
                    {' '}
                    {format(new Date(interview.date), 'dd/MM/yyyy') || 'Não informado'}
                  </span>

                  <span>
                    Tipo:
                    {' '}
                    {interview.type === 'recruiter' ? 'Recrutador' : 'Empresa'}
                  </span>
                </div>
                <div className="actions">
                  {(!isCustomer || interview.type === 'company') && (
                    <>
                      <Link to={`/interviews/${interview.id}?active=Interviews`}>
                        <img src={edit} alt="" title={`Editar entrevista de ${interview.candidate.name}`} />
                      </Link>
                        <button
                          type="button"
                          onClick={() => onOpenDeleteModal(interview)}
                        >
                          <img src={trash} alt="" title={`Remover entrevista de ${interview.candidate.name}`} />
                        </button>
                    </>
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

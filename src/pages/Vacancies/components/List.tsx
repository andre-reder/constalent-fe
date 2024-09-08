import { format } from 'date-fns';
import { ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import edit from '../../../assets/images/icons/edit.svg';
import trash from '../../../assets/images/icons/trash.svg';
import { Card } from '../../../components/Card';
import OpacityAnimation from '../../../components/OpacityAnimation';
import floatToCurrency from '../../../utils/floatToCurrency';
import { VacancyType } from '../types';

interface ListInterface {
  filteredList: VacancyType[];
  onOpenDeleteModal: (vacancy: VacancyType) => void;
}

export default function List({
  filteredList,
  onOpenDeleteModal,
}: ListInterface) {
  const smallTagRenderByStatusLiterals: { [key: string]: ReactNode } = {
    'waiting': <small className='gray'>Em Espera</small>,
    'open': <small className='green'>Aberta</small>,
    'canceled': <small className='orange'>Cancelada</small>,
    'finished': <small>Finalizada</small>,
  }

  return (
    <Container>
      <Row xs={1} md={2} lg={2}>
        {filteredList?.map((vacancy) => (
          <Col key={vacancy.id}>
            <OpacityAnimation delay={0.1}>
              <Card title="Expandir detalhes">
                <div className="info">
                  <div className="card-title">
                    <strong>{vacancy.title}</strong>
                    {smallTagRenderByStatusLiterals[vacancy.status]}
                  </div>

                  <span>
                    Salário:
                    {' '}
                    De {floatToCurrency(vacancy.minSalary)} à {floatToCurrency(vacancy.maxSalary)}
                  </span>

                  <span>
                    Vagas:
                    {' '}
                    {vacancy.vacanciesAmount || 'Não informado'}
                  </span>

                  <span>
                    Aberta em:
                    {' '}
                    {format(new Date(vacancy.createdAt), 'dd/MM/yyyy') || 'Não informado'}
                  </span>

                  {vacancy.canceledAt && vacancy.status === 'canceled' && (
                    <span>
                      Cancelada em:
                      {' '}
                      {format(new Date(vacancy.canceledAt), 'dd/MM/yyyy') || 'Não informado'}
                    </span>
                  )}

                  {vacancy.finishedAt && vacancy.status === 'finished' && (
                    <span>
                      Finalizada em:
                      {' '}
                      {format(new Date(vacancy.finishedAt), 'dd/MM/yyyy') || 'Não informado'}
                    </span>
                  )}
                </div>
                <div className="actions">
                  <Link to={`/vacancies/${vacancy.id}?active=Vacancies`}>
                    <img src={edit} alt="" title={`Editar vaga ${vacancy.title}`} />
                  </Link>
                    <button
                      type="button"
                      onClick={() => onOpenDeleteModal(vacancy)}
                    >
                      <img src={trash} alt="" title={`Remover vaga ${vacancy.title}`} />
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

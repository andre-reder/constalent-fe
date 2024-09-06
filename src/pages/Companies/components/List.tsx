import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import edit from '../../../assets/images/icons/edit.svg';
import trash from '../../../assets/images/icons/trash.svg';
import { Card } from '../../../components/Card';
import OpacityAnimation from '../../../components/OpacityAnimation';
import { CompanyType } from '../types';

interface ListInterface {
  filteredList: CompanyType[];
  onOpenDeleteModal: (company: CompanyType) => void;
}

export default function List({
  filteredList,
  onOpenDeleteModal,
}: ListInterface) {
  return (
    <Container>
      <Row xs={1} md={2} lg={2}>
        {filteredList?.map((company) => (
          <Col key={company.id}>
            <OpacityAnimation delay={0.1}>
              <Card title="Expandir detalhes">
                <div className="info">
                  <div className="card-title">
                    <strong>{company.name}</strong>
                  </div>
                  <span>
                    CNPJ:
                    {' '}
                    {company.cnpj || 'Não informado'}
                  </span>
                  <span>
                    E-mail:
                    {' '}
                    {company.email || 'Não informado'}
                  </span>
                  <span>
                    Telefone:
                    {' '}
                    {company.phone || 'Não informado'}
                  </span>
                  <span>
                    Contato:
                    {' '}
                    {company.contactName || 'Não informado'}
                  </span>
                  <span>
                    Cargo:
                    {' '}
                    {company.contactRole || 'Não informado'}
                  </span>
                </div>
                <div className="actions">
                  <Link to={`/companies/${company.id}?active=Companies`}>
                    <img src={edit} alt="" title={`Editar empresa ${company.name}`} />
                  </Link>
                    <button
                      type="button"
                      onClick={() => onOpenDeleteModal(company)}
                    >
                      <img src={trash} alt="" title={`Remover empresa ${company.name}`} />
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

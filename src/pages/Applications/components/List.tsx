import { format } from 'date-fns';
import { ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import edit from '../../../assets/images/icons/edit.svg';
import fileDownload from '../../../assets/images/icons/fileDownload.svg';
import interview from '../../../assets/images/icons/interview.svg';
import money from '../../../assets/images/icons/money.svg';
import { Card } from '../../../components/Card';
import OpacityAnimation from '../../../components/OpacityAnimation';
import floatToCurrency from '../../../utils/floatToCurrency';
import { ApplicationType } from '../types';

interface ListInterface {
  filteredList: ApplicationType[];
  onOpenChangeStatusModal: (application: ApplicationType) => void;
  onOpenChangeSalaryModal: (application: ApplicationType) => void;
  onOpenInterviewDetailsModal: (application: ApplicationType) => void;
  onOpenCandidatesDocsModal: (application: ApplicationType) => void;
}

export default function List({
  filteredList,
  onOpenChangeStatusModal,
  onOpenChangeSalaryModal,
  onOpenInterviewDetailsModal,
  onOpenCandidatesDocsModal,
}: ListInterface) {
  const smallTagRenderByStatusLiterals: { [key: string]: ReactNode } = {
    'waiting': <small>Aguardando</small>,
    'notContinued': <small className='orange'>Não Continuado</small>,
    'rejectedByRecruiter': <small className='red'>Reprovado Recrutamento</small>,
    'approvedByRecruiter': <small className='green'>Aprovado Recrutamento</small>,
    'rejectedByCompany': <small className='red'>Reprovado Empresa</small>,
    'approvedByCompany': <small className='green'>Aprovado Empresa</small>,
  };

  return (
    <Container>
      <Row xs={1} md={1} lg={1}>
        {filteredList?.map((application) => (
          <Col key={application.id}>
            <OpacityAnimation delay={0.1}>
              <Card>
                <div className="info">
                  <div className="card-title">
                    <strong>{application.vacancy.title} - {application.candidate.name}</strong>
                    {smallTagRenderByStatusLiterals[application.status]}
                  </div>

                  <span>
                    Data:
                    {' '}
                    {format(new Date(application.date), 'dd/MM/yyyy')}
                  </span>
                  <span>
                    Salário Final:
                    {' '}
                    {floatToCurrency(application.finalSalary) || 'Não informado'}
                  </span>
                  <span>
                    Comissão Recrutamento:
                    {' '}
                    {floatToCurrency(application.recruiterComission) || 'Não informado'}
                  </span>
                  <span>
                    {application.hiredAt ? `Data Contratação: ${format(new Date(application.hiredAt), 'dd/MM/yyyy')}` : 'Ainda não contratado'}
                  </span>
                </div>
                <div className="actions">
                    <button
                      type="button"
                      onClick={() => onOpenChangeStatusModal(application)}
                    >
                      <img src={edit} alt="" title={`Alterar Status da Aplicação`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenChangeSalaryModal(application)}
                    >
                      <img src={money} alt="" title={`Alterar Salário Final Acordado`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenInterviewDetailsModal(application)}
                    >
                      <img src={interview} alt="" title={`Visualizar detalhes das entrevistas realizadas`} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenCandidatesDocsModal(application)}
                    >
                      <img src={fileDownload} alt="" title={`Baixar documentos do candidato`} />
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

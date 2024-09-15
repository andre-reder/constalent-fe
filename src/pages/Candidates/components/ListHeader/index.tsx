import { Link } from 'react-router-dom';
import OpacityAnimation from '../../../../components/OpacityAnimation';
import Pagination from '../../../../components/Pagination';
import { useAppContext } from '../../../../contexts/auth';
import { Header } from './styles';

interface ListHeaderInterface {
  doesListExists: boolean;
  hasError: boolean;
  filteredListLength: number;
  singularLabel: string;
  pluralLabel: string;
  pagesQuantity: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ListHeader({
  doesListExists,
  hasError,
  filteredListLength,
  singularLabel,
  pluralLabel,
  pagesQuantity,
  currentPage,
  onPageChange,
}: ListHeaderInterface) {
  const { user } = useAppContext();
  const isCustomer = user?.role === 'customer';

  return (
    <OpacityAnimation delay={0.1}>
      <Header doesListExists={doesListExists} apiFetched={!hasError}>
        {(doesListExists) && (
          <>
            <div className="leftAlignment">
              <strong>
                {filteredListLength}
                {' '}
                {filteredListLength === 1 ? singularLabel : pluralLabel}
              </strong>
              <Pagination
                pagesQuantity={pagesQuantity}
                handlePageChange={onPageChange}
                currentPage={currentPage}
              />
            </div>

          </>
        )}
        {!isCustomer && (
          <div className="actionButtons">
            <Link to='/candidates/new?active=Candidates'>
              Novo Candidato
            </Link>
          </div>
        )}
      </Header>
    </OpacityAnimation>
  );
}

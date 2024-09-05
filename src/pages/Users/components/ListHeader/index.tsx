import { Link } from 'react-router-dom';
import OpacityAnimation from '../../../../components/OpacityAnimation';
import Pagination from '../../../../components/Pagination';
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

            <div className="actionButtons">
              <Link to='/users/new?active=Users'>
                Novo Usuário
              </Link>
            </div>
          </>
        )}
      </Header>
    </OpacityAnimation>
  );
}

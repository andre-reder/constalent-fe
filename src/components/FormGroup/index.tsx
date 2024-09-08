import { ReactNode } from 'react';
import Spinner from '../Spinner';
import { Container } from './styles';

export interface FormGroupInterface {
  children: ReactNode;
  error?: string | null;
  isLoading?: boolean;
  aside?: boolean;
  marginTop?: number;
}

export default function FormGroup({
  children, error, isLoading, aside, marginTop
}: FormGroupInterface) {
  return (
    <Container isAside={aside} marginTop={marginTop}>
      <div className="form-item">
        { children }

        {isLoading && (
          <div className="loader">
            <Spinner size={14} />
          </div>
        )}
      </div>
      { error && <small>{error}</small> }
    </Container>
  );
}

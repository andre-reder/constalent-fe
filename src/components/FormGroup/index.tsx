import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { Container } from './styles';
import { ReactNode } from 'react';

export interface FormGroupInterface {
  children: ReactNode;
  error?: string | null;
  isLoading?: boolean;
}

export default function FormGroup({
  children, error, isLoading,
}: FormGroupInterface) {
  return (
    <Container>
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

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  aside: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: null,
  isLoading: false,
  aside: false,
};

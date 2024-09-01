import PropTypes from 'prop-types';

import { StyledSpinner } from './styles';

interface SpinnerInterface {
  size: number;
}

export default function Spinner({ size }: SpinnerInterface) {
  return (
    <StyledSpinner size={size} />
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 32,
};

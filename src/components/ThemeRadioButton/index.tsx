import PropTypes from 'prop-types';
import { SecondaryButton } from './styles';
import { ReactNode } from 'react';

interface ThemeRadioButtonInterface {
  children: ReactNode;
  onClick: () => void;
  selected: boolean;
}

export default function ThemeRadioButton({
  children, onClick, selected,
}: ThemeRadioButtonInterface) {
  return (
    <SecondaryButton
      onClick={onClick}
      selected={selected}
    >
      {children}
    </SecondaryButton>
  );
}

ThemeRadioButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

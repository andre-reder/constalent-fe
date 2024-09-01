import { FilterRadioButtonInterface } from './interface';
import { SecondaryButton } from './styles';

export default function FilterRadioButton({
  children, onClick, selected, invisible, sameWidth, nowrap, smallText, disabled
}: FilterRadioButtonInterface) {
  return (
    <SecondaryButton
      onClick={onClick}
      selected={selected}
      invisible={invisible}
      sameWidth={sameWidth}
      nowrap={nowrap}
      smallText={smallText}
      disabled={disabled}
    >
      {children}
    </SecondaryButton>
  );
}

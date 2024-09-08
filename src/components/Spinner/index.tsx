import { StyledSpinner } from './styles';

interface SpinnerInterface {
  size: number;
}

export default function Spinner({ size = 32 }: SpinnerInterface) {
  return (
    <StyledSpinner size={size} />
  );
}

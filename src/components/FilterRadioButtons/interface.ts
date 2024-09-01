import { ReactNode } from 'react';

export interface FilterRadioButtonInterface {
  children: ReactNode;
  onClick: () => void;
  selected: boolean;
  invisible?: boolean;
  sameWidth?: boolean;
  nowrap?: boolean;
  smallText?: boolean;
  disabled?: boolean;
}

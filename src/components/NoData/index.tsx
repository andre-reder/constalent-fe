import { NoDataContainer } from './styles';
import emptyBox from '../../assets/images/icons/emptyBox.svg';
import sad from '../../assets/images/icons/sad.svg';
import searchNotFound from '../../assets/images/icons/searchNotFound.svg';
import { ReactNode } from 'react';

interface NoDataInterface {
  icon: string;
  label: ReactNode;
}

export default function NoData({ icon, label }: NoDataInterface) {
  return (
    <NoDataContainer>
      {icon === 'emptyBox' && (
        <img src={emptyBox} alt="emptyBox" />
      )}
      {icon === 'sad' && (
        <img src={sad} alt="emptyBox" />
      )}
      {icon === 'searchNotFound' && (
        <img src={searchNotFound} alt="emptyBox" />
      )}
      <span>{label}</span>
    </NoDataContainer>
  );
}

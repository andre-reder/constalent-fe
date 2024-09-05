import { ChangeEvent } from 'react';
import OpacityAnimation from '../OpacityAnimation';
import {
  InputSearchContainer, SearchContainer,
} from './styles';

interface SearchInterface {
  searchTerm: string;
  onChangeSearchTerm: (event: ChangeEvent<HTMLInputElement>) => void;
  singularLabel?: string;
}

export default function SearchAtPage({
  searchTerm,
  onChangeSearchTerm,
  singularLabel,
}: SearchInterface) {

  return (
    <OpacityAnimation delay={0.1}>
      <SearchContainer>
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder={`Pesquisar ${singularLabel ?? ''}`}
            onChange={onChangeSearchTerm}
          />
        </InputSearchContainer>
      </SearchContainer>
    </OpacityAnimation>
  );
}

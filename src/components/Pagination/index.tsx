import { SecondaryButton, PaginationContainer } from './styles';

interface PagesInterface {
  pagesQuantity: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
}

export default function Pages({
  pagesQuantity,
  handlePageChange,
  currentPage,
}: PagesInterface) {
  if (pagesQuantity <= 1) {
    return null;
  }
  const buttonsLabelArray = [];
  for (let i = 0; i < pagesQuantity; i++) {
    buttonsLabelArray.push(i + 1);
  }
  return (
    <PaginationContainer>
      {buttonsLabelArray.map((buttonLabel) => (
        <SecondaryButton
          key={buttonLabel}
          selected={currentPage == buttonLabel - 1}
          disabled={currentPage == buttonLabel - 1}
          onClick={() => {
            handlePageChange(Number(buttonLabel) - 1);
          }}
        >
          {buttonLabel}
        </SecondaryButton>
      ))}
    </PaginationContainer>
  );
}

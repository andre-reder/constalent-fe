import { ChangeEvent, useRef } from 'react';
import arrow from '../../assets/images/icons/arrow.svg';
import Button from '../Button';
import Input from '../Input';
import { SecondaryButton } from '../SecondaryButton';
import { ButtonsContainer, ChosenFileContainer, FileInputContainer, StepsContainer } from './styles';

interface FileInputInterface {
  onFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonLabel?: string;
  isSubmitButtonDisabled?: boolean;
  fileNameChoosed: string;
  onSubmitFile?: () => void;
  acceptedFiles: string;
  hasSubmitAction?: boolean;
  removeFile?: () => void;
  downloadFile?: () => void;
}

export default function FileInput({
  onFileUpload,
  buttonLabel,
  isSubmitButtonDisabled,
  fileNameChoosed,
  onSubmitFile,
  acceptedFiles,
  hasSubmitAction = true,
  removeFile,
  downloadFile,
}: FileInputInterface) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  return (
    <>
      <StepsContainer justifyContent={hasSubmitAction ? 'space-around' : 'flex-start'}>
        <FileInputContainer>
          <ButtonsContainer>
            <Button small={!hasSubmitAction} type="button" className="file" onClick={handleClick} width='unset'>
              {fileNameChoosed ? 'Alterar Arquivo' : 'Escolher Arquivo'}
            </Button>
            {removeFile && fileNameChoosed && (
              <SecondaryButton small={!hasSubmitAction} onClick={() => removeFile()}>
                Remover arquivo
              </SecondaryButton>
            )}
            {downloadFile && fileNameChoosed && (
              <SecondaryButton small={!hasSubmitAction} onClick={() => downloadFile()}>
                Visualizar arquivo
              </SecondaryButton>
            )}
          </ButtonsContainer>
          <Input
            type="file"
            style={{ display: 'none' }}
            ref={hiddenFileInput}
            onChange={onFileUpload}
            accept={acceptedFiles}
            autoComplete="new-password"
          />
        </FileInputContainer>

        {hasSubmitAction && (
          <>
            <img src={arrow} className="rightArrow" alt="rightArrow" />

            <Button small={!hasSubmitAction} type="button" disabled={isSubmitButtonDisabled} onClick={onSubmitFile}>
              {buttonLabel}
            </Button>
          </>
        )}

      </StepsContainer>
      <ChosenFileContainer>
        <small className="fileSmall">{`Arquivo escolhido: ${fileNameChoosed}`}</small>
      </ChosenFileContainer>
    </>
  );
}

import { ChangeEvent } from 'react';
import FileInput from '../../../../../components/FileInput';
import { Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';

interface IFilesCard {
  handleResumeUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveResume: () => void;
  resumeFileName: string;
  handlePsycologicalTestUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  removePsycologicalTest: () => void;
  psycologicalTestFileName: string;
  handleCandidatesFormUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveCandidatesForm: () => void;
  candidatesFormFileName: string;
}

export default function FilesCard({
  handleResumeUpload,
  handleRemoveResume,
  resumeFileName,
  handlePsycologicalTestUpload,
  removePsycologicalTest,
  psycologicalTestFileName,
  handleCandidatesFormUpload,
  handleRemoveCandidatesForm,
  candidatesFormFileName,
}: IFilesCard) {
  return (
    <StyledContainer>
      <div className="card-title">
        Arquivos
      </div>

        <FormGroup>
          <label htmlFor="login">Currículo *</label>
          <FileInput
              onFileUpload={handleResumeUpload}
              fileNameChoosed={resumeFileName}
              acceptedFiles=".pdf, .doc, .docx"
              hasSubmitAction={false}
              removeFile={handleRemoveResume}
            />
        </FormGroup>

        <FormGroup>
          <label htmlFor="login">Teste Psicológico</label>
          <FileInput
              onFileUpload={handlePsycologicalTestUpload}
              fileNameChoosed={psycologicalTestFileName}
              acceptedFiles=".pdf, .doc, .docx"
              hasSubmitAction={false}
              removeFile={removePsycologicalTest}
            />
        </FormGroup>

        <FormGroup>
          <label htmlFor="login">Ficha Cadastral</label>
          <FileInput
              onFileUpload={handleCandidatesFormUpload}
              fileNameChoosed={candidatesFormFileName}
              acceptedFiles=".pdf, .doc, .docx"
              hasSubmitAction={false}
              removeFile={handleRemoveCandidatesForm}
            />
        </FormGroup>
    </StyledContainer>
  );
}

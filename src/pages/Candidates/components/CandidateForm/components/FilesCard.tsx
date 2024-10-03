import { ChangeEvent } from 'react';
import FileInput from '../../../../../components/FileInput';
import { Container as StyledContainer } from '../../../../../components/Form';
import FormGroup from '../../../../../components/FormGroup';

interface IFilesCard {
  handleResumeUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveResume: () => void;
  handlePortfolioUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemovePortfolio: () => void;
  isPortfolioFile: boolean;
  resumeFileName: string;
  portfolioFileName: string;
  handlePsycologicalTestUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  removePsycologicalTest: () => void;
  psycologicalTestFileName: string;
  handleCandidatesFormUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveCandidatesForm: () => void;
  candidatesFormFileName: string;
  downloadResume?: () => void;
  downloadPsycologicalTest?: () => void;
  downloadCandidatesForm?: () => void;
  downloadPortfolio?: () => void;
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
  downloadResume,
  downloadPsycologicalTest,
  downloadCandidatesForm,
  portfolioFileName,
  downloadPortfolio,
  handlePortfolioUpload,
  handleRemovePortfolio,
  isPortfolioFile,
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
              acceptedFiles=".pdf, .doc, .docx, .xls, .xlsx, .csv"
              hasSubmitAction={false}
              removeFile={handleRemoveResume}
              downloadFile={downloadResume}
            />
        </FormGroup>

        <FormGroup>
          <label htmlFor="login">Teste Psicológico</label>
          <FileInput
              onFileUpload={handlePsycologicalTestUpload}
              fileNameChoosed={psycologicalTestFileName}
              acceptedFiles=".pdf, .doc, .docx, .xls, .xlsx, .csv"
              hasSubmitAction={false}
              removeFile={removePsycologicalTest}
              downloadFile={downloadPsycologicalTest}
            />
        </FormGroup>

        <FormGroup>
          <label htmlFor="login">Ficha Cadastral</label>
          <FileInput
              onFileUpload={handleCandidatesFormUpload}
              fileNameChoosed={candidatesFormFileName}
              acceptedFiles=".pdf, .doc, .docx, .xls, .xlsx, .csv"
              hasSubmitAction={false}
              removeFile={handleRemoveCandidatesForm}
              downloadFile={downloadCandidatesForm}
            />
        </FormGroup>

        {isPortfolioFile && (
          <FormGroup>
            <label htmlFor="login">Portifólio</label>
            <FileInput
                onFileUpload={handlePortfolioUpload}
                fileNameChoosed={portfolioFileName}
                acceptedFiles=".pdf, .doc, .docx, .xls, .xlsx, .csv"
                hasSubmitAction={false}
                removeFile={handleRemovePortfolio}
                downloadFile={downloadPortfolio}
              />
          </FormGroup>
        )}
    </StyledContainer>
  );
}

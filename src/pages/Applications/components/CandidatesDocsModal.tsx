import { Dispatch, SetStateAction, useRef } from "react";
import { Link } from "react-router-dom";
import MyModal from "../../../components/Modal";
import { SecondaryButton } from "../../../components/SecondaryButton";
import { ApplicationType, CandidatesDocsType } from "../types";

interface ICandidatesDocsModal {
  applicationBeingViewedCandidatesDocs: ApplicationType;
  candidatesDocs: CandidatesDocsType;
  candidatesDocsModalShow: boolean;
  setCandidatesDocsModalShow: Dispatch<SetStateAction<boolean>>;
}

export default function CandidatesDocsModal({
  applicationBeingViewedCandidatesDocs,
  candidatesDocs,
  candidatesDocsModalShow,
  setCandidatesDocsModalShow,
}: ICandidatesDocsModal) {
  const downloadResumeRef = useRef<HTMLAnchorElement | null>(null);
  const downloadCandidatesFormRef = useRef<HTMLAnchorElement | null>(null);
  const downloadPsycologicalTestRef = useRef<HTMLAnchorElement | null>(null);


  return (
    <MyModal
      title={`Arquivos de ${applicationBeingViewedCandidatesDocs?.candidate?.name}`}
      closeButtonLabel="Cancelar"
      actionButtonLabel="Alterar"
      modalBody={(
        <>
          <Link
            to={candidatesDocs.resume}
            target="_blank"
            download
            style={{ display: 'none' }}
            ref={downloadResumeRef}
          />
          <SecondaryButton onClick={() => { downloadResumeRef.current!.click();}}>
            ⬇️ Currículo
          </SecondaryButton>

        {candidatesDocs.candidatesForm && (
          <>
            <Link
              to={candidatesDocs.candidatesForm}
              target="_blank"
              download
              style={{ display: 'none' }}
              ref={downloadCandidatesFormRef}
            />
            <SecondaryButton onClick={() => { downloadCandidatesFormRef.current!.click();}}>
              ⬇️ Ficha Cadastral Candidato
            </SecondaryButton>
          </>
        )}

        {candidatesDocs.psycologicalTest && (
          <>
            <Link
              to={candidatesDocs.psycologicalTest}
              target="_blank"
              download
              style={{ display: 'none' }}
              ref={downloadPsycologicalTestRef}
            />
            <SecondaryButton onClick={() => { downloadPsycologicalTestRef.current!.click();}}>
              ⬇️ Teste Psicológico
            </SecondaryButton>
          </>
        )}
        </>
  )}
      onClose={() => setCandidatesDocsModalShow(false)}
      show={candidatesDocsModalShow}
      type="info"
  />
  )
}

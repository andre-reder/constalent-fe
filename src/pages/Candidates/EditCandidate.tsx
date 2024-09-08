import OpacityAnimation from "../../components/OpacityAnimation";
import CandidateForm from "./components/CandidateForm";

export default function EditCandidate() {
  return (
    <OpacityAnimation>
      <CandidateForm isEdit={true} />
    </OpacityAnimation>
  )
}

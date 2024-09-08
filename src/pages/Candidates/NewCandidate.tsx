import OpacityAnimation from "../../components/OpacityAnimation";
import CandidateForm from "./components/CandidateForm";

export default function NewCandidate() {
  return (
    <OpacityAnimation>
      <CandidateForm isEdit={false} />
    </OpacityAnimation>
  )
}

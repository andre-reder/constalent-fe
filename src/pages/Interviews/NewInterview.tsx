import OpacityAnimation from "../../components/OpacityAnimation";
import InterviewsForm from "./components/InterviewsForm";

export default function NewInterview() {
  return (
    <OpacityAnimation>
      <InterviewsForm isEdit={false} />
    </OpacityAnimation>
  )
}

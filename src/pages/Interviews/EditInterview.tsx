import OpacityAnimation from "../../components/OpacityAnimation";
import InterviewsForm from "./components/InterviewsForm";

export default function EditInterview() {
  return (
    <OpacityAnimation>
      <InterviewsForm isEdit={true} />
    </OpacityAnimation>
  )
}

import OpacityAnimation from "../../components/OpacityAnimation";
import VacanciesForm from "./components/VacanciesForm";

export default function EditVacancy() {
  return (
    <OpacityAnimation>
      <VacanciesForm isEdit={true} />
    </OpacityAnimation>
  )
}

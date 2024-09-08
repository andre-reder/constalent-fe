import OpacityAnimation from "../../components/OpacityAnimation";
import VacanciesForm from "./components/VacanciesForm";

export default function NewVacancy() {
  return (
    <OpacityAnimation>
      <VacanciesForm isEdit={false} />
    </OpacityAnimation>
  )
}

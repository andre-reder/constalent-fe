import OpacityAnimation from "../../components/OpacityAnimation";
import CompanyForm from "./components/CompanyForm";

export default function NewCompany() {
  return (
    <OpacityAnimation>
      <CompanyForm isEdit={false} />
    </OpacityAnimation>
  )
}

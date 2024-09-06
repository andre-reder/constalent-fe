import OpacityAnimation from "../../components/OpacityAnimation";
import CompanyForm from "./components/CompanyForm";

export default function EditCompany() {
  return (
    <OpacityAnimation>
      <CompanyForm isEdit={true} />
    </OpacityAnimation>
  )
}

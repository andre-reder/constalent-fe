import OpacityAnimation from "../../components/OpacityAnimation";
import UserForm from "./components/UserForm";

export default function EditUser() {
  return (
    <OpacityAnimation>
      <UserForm isEdit={true} />
    </OpacityAnimation>
  )
}

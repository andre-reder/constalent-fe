import OpacityAnimation from "../../components/OpacityAnimation";
import UserForm from "./components/UserForm";

export default function NewUser() {
  return (
    <OpacityAnimation>
      <UserForm isEdit={false} />
    </OpacityAnimation>
  )
}

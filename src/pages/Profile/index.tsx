import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";

export default function Profile() {
  return (
    <>
      <OpacityAnimation>
        <Header title='Perfil' detail={`Visualize e gerencie seu perfil`} />
      </OpacityAnimation>
    </>
  )
}

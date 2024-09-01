import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";

export default function Users() {
  return (
    <>
      <OpacityAnimation>
        <Header title='Usuários' detail={`Gerencie os usuários com acesso ao sistema`} />
      </OpacityAnimation>
    </>
  );
}

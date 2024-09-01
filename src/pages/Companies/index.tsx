import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";

export default function Companies() {
  return (
    <>
      <OpacityAnimation>
        <Header title='Empresas' detail={`Visualize e gerencie as empresas (clientes)`} />
      </OpacityAnimation>
    </>
  );
}

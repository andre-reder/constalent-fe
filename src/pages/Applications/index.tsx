import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";

export default function Applications() {
  return (
    <>
      <OpacityAnimation>
        <Header title='Aplicações' detail={`Visualize e gerencie as aplicações dos candidatos às vagas`} />
      </OpacityAnimation>
    </>
  );
}

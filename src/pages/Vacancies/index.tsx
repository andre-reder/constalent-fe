import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";

export default function Vacancies() {
  return (
    <>
      <OpacityAnimation>
        <Header title='Vagas' detail={`Visualize e gerencie suas vagas`} />
      </OpacityAnimation>
    </>
  );
}

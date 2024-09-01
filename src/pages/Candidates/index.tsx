import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";

export default function Candidates() {
  return (
    <>
      <OpacityAnimation>
        <Header title='Candidatos' detail={`Visualize e gerencie candidatos`} />
      </OpacityAnimation>
    </>
  );
}

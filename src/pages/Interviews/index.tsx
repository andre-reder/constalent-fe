import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";

export default function Interviews() {
  return (
    <>
      <OpacityAnimation>
        <Header title='Entrevistas' detail={`Visualize e gerencie as entrevistas com recrutador e com empresa`} />
      </OpacityAnimation>
    </>
  );
}

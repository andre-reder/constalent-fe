import { Header } from "../../components/Header";
import OpacityAnimation from "../../components/OpacityAnimation";
import { useAppContext } from "../../contexts/auth";

export default function Home() {
  const { user } = useAppContext();
  return (
    <>
      <OpacityAnimation>
        <Header title='Home' detail={`Olá, ${user?.name}! Seja bem-vindo ao sistema de gerenciamento Constalent. Use e abuse de nossas funcionalidades, aqui você poderá gerenciar todas as suas vagas, visualizar os candidatos de cada uma delas, acompanhar as entrevistas realizadas, com dados e resumos de como elas foram, pontos positivos e negativos de cada candidato, dentre diversas outras funcinoalidades!`} />
      </OpacityAnimation>
    </>
  );
}

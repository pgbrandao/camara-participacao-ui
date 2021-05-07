import { ThemesChart } from "../themes-chart"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";

const fetcher = url => fetch(url).then(r => r.json())

const ProposicaoTemasChart = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  return (
    <>
      {data ? <ThemesChart data={data['proposicoes_temas']} /> : <Skeleton height="20px" />}
    </>
  );
}

export { ProposicaoTemasChart }
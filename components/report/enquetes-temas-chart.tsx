import { ThemesChart } from "../themes-chart"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";

const fetcher = url => fetch(url).then(r => r.json())

export const EnquetesTemasChart = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  return (
    <>
      {data ?
        <ThemesChart
          data={data['enquetes_temas']}
          dateAccessor={(d) => d['date']}
          dimensionAccessor={(d) => d['proposicao__tema__nome']}
          metricAccessor={(d) => d['poll_votes']}
        /> : <Skeleton height="20px" />}
    </>
  );
}

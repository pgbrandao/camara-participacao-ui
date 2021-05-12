import { ThemesChart } from "./themes-chart"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";

const fetcher = url => fetch(url).then(r => r.json())

export const NoticiaTemasChart = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  return (
    <>
      {data ?
        <ThemesChart
          data={data['noticias_temas']}
          dateAccessor={(d) => d['date']}
          dimensionAccessor={(d) => d['noticia__tema_principal__titulo']}
          metricAccessor={(d) => d['pageviews']}
        /> : <Skeleton height="20px" />}
    </>
  );
}

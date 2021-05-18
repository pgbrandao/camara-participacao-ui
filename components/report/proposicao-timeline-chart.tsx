import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { TimelineChart } from "./timeline-chart";

const fetcher = url => fetch(url).then(r => r.json())

export const ProposicaoTimelineChart = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  return (
    <>
      {data ?
        <TimelineChart
          data={data['summary']}
          label="Visualizações da ficha de tramitação"
          dateAccessor={(d) => d['date']}
          metricAccessor={(d) => d['ficha_pageviews_total']}
        /> : <Skeleton height="20px" />}
    </>
  );
}

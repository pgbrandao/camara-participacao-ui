import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { TimelineChart } from "./timeline-chart";

const fetcher = url => fetch(url).then(r => r.json())

export const ProposicaoTimelineChart = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/api/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  return (
    <>
      {data ?
        <TimelineChart
          data={data['summary']}
          dateAccessor={(d) => d['date']}
          metrics={[
            {
              label:"Visualizações da ficha de tramitação",
              accessor: (d) => d['ficha_pageviews_total']
            },
          ]}
        /> : <Skeleton height="20px" />}
    </>
  );
}

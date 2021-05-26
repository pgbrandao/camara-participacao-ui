import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { TimelineChart } from "./timeline-chart";

const fetcher = url => fetch(url).then(r => r.json())

export const EnqueteTimelineChart = ({ year }) => {
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
              label:"Votos nas enquetes",
              accessor: (d) => d['poll_votes_total']
            },
            {
              label:"Comentários aprovados nas enquetes",
              accessor: (d) => d['poll_comments_authorized_total']
            },
          ]}
        /> : <Skeleton height="20px" />}
    </>
  );
}

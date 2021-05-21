import { ThemesChart } from "./themes-chart"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { Grid, GridItem, Heading, Link } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { RankingTable } from "./ranking-table";
import { useState } from "react";
import { ReportSubTitle } from "./report-subtitle";

const fetcher = url => fetch(url).then(r => r.json())

export const EnqueteTemasChart = ({ year }) => {
  const [apiParams, setApiParams] = useState(undefined);
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  const columns = [
    {
      Header: "Proposição",
      id: "nome_processado",
      accessor: row => [row.nome_processado, row.link_ficha_tramitacao],
      Cell: props => {
        return (<Link fontSize="md" href={props.value[1]}>{props.value[0]}</Link>)
      },
    },
    {
      Header: "Votos",
      id: "poll_votes",
      accessor: row => row['poll_votes'],
      isNumeric: true,
    },
  ];

  return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={6}>
        <GridItem>
          <ReportSubTitle>
            Temas das enquetes mais votadas
          </ReportSubTitle>

          {data ?
            <ThemesChart
              data={data['enquetes_temas']}
              dateAccessor={(d) => d['date']}
              dimensionAccessor={(d) => d['proposicao__tema__nome']}
              metricAccessor={(d) => d['poll_votes']}
            /> : <Skeleton height="20px" />}
        </GridItem>
        <GridItem>
          <ReportSubTitle>
            Proposições mais votadas
          </ReportSubTitle>

          <Select placeholder="Selecione um período" onChange={(event) => setApiParams(event.target.value)}>
            {data && data['periods_api_params'].map((period) => {
              return (<option value={period[0]}>{period[1]}</option>)
            })}
          </Select>
          {apiParams && <RankingTable url={`http://midias.camara.leg.br/painel-participacao/api/top-proposicoes/${apiParams}`} columns={columns} sortByField="poll_votes" />}
        </GridItem>
      </Grid>
    </>
  );
}
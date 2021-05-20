import { ThemesChart } from "./themes-chart"
import { ProposicaoRankingTable } from "./proposicao-ranking-table"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { useState } from "react";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { Grid, GridItem, Heading, Link } from "@chakra-ui/layout";

const fetcher = url => fetch(url).then(r => r.json())

export const ProposicaoTemasChart = ({ year }) => {
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
      Header: "Visualizações",
      id: "ficha_pageviews",
      accessor: row => row['ficha_pageviews'],
      isNumeric: true,
    },
  ];

  return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={6}>
        <GridItem>
          <Heading
            fontSize={{ base: 'lg', sm: 'xl', lg: 'xl' }}
            h={50}
            textAlign='center'
          >
            Temas das proposições mais visualizadas
          </Heading>

          {data ?
            <ThemesChart
              data={data['proposicoes_temas']}
              dateAccessor={(d) => d['date']}
              dimensionAccessor={(d) => d['proposicao__tema__nome']}
              metricAccessor={(d) => d['ficha_pageviews']}
            /> : <Skeleton height="20px" />}
        </GridItem>
        <GridItem>
          <Heading
            fontSize={{ base: 'lg', sm: 'xl', lg: 'xl' }}
            h={50}
            textAlign='center'
          >
            Proposições mais visualizadas
          </Heading>

          <Select placeholder="Selecione um período" onChange={(event) => setApiParams(event.target.value)}>
            {data && data['periods_api_params'].map((period) => {
              return (<option value={period[0]}>{period[1]}</option>)
            })}
          </Select>
          {apiParams && <ProposicaoRankingTable url={`http://midias.camara.leg.br/painel-participacao/api/top-proposicoes/${apiParams}`} columns={columns} sortByField="ficha_pageviews" />}
        </GridItem>
      </Grid>
    </>
  );
}

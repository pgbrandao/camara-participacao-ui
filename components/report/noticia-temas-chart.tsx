import { ThemesChart } from "./themes-chart"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { Grid, GridItem, Link } from "@chakra-ui/layout";
import { ReportSubTitle } from "./report-subtitle";
import { Select } from "@chakra-ui/select";
import { useState } from "react";
import { RankingTable } from "./ranking-table";

const fetcher = url => fetch(url).then(r => r.json())

export const NoticiaTemasChart = ({ year }) => {
  const [apiParams, setApiParams] = useState(undefined);
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  const columns = [
    {
      Header: "Notícia",
      id: "titulo",
      accessor: row => [row.titulo, row.link],
      Cell: props => {
        return (<Link fontSize="md" href={props.value[1]}>{props.value[0]}</Link>)
      },
    },
    {
      Header: "Acessos",
      id: "pageviews",
      accessor: row => row['pageviews'],
      isNumeric: true,
    },
  ];

  return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={6}>
        <GridItem>
          <ReportSubTitle>
            Temas das notícias mais acessadas
          </ReportSubTitle>

          {data ?
            <ThemesChart
              data={data['noticias_temas']}
              dateAccessor={(d) => d['date']}
              dimensionAccessor={(d) => d['noticia__tema_principal__titulo']}
              metricAccessor={(d) => d['pageviews']}
            /> : <Skeleton height="20px" />}
      </GridItem>
        <GridItem>
          <ReportSubTitle>
            Notícias mais acessadas
          </ReportSubTitle>

          <Select placeholder="Selecione um período" onChange={(event) => setApiParams(event.target.value)}>
            {data && data['periods_api_params'].map((period) => {
              return (<option value={period[0]}>{period[1]}</option>)
            })}
          </Select>
          {apiParams && <RankingTable url={`http://midias.camara.leg.br/painel-participacao/api/top-noticias/${apiParams}`} columns={columns} sortByField="pageviews" />}
        </GridItem>
      </Grid>
    </>
  );
}

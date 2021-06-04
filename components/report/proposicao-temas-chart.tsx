import { ThemesChart } from "./themes-chart"
import { RankingTable } from "./ranking-table"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { useState } from "react";
import { Select } from "@chakra-ui/select";
import { Button } from "@chakra-ui/button";
import { Box, Grid, GridItem, Heading, HStack, Link, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { ReportSubTitle } from "./report-subtitle";
import { formattedNumber } from "../formattedNumber";

const fetcher = url => fetch(url).then(r => r.json())

export const ProposicaoTemasChart = ({ year }) => {
  const [apiParams, setApiParams] = useState(undefined);
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/api/relatorio-consolidado/?year=${year}`, fetcher);

  const [colorsMap, setColorsMap] = useState(new Object());
  const [colorLegends, setColorLegends] = useState(new Array());
  const [defaultColor, setDefaultColor] = useState(undefined);

  if (error) return <div>Erro ao carregar.</div>

  const legendGlyphSize = 15;

  const columns = [
    {
      Header: "Proposição",
      id: "nome_processado",
      accessor: row => [row.nome_processado, row.link_ficha_tramitacao, row.temas],
      Cell: props => {
        return (
        <>
            <Link fontSize="md" href={props.value[1]}><b>{props.value[0]}</b></Link><br />
            {props.value[2] && props.value[2].map((tema) => {
              return (
                <>
                  <Text color={tema in colorsMap ? colorsMap[tema] : defaultColor} px={0} fontSize="sm"><b>{tema}</b></Text>
                </>
              )
            })}
          
        </>)
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
          <Box
            p={6}
            w={'full'}
            textAlign={'center'}
          >
            <ReportSubTitle>
              Temas das proposições mais visualizadas
            </ReportSubTitle>

            {data ?
              <ThemesChart
                year={year}
                dataAccessor={(d) => d['proposicoes_temas']}
                dateAccessor={(d) => d['date']}
                dimensionAccessor={(d) => d['proposicao__tema__nome']}
                metricAccessor={(d) => d['ficha_pageviews']}
                setColorsMap={setColorsMap}
                setColorLegends={setColorLegends}
                setDefaultColor={setDefaultColor}
              /> : <Skeleton height="20px"/>}
          </Box>
        </GridItem>
        <GridItem>
          <Box
            w={'full'}
            bg={'gray.50'}
            boxShadow={'xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
          >
            <ReportSubTitle>
              Proposições mais visualizadas
            </ReportSubTitle>
            <Box pb={10}>
              <Select placeholder="Selecione um período" onChange={(event) => setApiParams(event.target.value)}>
                {data && data['periods_api_params'].map((period) => {
                  return (<option value={period[0]}>{period[1]}</option>)
                })}
              </Select>
            </Box>
            {apiParams && <RankingTable
              url={`http://midias.camara.leg.br/painel-participacao/api/top-proposicoes/${apiParams}`}
              columns={columns}
              sortByField="ficha_pageviews"
              />}
          </Box>
        </GridItem>
      </Grid>
      <Wrap spacing="12px" justify="left" p={4} mt={10}>
        {colorLegends.map((colorLegend) => {
          return (
            <WrapItem>
              <HStack>
                <svg width={legendGlyphSize} height={legendGlyphSize} style={{ margin: '2px 6px' }}>
                  <circle
                    fill={colorLegend.color}
                    r={legendGlyphSize / 2}
                    cx={legendGlyphSize / 2}
                    cy={legendGlyphSize / 2}
                  />
                </svg>
                <Text><b>{colorLegend.dimension}</b> ({formattedNumber(colorLegend.metric)} acessos)</Text>
              </HStack>
            </WrapItem>
          )
        })}
      </Wrap>

    </>
  );
}

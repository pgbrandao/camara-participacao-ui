import { ThemesChart } from "./themes-chart"
import { Skeleton } from "@chakra-ui/skeleton";
import useSWR from "swr";
import { Box, Grid, GridItem, HStack, Link, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { ReportSubTitle } from "./report-subtitle";
import { Select } from "@chakra-ui/select";
import { useState } from "react";
import { RankingTable } from "./ranking-table";
import { formattedNumber } from "../formattedNumber";

const fetcher = url => fetch(url).then(r => r.json())

export const NoticiaTemasChart = ({ year }) => {
  const [apiParams, setApiParams] = useState(undefined);
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/api/relatorio-consolidado/?year=${year}`, fetcher);

  const [colorsMap, setColorsMap] = useState(new Object());
  const [colorLegends, setColorLegends] = useState(new Array());
  const [defaultColor, setDefaultColor] = useState(undefined);

  if (error) return <div>Erro ao carregar.</div>

  const legendGlyphSize = 15;

  const columns = [
    {
      Header: "Notícia",
      id: "titulo",
      accessor: row => [row.titulo, row.link, row.tema_principal],
      Cell: props => {
        return (
        <>
            <Link fontSize="md" href={props.value[1]}>{props.value[0]}</Link><br />
            <Text color={props.value[2] in colorsMap ? colorsMap[props.value[2]] : defaultColor} px={0} fontSize="sm"><b>{props.value[2]}</b></Text>
        </>)
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
            <Box
              p={6}
              w={'full'}
              textAlign={'center'}
            >
              <ReportSubTitle>
                Temas das notícias mais acessadas
              </ReportSubTitle>

              {data ?
                <ThemesChart
                  data={data['noticias_temas']}
                  dateAccessor={(d) => d['date']}
                  dimensionAccessor={(d) => d['noticia__tema_principal__titulo']}
                  metricAccessor={(d) => d['pageviews']}
                  setColorsMap={setColorsMap}
                  setColorLegends={setColorLegends}
                  setDefaultColor={setDefaultColor}
                /> : <Skeleton height="20px" />
              }
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
                Notícias mais acessadas
              </ReportSubTitle>
              <Box pb={10}>
                <Select placeholder="Selecione um período" onChange={(event) => setApiParams(event.target.value)}>
                  {data && data['periods_api_params'].map((period) => {
                    return (<option value={period[0]}>{period[1]}</option>)
                  })}
                </Select>
              </Box>
              {apiParams && <RankingTable
                url={`http://midias.camara.leg.br/painel-participacao/api/top-noticias/${apiParams}`}
                columns={columns}
                sortByField="pageviews"
              />}
            </Box>
        </GridItem>
      </Grid>
      <Wrap spacing="12px" justify="center" p={4} mt={10}>
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

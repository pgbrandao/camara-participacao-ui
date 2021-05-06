import { Heading, Stack, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import { KpiVisualizacoesFicha } from "./kpi-visualizacoes-ficha";
import { KpiVotosEnquete } from "./kpi-votos-enquete";
import { KpiComentariosEnquete } from "./kpi-comentarios-enquete";

const fetcher = url => fetch(url).then(r => r.json())

const ReportBody = ({ year }) => {
  return (
    <>
      <Heading
        fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}
        py={10}
      >
        <Text as={'span'} pl="4">
          Propostas legislativas
        </Text>
      </Heading>

      <KpiVisualizacoesFicha year={year} />

      <Heading
        fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}
        py={10}
      >
        <Text as={'span'} pl="4">
          Enquetes legislativas
        </Text>
      </Heading>

      <KpiVotosEnquete year={year} />
      <KpiComentariosEnquete year={year} />
    </>
  );
}

export { ReportBody }
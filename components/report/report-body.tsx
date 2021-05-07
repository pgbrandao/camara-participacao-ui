import { Heading, Stack, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import { KpiVisualizacoesFicha } from "./kpi-visualizacoes-ficha";
import { KpiVotosEnquete } from "./kpi-votos-enquete";
import { KpiComentariosEnquete } from "./kpi-comentarios-enquete";
import { ReportTitle } from "./report-title";
import { ProposicaoTemasChart } from "./proposicao-temas.chart";

const fetcher = url => fetch(url).then(r => r.json())

const ReportBody = ({ year }) => {
  return (
    <>
      <ReportTitle>
        Propostas legislativas
      </ReportTitle>

      <KpiVisualizacoesFicha year={year} />

      <ReportTitle>
        Enquetes legislativas
      </ReportTitle>

      <KpiVotosEnquete year={year} />
      <KpiComentariosEnquete year={year} />

      <ReportTitle>
        Notícias
      </ReportTitle>

      <Text>aaaaa</Text>

      <ReportTitle>
        Temas das proposições
      </ReportTitle>

      <ProposicaoTemasChart year={year} />
    </>
  );
}

export { ReportBody }
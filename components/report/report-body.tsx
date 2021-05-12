import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import { KpiVisualizacoesFicha } from "./kpi-visualizacoes-ficha";
import { KpiVotosEnquete } from "./kpi-votos-enquete";
import { KpiComentariosEnquete } from "./kpi-comentarios-enquete";
import { ReportTitle } from "./report-title";
import { ProposicaoTemasChart } from "./proposicao-temas-chart";
import { NoticiaTemasChart } from "./noticias-temas-chart";
import { EnquetesTemasChart } from "./enquetes-temas-chart";
import { ReportIntroduction } from "./report-introduction";
import { PrismaAssuntosProposicao } from "./prisma-assuntos-proposicao";

const fetcher = url => fetch(url).then(r => r.json())

const ReportBody = ({ year }) => {
  return (
    <>
      <Box>
        <ReportIntroduction year={year} />
        <ReportTitle>
          Propostas legislativas
        </ReportTitle>

        <KpiVisualizacoesFicha year={year} />

        <ReportTitle>
          Temas das proposições
        </ReportTitle>

        <ProposicaoTemasChart year={year} />

        <ReportTitle>
          Enquetes legislativas
        </ReportTitle>

        <EnquetesTemasChart year={year} />

        <KpiVotosEnquete year={year} />
        <KpiComentariosEnquete year={year} />

        <ReportTitle>
          Notícias
        </ReportTitle>

        <Text>aaaaa</Text>

        <NoticiaTemasChart year={year} />

        <ReportTitle>
          Central de Comunicação Interativa
        </ReportTitle>

        <PrismaAssuntosProposicao year={year} />
      </Box>
    </>
  );
}

export { ReportBody }
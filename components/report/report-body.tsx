import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
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
import { PrismaAssuntosLegislacao } from "./prisma-assuntos-legislacao";
import { PrismaAssuntosTemasDeDebateNacional } from "./prisma-assuntos-temas-de-debate-nacional";
import { PrismaAssuntoDeputado } from "./prisma-assuntos-deputado";
import { PrismaAssuntosAtividadeLegislativa } from "./prisma-assuntos-atividade-legislativa";
import { ProposicaoTimelineChart } from "./proposicao-timeline-chart";

const fetcher = url => fetch(url).then(r => r.json())

const ReportBody = ({ year }) => {
  return (
    <>
      <Box>
        <ReportIntroduction year={year} />
        <ReportTitle>
          Propostas legislativas
        </ReportTitle>

        <ProposicaoTimelineChart year={year} />

        <KpiVisualizacoesFicha year={year} />

        <ReportTitle>
          Proposições
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

        <SimpleGrid columns={[1, 2, null, 3]}>
          <Box>
            <PrismaAssuntosProposicao year={year} />
          </Box>
          <Box>
            <PrismaAssuntoDeputado year={year} />
          </Box>
          <Box>
            <PrismaAssuntosTemasDeDebateNacional year={year} />
          </Box>
          <Box>
            <PrismaAssuntosLegislacao year={year} />
          </Box>
          <Box>
            <PrismaAssuntosAtividadeLegislativa year={year} />
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}

export { ReportBody }
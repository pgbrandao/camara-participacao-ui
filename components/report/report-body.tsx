import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import useSWR from "swr";
import { KpiVisualizacoesFicha } from "./kpi-visualizacoes-ficha";
import { KpiVotosEnquete } from "./kpi-votos-enquete";
import { KpiDemandasPrisma } from "./kpi-demandas-prisma";
import { KpiComentariosEnquete } from "./kpi-comentarios-enquete";
import { ReportTitle } from "./report-title";
import { ProposicaoTemasChart } from "./proposicao-temas-chart";
import { NoticiaTemasChart } from "./noticia-temas-chart";
import { EnqueteTemasChart } from "./enquete-temas-chart";
import { ReportIntroduction } from "./report-introduction";
import { PrismaAssuntosProposicao } from "./prisma-assuntos-proposicao";
import { PrismaAssuntosLegislacao } from "./prisma-assuntos-legislacao";
import { PrismaAssuntosTemasDeDebateNacional } from "./prisma-assuntos-temas-de-debate-nacional";
import { PrismaAssuntoDeputado } from "./prisma-assuntos-deputado";
import { PrismaAssuntosAtividadeLegislativa } from "./prisma-assuntos-atividade-legislativa";
import { ProposicaoTimelineChart } from "./proposicao-timeline-chart";
import { EnqueteTimelineChart } from "./enquete-timeline-chart";
import { FeatureHeader } from "./feature";
import Icon from "@chakra-ui/icon";
import { FaNewspaper, FaPenFancy, FaVoteYea } from "react-icons/fa";
import { NoticiaTimelineChart } from "./noticia-timeline-chart";
import { BiSupport } from "react-icons/bi";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { KpiComentariosPortal } from "./kpi-comentarios-portal";
import { KpiPageviewsMateriasPortal } from "./kpi-pageviews-materias-portal";
import { LinkCciReport } from "./link-cci-report";
import { IoChatbubble } from "react-icons/io5";
import { LinkSocialMediaReport } from "./link-social-media-report";
import { EventTimeline } from "./event-timeline";
import { KpiComentariosPortalCamara } from "./kpi-comentarios-portal-camara";

const fetcher = url => fetch(url).then(r => r.json())

const ReportBody = ({ year }) => {
  return (
    <>
      <Box>
        <ReportIntroduction year={year} />

        <EventTimeline year={year} />

        <FeatureHeader
          icon={
            <Icon as={FaPenFancy} color={'gray.500'} w={20} h={20} />
          }
          text="Propostas legislativas"
        />


        <ProposicaoTimelineChart year={year} />

        <KpiVisualizacoesFicha year={year} />

        <ProposicaoTemasChart year={year} />

        <FeatureHeader
          icon={
            <Icon as={FaVoteYea} color={'gray.500'} w={20} h={20} />
          }
          text="Enquetes legislativas"
        />

        <KpiVotosEnquete year={year} />
        <KpiComentariosEnquete year={year} />

        <EnqueteTimelineChart year={year} />

        <EnqueteTemasChart year={year} />


        <FeatureHeader
          icon={
            <Icon as={FaNewspaper} color={'gray.500'} w={20} h={20} />
          }
          text="Notícias"
        />

        <KpiPageviewsMateriasPortal year={year} />
        <KpiComentariosPortal year={year} />
        <KpiComentariosPortalCamara year={year} />
        <NoticiaTimelineChart year={year} />
        <NoticiaTemasChart year={year} />

        <FeatureHeader
          icon={
            <Icon as={BiSupport} color={'gray.500'} w={20} h={20} />
          }
          text="Central de Comunicação Interativa"
        />

        <LinkCciReport />

        <FeatureHeader
          icon={
            <Icon as={IoChatbubble} color={'gray.500'} w={20} h={20} />
          }
          text="Redes sociais"
        />

        <LinkSocialMediaReport />
        {/* <KpiDemandasPrisma year={year} /> */}

        {/* <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Proposição</Tab>
            <Tab>Deputado</Tab>
            <Tab>Temas de debate nacional</Tab>
            <Tab>Legislação</Tab>
            <Tab>Atividade legislativa</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PrismaAssuntosProposicao year={year} />
            </TabPanel>
            <TabPanel>
              <PrismaAssuntoDeputado year={year} />
            </TabPanel>
            <TabPanel>
              <PrismaAssuntosTemasDeDebateNacional year={year} />
            </TabPanel>
            <TabPanel>
              <PrismaAssuntosLegislacao year={year} />
            </TabPanel>
            <TabPanel>
              <PrismaAssuntosAtividadeLegislativa year={year} />
            </TabPanel>

          </TabPanels>
        </Tabs> */}
      </Box>
    </>
  );
}

export { ReportBody }
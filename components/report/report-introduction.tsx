import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/layout"
import Head from "next/head"
import { IoChatbubble, IoPeople, IoRadioOutline, IoMail} from "react-icons/io5";
import { FaVoteYea, FaNewspaper } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { ReactElement } from "react";
import { FeatureText } from "./feature";

export const ReportIntroduction = ({year}) => {
  return (
    <>
      <Text>
        Esta página apresenta alguns eventos importantes e os dados da participação popular nos seguintes canais da Câmara dos Deputados em {year}:
      </Text>
      <Box marginLeft={30} marginTop={5} marginBottom={5}>
        <FeatureText
          icon={
            <Icon as={IoPeople} color={'gray.500'} w={5} h={5} />
          }
          text="Canais de participação popular:"
        />
          
        <FeatureText
          icon={
            <Icon as={FaVoteYea} color={'gray.500'} w={5} h={5} />
          }
          text="Enquetes legislativas"
          indent={true}
        />

        <FeatureText
          icon={
            <Icon as={IoRadioOutline} color={'gray.500'} w={5} h={5} />
          }
          text="Comunicação Interativa:"
          indent={false}
        />

        <FeatureText
          icon={
            <Icon as={IoMail} color={'gray.500'} w={5} h={5} />
          }
          text="Fale Conosco"
          indent={true}
        />

        <FeatureText
          icon={
            <Icon as={BiSupport} color={'gray.500'} w={5} h={5} />
          }
          text="Disque Câmara: 0800 0 619 619"
          indent={true}
        />

        <FeatureText
          icon={
            <Icon as={FaNewspaper} color={'gray.500'} w={5} h={5} />
          }
          text="Acessos e comentários às notícias do Portal da Câmara"
          indent={true}
        />
      </Box>
      <Text>Ao clicar em cada data nos gráficos, é possível ver os quantitativos em detalhe.</Text>
      <br />
      <Text>Este relatório está em fase de protótipo. Está em estudo a inclusão de outras formas de participação na Câmara. Para fazer sugestões e observações ou reportar erros, Fale Conosco.</Text>
    </>
  )
}
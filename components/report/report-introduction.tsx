import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/layout"
import Head from "next/head"
import { IoChatbubble, IoPeople, IoRadioOutline, IoMail} from "react-icons/io5";
import { FaVoteYea, FaNewspaper, FaPenFancy, FaCalendar } from "react-icons/fa";
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
        {/* <FeatureText
          icon={
            <Icon as={FaCalendar} color={'gray.500'} w={5} h={5} />
          }
          text="Linha do tempo"
        /> */}
        <FeatureText
          icon={
            <Icon as={FaPenFancy} color={'gray.500'} w={5} h={5} />
          }
          text="Propostas legislativas"
        />
        <FeatureText
          icon={
            <Icon as={FaVoteYea} color={'gray.500'} w={5} h={5} />
          }
          text="Enquetes legislativas"
        />
        <FeatureText
          icon={
            <Icon as={FaNewspaper} color={'gray.500'} w={5} h={5} />
          }
          text="Notícias"
        />
      </Box>
      <Text>
        Além dos dados nesta página, você poderá navegar por outros relatórios que contém informações sobre:
      </Text>
      <Box marginLeft={30} marginTop={5} marginBottom={5}>

      <FeatureText
          icon={
            <Icon as={BiSupport} color={'gray.500'} w={5} h={5} />
          }
          text="Central de Comunicação Interativa"
        />

        <FeatureText
          icon={
            <Icon as={IoChatbubble} color={'gray.500'} w={5} h={5} />
          }
          text="Redes sociais da Câmara"
        />
          

        {/* <FeatureText
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
 */}

      </Box>
      <Text>Ao clicar em cada data nos gráficos, é possível ver os quantitativos em detalhe.</Text>
      <br />
      <Text>Este relatório está em fase de protótipo. Está em estudo a inclusão de outras formas de participação na Câmara. Para fazer sugestões e observações ou reportar erros, Fale Conosco.</Text>
    </>
  )
}
import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, ListItem, Stack, Text, UnorderedList } from "@chakra-ui/layout"
import Head from "next/head"
import { IoChatbubble, IoPeople, IoRadioOutline, IoMail} from "react-icons/io5";
import { FaVoteYea, FaNewspaper } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg?: string;
  icon?: ReactElement;
  indent?: boolean;
}

const Feature = ({ text, icon, iconBg, indent }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'} marginTop={2} marginBottom={2} marginLeft={indent ? 5 : 0}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};


export const ReportIntroduction = ({year}) => {
  return (
    <>
      <Text>
        Esta página apresenta alguns eventos importantes e os dados da participação popular nos seguintes canais da Câmara dos Deputados em {year}:
      </Text>
      <Box marginLeft={30} marginTop={5} marginBottom={5}>
        <Feature
          icon={
            <Icon as={IoPeople} color={'gray.500'} w={5} h={5} />
          }
          iconBg={'gray.100'}
          text={'Canais de participação popular:'}
        />

        <Feature
          icon={
            <Icon as={FaVoteYea} color={'gray.500'} w={5} h={5} />
          }
          iconBg={'gray.100'}
          text={'Enquetes legislativas'}
          indent={true}
        />

        <Feature
          icon={
            <Icon as={IoRadioOutline} color={'gray.500'} w={5} h={5} />
          }
          iconBg={'gray.100'}
          text={'Comunicação Interativa:'}
          indent={false}
        />

        <Feature
          icon={
            <Icon as={IoMail} color={'gray.500'} w={5} h={5} />
          }
          iconBg={'gray.100'}
          text={'Fale Conosco'}
          indent={true}
        />

        <Feature
          icon={
            <Icon as={BiSupport} color={'gray.500'} w={5} h={5} />
          }
          iconBg={'gray.100'}
          text={'Disque Câmara: 0800 0 619 619'}
          indent={true}
        />

        <Feature
          icon={
            <Icon as={FaNewspaper} color={'gray.500'} w={5} h={5} />
          }
          iconBg={'gray.100'}
          text={'Acessos e comentários às notícias do Portal da Câmara'}
          indent={true}
        />
      </Box>
      <Text>Ao clicar em cada data nos gráficos, é possível ver os quantitativos em detalhe.</Text>
      <br />
      <Text>Este relatório está em fase de protótipo. Está em estudo a inclusão de outras formas de participação na Câmara. Para fazer sugestões e observações ou reportar erros, Fale Conosco.</Text>
    </>
  )
}
import { Image } from "@chakra-ui/image";
import { Box, Center, Link, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import useSWR from "swr";
import { formattedNumber } from "../formattedNumber";

const fetcher = url => fetch(url).then(r => r.json())

const KpiVisualizacoesFicha = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  return (
    <>
      <Box p={4} display={{ md: "flex" }} w="100%">
        <Center>
          <StatGroup>
            <Stat>
              <StatNumber>{data ? formattedNumber(data['ficha_pageviews']) : <Skeleton height="20px" />}</StatNumber>
            </Stat>
          </StatGroup>
        </Center>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Link
            mt={1}
            display="block"
            fontSize="xl"
            lineHeight="normal"
            fontWeight="semibold"
            href="#"
          >
            Acessos às ficha de tramitação
          </Link>
          <Text mt={2} color="gray.500">
            Cada proposta legislativa tem uma página própria no portal.
          </Text>
        </Box>
      </Box>
    </>
  );
}

export { KpiVisualizacoesFicha }
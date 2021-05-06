import { Image } from "@chakra-ui/image";
import { Box, Center, Link, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import useSWR from "swr";
import { formattedNumber } from "../formattedNumber";

const fetcher = url => fetch(url).then(r => r.json())

const KpiVotosEnquete = ({ year }) => {
  const { data, error } = useSWR(`http://midias.camara.leg.br/painel-participacao/relatorio-consolidado/?year=${year}`, fetcher);

  if (error) return <div>Erro ao carregar.</div>

  return (
    <>
      <Box p={4} display={{ md: "flex" }}  w="100%">
        <Center>
          <StatGroup>
            <Stat>
              <StatNumber>{data ? formattedNumber(data['poll_votes']) : <Skeleton height="20px" />}</StatNumber>
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
            Votos nas enquetes
          </Link>
          <Text mt={2} color="gray.500">
            Cada proposta legislativa em tramitação possui uma enquete, na qual o cidadão pode votar escolher dentre várias opções variando entre "discordo totalmente" e "concordo totalmente".
          </Text>
        </Box>
      </Box>
    </>
  );
}

export { KpiVotosEnquete }
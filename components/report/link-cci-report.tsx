import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Center, Link, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { FaExternalLinkAlt } from "react-icons/fa";
import useSWR from "swr";
import { formattedNumber } from "../formattedNumber";

const LinkCciReport = () => {
  return (
    <>
      <Box p={4} display={{ md: "flex" }}  w="100%">
        <Link fontSize='3xl' target="_blank" href="https://datastudio.google.com/reporting/6f1770c2-ace1-4b8c-b6e9-0162cd8cf698">Relatório da Central de Comunicação Interativa <Icon as={FaExternalLinkAlt} color={'gray.500'} /></Link>
      </Box>
    </>
  );
}

export { LinkCciReport }
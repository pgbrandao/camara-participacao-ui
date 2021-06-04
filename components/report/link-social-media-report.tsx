import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Center, Link, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { FaExternalLinkAlt } from "react-icons/fa";
import useSWR from "swr";
import { formattedNumber } from "../formattedNumber";

const LinkSocialMediaReport = () => {
  return (
    <>
      <Box p={4} display={{ md: "flex" }}  w="100%">
        <Link fontSize='3xl' target="_blank" href="">Relatório das redes sociais da Câmara [falta link] <Icon as={FaExternalLinkAlt} color={'gray.500'} /></Link>
      </Box>
    </>
  );
}

export { LinkSocialMediaReport }
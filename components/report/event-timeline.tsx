import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Box, Center, Link, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { FaCalendar, FaExternalLinkAlt } from "react-icons/fa";
import useSWR from "swr";
import { formattedNumber } from "../formattedNumber";
import { FeatureHeader } from "./feature";

const EventTimeline = ({ year }) => {

  if (year != 2020) {
    return (<></>)
  }

  return (
    <>
      <FeatureHeader
        icon={
          <Icon as={FaCalendar} color={'gray.500'} w={20} h={20} />
        }
        text="Linha do tempo"
      />


      <iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1Pu1BSyQZcVPpuI7FibrNVL3Yb4zxkhpc8oNKU0vUebo&font=Default&lang=pt-br&initial_zoom=2&height=700' width='100%' height='700' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>
    </>
  );
}

export { EventTimeline }
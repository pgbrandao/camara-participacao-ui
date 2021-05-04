import React from "react"
import Link from 'next/link'
import {
  Heading,
  VStack,
  Button,
  Flex,
  Spacer,
  Text
} from "@chakra-ui/react"

const RelatorioParticipacao = ({year}) => (
  <VStack>
    <Flex w="100%" mb={4}>
      <Heading
      lineHeight={1.1}
      fontWeight={600}
      fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}>
        <Text as={'span'} pl="4">
          Relatório {year}
        </Text>
      </Heading>
      <Spacer />
    </Flex>
  </VStack>
)

export default RelatorioParticipacao



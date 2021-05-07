import React from "react"
import Head from 'next/head'
import { NavBar } from "../../components/nav-bar"
import { useRouter } from 'next/router'
import { ReportBody } from "../../components/report/report-body"
import {
  Heading,
  Button,
  Text,
  Container,
  Stack,
  Box
} from "@chakra-ui/react"

const RelatorioParticipacao = () => {
  const router = useRouter();
  const { year } = router.query;

  return (
    <>
      <Head>
        <title>A Participação na Câmara em {year}</title>
      </Head>
      <NavBar showReportsButton={true} />
      <Container maxW={'5xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}
            >
            <Text as={'span'} pl="4">
              A Participação na Câmara em {year}
            </Text>
          </Heading>
          <Box h="70"></Box>
          <ReportBody year={year} />
        </Stack>
      </Container>
      <Box p={4}></Box>
    </>
  )
}

export default RelatorioParticipacao



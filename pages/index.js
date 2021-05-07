import Head from 'next/head'
import { NavBar } from "../components/nav-bar"
import {
  Box,
  Button,
  Container,
  Stack,
  Heading,
  Link
} from "@chakra-ui/react"

export default function Home() {
  const startYear = 2020;
  const endYear = new Date().getFullYear();
  const years = [ ...Array(endYear - startYear + 1).keys() ].map( i => startYear + i);

  return (
    <>
      <Head>
        <title>A Participação na Câmara</title>
      </Head>
      <NavBar showReportsButton={false} />
      <Container maxW={'5xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>A Participação na Câmara</Heading>
          <Box h="70"></Box>
          <Stack direction="row" spacing={4} align="center">
            {years.map((year) => {
              return (
                <Link href={`/relatorio-participacao/${year}`}>
                  <Button 
                    variant="solid"
                    px="40px"
                  >
                    {year}
                  </Button>
                </Link>
              )
            })}
          </Stack>
        </Stack>
      </Container>
      <Box p={4}></Box>
    </>
  )
}

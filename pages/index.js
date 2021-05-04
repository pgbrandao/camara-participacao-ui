import Head from 'next/head'
import NavBar from "../components/nav-bar"
import {
  Box,
  Button,
  Container,
  Stack,
  Heading
} from "@chakra-ui/react"

export default function Home() {
  const currentYear = new Date().getFullYear();
  const years = [ ...Array(currentYear + 1 - 2020).keys() ].map( i => 2020 + i);
  console.log(years)
  return (
    <>
      <Head>
        <title>A Participação na Câmara</title>
      </Head>
      <NavBar />
      <Container maxW={'5xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>A Participação na Câmara</Heading>
          <Box h="70"></Box>
          <Stack direction="row" spacing={4} align="center">
            {years.map((year) => {
              return (
                <Button 
                  variant="solid"
                  px="40px"
                >
                  {year}
                </Button>
              )
            })}
          </Stack>
        </Stack>
      </Container>
      <Box p={4}></Box>
    </>

    // <VStack>
      
    //   <Flex w="100%" mb={4}>
    //     <Heading
    //     lineHeight={1.1}
    //     fontWeight={600}
    //     fontSize={{ base: 'xl', sm: '2xl', lg: '2xl' }}>
    //       <Text as={'span'} pl="4">
    //         A Participação na Câmara
    //       </Text>
    //     </Heading>
    //     <Spacer />
    //     <Text>Bla</Text>
    //     {/* <Link href="/create">
    //       <Button leftIcon={<FaPlus />} colorScheme="green">
    //         Create new index
    //       </Button>
    //     </Link> */}
    //   </Flex>
    //   <Text>{years}</Text>
    // </VStack>
  )
}

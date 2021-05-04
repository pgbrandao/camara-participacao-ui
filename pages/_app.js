import '../styles/globals.css'
import {
  ChakraProvider,
  Box,
  Center,
} from "@chakra-ui/react"
import Head from 'next/head'
import theme from "../styles/theme"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Relatórios da participação na Câmara dos Deputados" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} minW={1200} />
      </ChakraProvider>
    </>
  )
}

export default MyApp

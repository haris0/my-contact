import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import getConfig from 'next/config'
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Layout } from '@/components/layout/Layout'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const BASE_URL = getConfig().publicRuntimeConfig.apiBaseURL;
const client = new ApolloClient({
  uri: BASE_URL,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  );
}

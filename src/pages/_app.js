import '@/styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache()
})
export default function App ({ Component, pageProps }) {
  return <ApolloProvider client={client}>
           <Component {...pageProps} />
         </ApolloProvider>
}

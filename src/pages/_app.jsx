import { UserProvider } from '@/context/UserContext'
import '@/styles/globals.css'
import Head from 'next/head'

import Layout from './layout'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const page = router.pathname === '/' ? 'home' : router.pathname.replace(/^\/([^/]+).*$/, '$1')

  return (
    <>
      <Head>
        <title>BillTracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserProvider>
        <Layout page={page}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>

  )
}
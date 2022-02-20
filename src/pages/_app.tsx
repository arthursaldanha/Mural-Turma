import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/index'
import GlobalStyles from 'styles/global'
import { AuthProvider } from 'context/AuthContext'

import NextNProgress from 'nextjs-progressbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mural Turma</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
        <meta
          name="description"
          content="Projeto criado para informar notícias sobre a turma"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NextNProgress
          color="#4ACFAC"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
          showOnShallow={true}
        />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
        />
      </ThemeProvider>
    </>
  )
}

export default App

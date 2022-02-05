import type { AppProps } from 'next/app'
import { GuessProvider } from '../contexts/guessContext'
import { ModalProvider } from '../contexts/modalContext'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <GuessProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </GuessProvider>
  )
}

export default MyApp

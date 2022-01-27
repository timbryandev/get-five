import type { AppProps } from 'next/app'
import { GuessProvider } from '../contexts/guessContext'
import '../styles/globals.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <GuessProvider>
      <Component {...pageProps} />;
    </GuessProvider>
  )
}

export default MyApp

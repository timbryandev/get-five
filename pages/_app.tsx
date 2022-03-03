import '../styles/globals.css'

import type { AppProps } from 'next/app'

import { GameProvider } from '../contexts/gameContext'
import { ModalProvider } from '../contexts/modalContext'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <GameProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </GameProvider>
  )
}

export default MyApp

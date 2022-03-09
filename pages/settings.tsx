import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { ANCHOR_CLASSES } from '../components/anchor'
import Header from '../components/header/header'
import RadioGroup from '../components/radio-group'
import {
  GAME_MODE_OPTIONS,
  Mode,
  useGameContext
} from '../contexts/gameContext'

const Settings: NextPage = () => {
  const { state, dispatch } = useGameContext()

  const setMode = (value: Mode) => {
    dispatch({ type: 'SET_MODE', payload: value })
  }

  return (
    <div className='wrapper w-screen h-screen overflow-auto bg-gradient-to-r from-green-500 to-teal-500'>
      <Head>
        <title>Settings | Get Five</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width, user-scalable=no'
        />
      </Head>
      <Header />
      <div className='max-w-screen-sm m-auto grid place-items-center my-24'>
        <h2 className='text-2xl font-bold'>Settings</h2>
        <span className={`${ANCHOR_CLASSES} mr-auto`}><Link href="/">← Back</Link></span>
        <section>
          <h3>Current game mode</h3>
          <RadioGroup
            defaultValue={state.mode}
            name='game-mode'
            onChange={({ value }) => setMode(value)}
            options={GAME_MODE_OPTIONS}
          />
        </section>
      </div>
    </div>
  )
}

export default Settings

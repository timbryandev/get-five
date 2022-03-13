import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Header from '../components/header/header'
import RadioGroup from '../components/radio-group'
import {
  GAME_MODE_OPTIONS,
  TGameMode,
  useGameContext
} from '../contexts/gameContext'

const Settings: NextPage = () => {
  const { state, dispatch } = useGameContext()

  const setMode = (value: TGameMode) => {
    dispatch({ type: 'SET_MODE', payload: value })
  }

  const setShowTimer = (value: String) => {
    dispatch({ type: 'SET_TIMER', payload: { ...state.timer, show: value === 'Yes' } })
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
        <span className='bg-teal-500 px-7 py-2 mr-auto rounded-md text-md text-white font-semibold'>
          <Link href='/'>← Back</Link>
        </span>
        <section className='my-6'>
          <h3 className='text-xl font-bold'>Current game mode</h3>
          <RadioGroup
            defaultValue={state.mode}
            name='game-mode'
            onChange={({ value }) => setMode(value)}
            options={GAME_MODE_OPTIONS}
          />
        </section>
        <section className='my-6'>
          <h3 className='text-xl font-bold'>Show timer</h3>
          <RadioGroup
            defaultValue={state.timer.show ? 'Yes' : 'No'}
            name='show-timer'
            onChange={({ value }) => setShowTimer(value)}
            options={[
              ['Enabled', 'Yes'],
              ['Disabled', 'No']
            ]}
          />
        </section>
      </div>
    </div>
  )
}

export default Settings

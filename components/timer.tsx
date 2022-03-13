import { useEffect, useState } from 'react'

import { useGameContext } from '../contexts/gameContext'

const TIME_INCREMENT = 1000

function StopWatch (): JSX.Element {
  const { state: gameState, dispatch: gameDispatch } = useGameContext()
  const [isActive, setIsActive] = useState(false)
  const [time, setTime] = useState(0)

  const handleStart = (): void => {
    setIsActive(true)
  }

  const handlePauseResume = (): void => {
    setIsActive(!isActive)
    gameDispatch({
      type: 'SET_TIMER',
      payload: { active: !isActive }
    })
  }

  const handleReset = (): void => {
    setIsActive(false)
    setTime(0)
    gameDispatch({
      type: 'SET_TIMER',
      payload: { active: false, time: 0 }
    })
  }

  // Update timer on interval
  useEffect(() => {
    let interval: number = 0
    if (isActive) {
      interval = window.setInterval(() => {
        setTime(time => time + TIME_INCREMENT)
      }, TIME_INCREMENT)
    } else {
      window.clearInterval(interval)
    }

    return () => {
      window.clearInterval(interval)
    }
  }, [isActive])

  // Update our shared state when local time changes
  // Could be used for pausing current game state while navigating around?
  useEffect(() => {
    gameDispatch({
      type: 'SET_TIMER',
      payload: { time }
    })
  }, [gameDispatch, time])

  useEffect(() => {
    gameDispatch({
      type: 'SET_TIMER',
      payload: { active: true, time: 0 }
    })
    setIsActive(true)
  }, [gameDispatch])

  if (!gameState.timer.show) {
    return <></>
  }

  return (
    <div className='timer'>
      <div className='time'>
        <span className='digits'>
          {`0${Math.floor((time / 60000) % 60)}`.slice(-2)}:
        </span>
        <span className='digits'>
          {`0${Math.floor((time / 1000) % 60)}`.slice(-2)}:
        </span>
      </div>
      {/* Debugging CTAs and states */}
      <p>active={isActive.toString()}</p>
      <button onClick={handleStart}>handleStart</button>
      <br />
      <button onClick={handlePauseResume}>handlePauseResume</button>
      <br />
      <button onClick={handleReset}>handleReset</button>
      {/* End of Debugging */}
    </div>
  )
}

export default StopWatch

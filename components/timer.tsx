import { useEffect, useState } from 'react'

import { useGameContext } from '../contexts/gameContext'

const TIME_INCREMENT = 1000

function StopWatch (): JSX.Element {
  const { state: gameState } = useGameContext()
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval: number = 0

    if (isActive && !isPaused) {
      interval = window.setInterval(() => {
        setTime(time => time + TIME_INCREMENT)
      }, TIME_INCREMENT)
    } else {
      window.clearInterval(interval)
    }

    return () => {
      window.clearInterval(interval)
    }
  }, [isActive, isPaused])

  const handleStart = (): void => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePauseResume = (): void => {
    setIsPaused(!isPaused)
  }

  const handleReset = (): void => {
    setIsActive(false)
    setIsPaused(false)
    setTime(0)
  }

  if (!gameState.showTimer) {
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
      <p>isPaused={isPaused.toString()}</p>
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

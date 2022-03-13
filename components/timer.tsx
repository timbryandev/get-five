import { useEffect } from 'react'

import { useGameContext } from '../contexts/gameContext'

const TIME_INCREMENT = 1000

function StopWatch (): JSX.Element {
  const { state, dispatch } = useGameContext()

  // Update timer on interval
  useEffect(() => {
    let interval: number = 0
    if (state.timer.active) {
      interval = window.setInterval(() => {
        dispatch({
          type: 'SET_TIMER',
          payload: { time: state.timer.time + TIME_INCREMENT }
        })
      }, TIME_INCREMENT)
    } else {
      window.clearInterval(interval)
    }

    return () => {
      window.clearInterval(interval)
    }
  }, [state.timer, dispatch])

  useEffect(() => {
    const handleStart = (): void => {
      dispatch({
        type: 'SET_TIMER',
        payload: { active: true, time: 0 }
      })
    }

    // const handlePauseResume = (): void => {
    //   dispatch({
    //     type: 'SET_TIMER',
    //     payload: { active: !state.timer.active }
    //   })
    // }

    const handleReset = (): void => {
      dispatch({
        type: 'SET_TIMER',
        payload: { active: false, time: 0 }
      })
    }

    handleStart()
    return () => handleReset()
  }, [dispatch])

  if (!state.timer.show) {
    return <></>
  }

  return (
    <div className='timer'>
      <div className='time'>
        <span className='digits'>
          {`0${Math.floor((state.timer.time / 60000) % 60)}`.slice(-2)}:
        </span>
        <span className='digits'>
          {`0${Math.floor((state.timer.time / 1000) % 60)}`.slice(-2)}:
        </span>
      </div>
    </div>
  )
}

export default StopWatch

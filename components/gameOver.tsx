import { TGameStatus } from '../pages/index'
import Guesses from './guesses'

export interface IGameOverProps {
  answer: string
  children: React.ReactNode
  gameStatus: TGameStatus
  guesses: string[]
  onContinue: () => void
}

const GameOver: React.FC<IGameOverProps> = ({
  answer,
  guesses,
  children,
  gameStatus,
  onContinue
}: IGameOverProps) => {
  return (
    <div className='grid place-items-center'>
      <div className='text-center'>
        <Guesses guesses={guesses} answer={answer} gameStatus={gameStatus} />
        <h1 className='text-4xl font-bold'>{children}</h1>
        <h2>
          The answer was <span className='font-bold'>{answer}</span>
        </h2>
        <button
          className='bg-yellow-300 font-bold py-2 px-4 rounded mt-4 transition duration-300'
          onClick={() => onContinue()}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameOver

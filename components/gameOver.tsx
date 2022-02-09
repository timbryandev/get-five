import Guesses from './guesses'

export interface GameOverProps {
  answer: string
  guesses: string[]
  onContinue: () => void
}

const GameOver: React.FC<GameOverProps> = ({
  answer,
  guesses,
  children,
  onContinue
}) => {
  return (
    <div className='grid place-items-center'>
      <div className='text-center'>
        <Guesses guesses={guesses} answer={answer} />
        <h1 className='text-4xl font-bold'>{children}</h1>
        <h2>
          The answer was <span className='font-bold'>{answer}</span>
        </h2>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300'
          onClick={() => onContinue()}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameOver

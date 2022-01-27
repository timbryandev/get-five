import getLetterStatus from '../utils/getLetterStatus'

export interface GuessesProps {
  guesses: string[]
  answer: string
}
const Guesses: React.FC<GuessesProps> = ({ guesses, answer }) => {
  return (
    <ol className='m-4'>
      {guesses.map((guess, guessIndex) => (
        <li key={guessIndex} className='grid grid-cols-5'>
          {guess.split('').map((letter, letterIndex) => (
            <span
              key={letterIndex}
              className={`${
                getLetterStatus(guess, letterIndex, answer).color
              } h-12 w-12 text-2xl flex border-2 border-gray-300 p-1 m-1 box-border justify-center items-center`}
            >
              {letter}
            </span>
          ))}
        </li>
      ))}
    </ol>
  )
}

export default Guesses

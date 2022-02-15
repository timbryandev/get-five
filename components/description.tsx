const Description: React.FC = () => {
  return (
    <div className='text-center m-4'>
      <ul className='mt-4'>
        <li>Guess the word by typing it in the input below.</li>
        <li>You have 5 guesses.</li>
        <li>
          If a letter is in the correct location, it will be{' '}
          <span className='bg-green-300 font-bold p-1 rounded'>green</span>
        </li>
        <li>
          If a letter is in the word but in the wrong location, it will be{' '}
          <span className='bg-yellow-300 font-bold p-1 rounded'>yellow</span>
        </li>
        <li>
          If a letter is not in the word, it will be{' '}
          <span className='bg-gray-300 font-bold p-1 rounded'>gray</span>
        </li>
      </ul>
    </div>
  )
}

export default Description

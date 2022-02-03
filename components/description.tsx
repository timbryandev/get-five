const Description: React.FC = () => {
  return (
    <div className='text-center m-4'>
      <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-yellow-500'>
        Get5
      </h1>
      <ul className='mt-4'>
        <li>Guess the word by typing it in the input below.</li>
        <li>You have 5 guesses.</li>
        <li>
          If a letter is in the correct location, it will be{' '}
          <span className='bg-green-300 font-bold p-1'>green</span>
        </li>
        <li>
          If a letter is in the word but in the wrong location, it will be{' '}
          <span className='bg-yellow-300 font-bold p-1'>yellow</span>
        </li>
        <li>
          If a letter is not in the word, it will be{' '}
          <span className='bg-gray-300 font-bold p-1'>gray</span>
        </li>
      </ul>
    </div>
  )
}

export default Description

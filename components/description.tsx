const Description: React.FC = () => {
  return (
    <div className='text-center m-4'>
      <h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-yellow-500'>
        Get5
      </h1>
      <p className='italic'>Coz I know you&apos;re addicted :P</p>
      <ul className='mt-4'>
        <li>Guess the word by typing it in the input below.</li>
        <li>You have 5 guesses.</li>
        <li>
          If a letter is in the correct location, it will be{' '}
          <span className='text-green-500 font-bold'>green</span>
        </li>
        <li>
          If a letter is in the word but in the wrong location, it will be{' '}
          <span className='text-yellow-500 font-bold'>yellow</span>
        </li>
        <li>
          If a letter is not in the word, it will be{' '}
          <span className='text-gray-500 font-bold'>gray</span>
        </li>
      </ul>
    </div>
  )
}

export default Description

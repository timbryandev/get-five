export interface AboutProps {
  onClose: () => void
}

const AboutModal: React.FC<AboutProps> = ({ onClose }) => {
  return (
    <div className='bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0'>
      <div className='bg-white px-16 py-14 rounded-md text-center'>
        <h2 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-yellow-500 mb-5'>
          About Get5
        </h2>
        <p className='my-5'>
          Guess the 5 letter word with a mastermind codebreaking style game play
          with no play restrictions. To request new feature, see what&apos;s in
          the pipeline or even just clone a copy for yourself, you should view
          the project repo.
        </p>
        <p>
          View the project over at{' '}
          <a
            href='https://github.com/timbryandev/get-five'
            className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600 break-all'
          >
            https://github.com/timbryandev/get-five
          </a>
        </p>
        <button
          className='bg-green-500 px-7 py-2 mt-5 rounded-md text-md text-white font-semibold'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default AboutModal

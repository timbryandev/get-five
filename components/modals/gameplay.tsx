import { MAX_GUESSES } from '../../config/consts'
import Modal from './modal'

const GameplayModal: React.FC = () => (
  <Modal label='gameplay' title='Gameplay'>
    <p className='mt-5'>Guess the word by typing it in the input.</p>
    <p>You have {MAX_GUESSES} attempts.</p>
    <ul className='list-disc pl-5 mt-4'>
      <li>
        <p className='mt-2'>
          If a letter is in the correct location, it will be{' '}
          <span className='bg-green-300 font-bold p-1 rounded'>green</span>
        </p>
      </li>
      <li>
        <p className='mt-2'>
          If a letter is in the word but in the wrong location, it will be{' '}
          <span className='bg-yellow-300 font-bold p-1 rounded'>yellow</span>
        </p>
      </li>
      <li>
        <p className='mt-2'>
          If a letter is not in the word, it will be{' '}
          <span className='bg-gray-300 font-bold p-1 rounded'>grey</span>
        </p>
      </li>
      <li>
        <p className='mt-2'>
          Your attempt must match a word in our dictionary
        </p>
      </li>
    </ul>
  </Modal>
)

export default GameplayModal

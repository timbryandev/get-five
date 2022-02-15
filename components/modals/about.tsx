import Anchor from '../anchor'
import Modal from './modal'

const AboutModal: React.FC = () => (
  <Modal label='about' title='About'>
    <p className='mt-5'>
      Guess the 5 letter word with a mastermind codebreaking style game play
      with no play restrictions. To request new feature, see what&apos;s in the
      pipeline or even just clone a copy for yourself, you should view the
      project repo.
    </p>
    <p className='mt-5'>
      View the project over at{' '}
      <Anchor href='https://github.com/timbryandev/get-five'>
        https://github.com/timbryandev/get-five
      </Anchor>
    </p>
    <p className='mt-5'>
      If you&apos;d like to report a bug or request a new feature, please start
      a `New issue` here:{' '}
      <Anchor href='https://github.com/timbryandev/get-five/issues'>
        https://github.com/timbryandev/get-five/issues
      </Anchor>
    </p>
  </Modal>
)

export default AboutModal

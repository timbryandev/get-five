import Anchor from '../anchor'
import Modal from './modal'

const AboutModal: React.FC = () => (
  <Modal label='about' title='About'>
    <p>
      Guess the 5 letter word with a mastermind codebreaking style game play
      with no play restrictions. To request new feature, see what&apos;s in the
      pipeline or even just clone a copy for yourself, you should view the
      project repo.
    </p>
    <p>
      View the project over at{' '}
      <Anchor
        href='https://github.com/timbryandev/get-five'
      >
        https://github.com/timbryandev/get-five
      </Anchor>
    </p>
  </Modal>
)

export default AboutModal

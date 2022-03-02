import Anchor from '../anchor'
import Modal from './modal'

const CreditsModal: React.FC = () => (
  <Modal label='credits' title='Credits'>
    <h3 className='mt-5'>People:</h3>
    <ul className='list-disc p-5'>
      <li>
        Developed by <Anchor href='https://timbryan.dev'>@TimBryanDev</Anchor>
      </li>
      <li>
        {' '}
        Inspired by my wife who really enjoys the mechanics of the original game
        this is based on.
      </li>
      <li>
        <Anchor href='https://gist.github.com/banksean'>@banksean</Anchor> for
        the{' '}
        <Anchor href='https://gist.github.com/banksean/300494#file-mersenne-twister-js'>
          Mersenne Twister implementation in javascript
        </Anchor>{' '}
        which we leverage for better random number generation
      </li>
    </ul>
    <h3 className='mt-5'>Technologies:</h3>
    <ul className='list-disc p-5'>
      <li>
        <Anchor href='https://nextjs.org/'>NEXT.JS</Anchor>
      </li>
      <li>
        <Anchor href='https://tailwindcss.com'>tailwindcss</Anchor>
      </li>
      <li>
        <Anchor href='https://www.typescriptlang.org/'>TypeScript</Anchor>
      </li>
      <li>
        <Anchor href='https://vercel.com/'>Vercel</Anchor> for deployments and
        hosting
      </li>
    </ul>
  </Modal>
)

export default CreditsModal

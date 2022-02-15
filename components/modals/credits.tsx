import Anchor from '../anchor'
import Modal from './modal'

const CreditsModal: React.FC = () => (
  <Modal label='credits' title='Credits'>
    <p>
      Developed by{' '}
      <Anchor
        href='https://timbryan.dev'
      >
        @TimBryanDev
      </Anchor>
    </p>
    <p className='mt-5'>Inspired by my wife, who really enjoys the game mechanics of the original game this is based on.</p>
    <p className='mt-5'>Technologies:</p>
    <ul className='list-disc p-5'>
      <li><Anchor href='https://www.npmjs.com/package/@genzou/random-words'>@genzou/random-words</Anchor> -  for random word generation</li>
      <li><Anchor href='https://nextjs.org/'>NEXT.JS</Anchor></li>
      <li><Anchor href='https://tailwindcss.com'>tailwindcss</Anchor></li>
      <li><Anchor href='https://www.typescriptlang.org/'>TypeScript</Anchor></li>
      <li><Anchor href='https://vercel.com/'>Vercel</Anchor> - for deployments and hosting</li>
    </ul>
  </Modal>
)

export default CreditsModal

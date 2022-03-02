import { useState } from 'react'

import Modal from './modal'

const FORM_URL = 'https://formspree.io/f/meqrploz'

const Contact: React.FC = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    const xhr = new window.XMLHttpRequest()
    setStatus('')

    if (email === '' || message === '') {
      setStatus('ERROR')
      return
    }

    event.preventDefault()

    const data = new window.FormData()
    data.append('email', email)
    data.append('message', message)

    xhr.open('POST', FORM_URL)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== window.XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        setStatus('SUCCESS')
      } else {
        setStatus('ERROR')
      }
    }
    xhr.send(data)
  }

  return (
    <Modal label='contact' title='Get In Touch'>
      <form className='contact-form' onSubmit={handleSubmitForm} style={{ width: '40vh' }}>
        <fieldset disabled={status === 'SUCCESS'}>
          <article className='contact-form__content'>
            <div className='contact-form__row flex flex-col items-center'>
              <label htmlFor='email'>Email:</label>{' '}
              <input
                id='email'
                className="border rounded p-2 w-full"
                name='email'
                type='email'
                placeholder='user@example.com'
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className='contact-form__row flex flex-col items-center mt-5'>
              <label htmlFor='message'>Message:</label>{' '}
              <textarea
                id='message'
                className="border rounded p-2 max-w-screen-sm w-full"
                rows={10}
                name='message'
                placeholder='Hi - I have something interesting to say to you, Tim!'
                required
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
              />
            </div>
            <div className='contact-form__row flex flex-col mt-5'>
              {status === 'SUCCESS'
                ? (
                <p>Thanks!</p>
                  )
                : (
                <button className='button bg-green-500 px-7 py-2 rounded-md text-md text-white font-semibold'>Submit</button>
                  )}
              {status === 'ERROR' && <p>Ooops! There was an error.</p>}
            </div>
          </article>
        </fieldset>
      </form>
    </Modal>
  )
}

export default Contact

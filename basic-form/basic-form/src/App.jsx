import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className='flex justify-center h-screen items-center'>
      <form className='flex fex-col w-md gap-2'>
        <h1>Contact Form</h1>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name'/> 

        <label htmlFor="email">Email</label>
        <input type="text" name='email' id='email'/> 

        <label htmlFor="Message">Message</label>
        <textarea type="text" name='message' id='message' rows={4}/>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App

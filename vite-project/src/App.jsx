import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // State for password length
  const [length, setlength] = useState(8);

  // State for including numbers in password
  const [numberallowed, setnumberallowed] = useState(false);

  // State for including special characters in password
  const [characterallow, setcharacter] = useState(false);

  // State for storing generated password
  const [password, setpassword] = useState("")

  // Reference for password input field
  const passwordRef = useRef(null);

  // Function to copy password to clipboard
  const copytoclip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  // Function to generate password
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallowed) {
      str += "0123456789";
    }
    if (characterallow) {
      str += "!@#$%^&*()_+{}:";
    }
    for (let i = 1; i <= length; i++) { 
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); 
    }
    setpassword(pass);
  }, [length, numberallowed, characterallow, setpassword]);

  // Generate password when dependencies change
  useEffect(() => {
    passwordgenerator();
  }, [length, numberallowed, characterallow, passwordgenerator]);

  // JSX code for rendering the component
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#282c34' }}>
      <h1 className='text-4xl text-center text-white'>Password Generator</h1>
      <div className='w-full max-w-md rounded-lg px-4 py-4 text-blue-600 bg-gray-700 mt-4'>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button 
            onClick={copytoclip}
            className='outline-none bg-pink-300 px-3 py-0.5 shrink-0'
          > 
            Copy 
          </button>
        </div>
        <div className='flex text-sm gap-x-2'></div>
        <div className='flex items-center gap-x-1'>
          <input type="range"
            min={6}
            max={20}
            value={length}
            className='cursor-pointer' 
            onChange={(e) => { setlength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            id="numberInput"
            onChange={() => {
              setnumberallowed((prev) => !prev)
            }}
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={characterallow}
            id="characterInput"
            onChange={() => {
              setcharacter((prev) => !prev)
            }}
          />
          <label htmlFor="characterInput">Include Special Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App




// Changes made:

// Wrapped the entire content in a parent div with inline styles to center the content vertically and horizontally using Flexbox.
// Added mt-4 class to the inner div for some margin-top to separate the heading and the content slightly.
// This keeps the password generator directly under the heading, centered both vertically and horizontally on the page.


// 2/2










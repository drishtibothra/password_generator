import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null); //by default passwordRef is null.

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "1234567890";
    if (characterAllowed) str += "!@#$%^&*~`";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);

  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copytoClipBoard = () => { //this is the function which we are referring to in the copy button
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => { passwordGenerator() }, [length, characterAllowed, numberAllowed, passwordGenerator])

  return (
    <div>
      <div className="container w-[50vw] rounded-2xl space-y-3" style={{ backgroundColor: "grey" }}>

        <h2 className='text-2xl text-black p-2'>Password generator</h2>

        <div className="flex items-center justify-center p-2">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="text-yellow-900 font-bold w-[20vw] h-[5vh] px-2 rounded-sm"
            style={{ backgroundColor: "white" }}
            ref={passwordRef} //changing the reference to the password
          />
          <button
            onClick={copytoClipBoard}
            className="flex items-center justify-center text-black h-[5vh] w-[5vw] hover:text-white"
            style={{ backgroundColor: "blue" }}
          >
            copy
          </button>
        </div>

        <div className="options flex justify-center space-x-2 p-2 pr-1">
          <div>
            <input type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => { setLength(e.target.value) }} />
            <label className='text-black ml-1'>Length: {length}</label>
          </div>
          <div>
            <input type="checkbox"
              className='bg-white'
              defaultChecked={numberAllowed}
              onChange={() => { setNumberAllowed((prev) => !prev) }}
            //we will not directly change it to true, otherwise it will remain true all the time. 
            />
            <label className='text-black m-1'>Numbers</label>
          </div>
          <div>
            <input type="checkbox"
              defaultChecked={characterAllowed} 
              onChange={() => { setCharacterAllowed((prev) => !prev) }}
            />
            <label className='text-black m-1'>Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
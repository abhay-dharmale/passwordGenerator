import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

export default function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState('')

  //ref hook
  const copyRef = useRef(null)

  const passGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(number) str += '0123456789';
    if(characters) str += '!@#$%^&*()_+-=[]{}|';

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

      setPassword(pass);
    }
    
  }, [length, number, characters, setPassword])

  const copyPassword = useCallback(()=>{
    copyRef.current?.select()
    // copyRef.current?.setSelectionRange(0, 99)

    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect(()=>{
    passGenerator()
  },[length, number, characters, passGenerator])

  
  return (
    <main className='h-screen w-full text-white bg-zinc-800 p-10'>
      <div className='w-full max-w-md mx-auto rounded-md px-4 py-6 bg-zinc-700'>
      <h1 className='text-2xl text-center mb-4'>Password Generator</h1>
        <div className='flex overflow-hidden mb-4 rounded-md'>
          <input className='outline-none w-full py-1 px-3 text-orange-700' type='text' value={password} placeholder='Password' readOnly ref={copyRef}/>
          <button className='outline-none bg-blue-500 px-5 py-2 text-sm shrink-0'
            onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input className='cursor-pointer' 
              type='range' min={6} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={number}
              id='numberInput'
              onChange={()=>{
                setNumber((prev)=>!prev)
              }}/>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={characters}
              id='charInput'
              onChange={()=>{
                setNumber((prev)=>!prev)
              }}/>
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
        </div>
    </main>
  )
}

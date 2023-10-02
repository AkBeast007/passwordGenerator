import { useState,useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [numaAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");


  const passwordgen = useCallback(()=>{
    
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numaAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+[]{}~"

    for(let i=1; i<=length; i++){
           let char = Math.floor(Math.random() * str.length + 1);
           pass += str.charAt(char);

           setpassword(pass);
    }

  },[length,numaAllowed,charAllowed]);


  // const passcopytoclipboard = ()=>{
  //   window.navigator.clipboard.writeText(password);
  //   alert("Password copied to clipboard");
  // }

  //optimized way of copying to clipboard using useCallback hook

    const passcopytoclipboard = useCallback(()=>{
       window.navigator.clipboard.writeText(password);
       alert("Password copied to clipboard");
  },[password])

  useEffect(()=>passwordgen(),[length,numaAllowed,charAllowed,passwordgen])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-10 py-5 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3 text-2xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
           <input type="text"
            value = {password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly 
            />
            <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={passcopytoclipboard}>COPY</button>
        </div>

        <div className='flex text-sm gap-x-1'>
          <div className='flex items-center gap-x-1'>
               <input type="range"
                min = {6}
                max = {100}
                value={length}
                className='cursor-pointer'
                onChange={(e)=>{setlength(e.target.value)}} />

                <label>Label: {length}</label>
          </div>
          <div className='flex items-center gap-x-1 px-3'>
            <input type="checkbox"
             defaultChecked = {numaAllowed}
             id='numberinput'
             onChange={()=>
             {setnumAllowed((prev)=>!prev)}} 
             />
             <label htmlFor="numberinput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
             defaultChecked = {charAllowed}
             id='charinput'
             onChange={()=>
             {setcharAllowed((prev)=>!prev)}} 
             />
             <label htmlFor="charinput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

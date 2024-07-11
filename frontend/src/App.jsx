import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './Home'
import Login from './Login'
import Sign from './sign'
import Repo from './repo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/repo/:ro' element={<Repo/>}/>
      </Routes>
    </>
  )
}

export default App

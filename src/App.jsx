import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserCrud from './components/User'
function App() {
  const [count, setCount] = useState(0)

  return (
    
     <UserCrud></UserCrud>
 
  )
}

export default App

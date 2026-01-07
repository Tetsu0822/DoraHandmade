import { useState } from 'react'
import axios from 'axios'
import { ShoppingCart, User, BookOpen } from 'lucide-react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-secondary border border-primary-100">Vite + React</h1>
      <div className="text-center bg-primary-50 mt-5">
        <button className="btn btn-primary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <ShoppingCart strokeWidth={2.5} />
        <User strokeWidth={2.5} />
        <BookOpen />
      </div>
    </>
  )
}

export default App

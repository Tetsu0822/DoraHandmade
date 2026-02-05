import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import routes from './routes/index.jsx'
import './assets/scss/all.scss'
//import App from './App.jsx'

const router = createHashRouter(routes)
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

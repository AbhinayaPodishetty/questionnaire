import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Audioquestions from './components/Audioquestions.jsx'
import Thankyou from './components/Thankyou.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Instructions from './components/Instructions.jsx'
import Home from './components/Home.jsx'
import Review from './components/Review.jsx'

createRoot(document.getElementById('root')).render(
<App></App>
)

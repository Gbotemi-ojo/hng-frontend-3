import { useState } from 'react'
import Gallery from './component/gallery/gallery'
import Signin from './component/signIn/signin'
import RouteSwitch from './component/router/router'
import './App.css'

function App() {
  return (
    <>
    <RouteSwitch />
    </>
  )
}

export default App

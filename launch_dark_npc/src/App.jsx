import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './game'

function App() {
  console.log(useFlags());
  
  return (
    <>
      <Game/>
    </>
  )    
}

export default withLDProvider({
  clientSideID: '664e4326c06507107c5f123a',
  key: 'christmas????',
  options: {
    bootstrap: 'localStorage'
  },
})(App);
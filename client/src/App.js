import React from 'react'
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'

function App() {
  const routes = useRoutes(false)

  return (
    <div className="container" style={{ backgroundColor: '#4dd0e1' }}>
      <Router>{routes}</Router>
    </div>
  )
}

export default App

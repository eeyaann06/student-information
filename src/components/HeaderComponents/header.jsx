import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderComponent() {
  return (
    <header className="site-header">
      <div>
        <h1 className="brand">Student Information</h1>
        <p className="tag">Private students · Public API students</p>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
      </nav>
    </header>
  )
}
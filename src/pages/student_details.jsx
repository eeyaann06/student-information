import React, { useEffect, useState } from 'react'
import { fetchStudent } from '../api/student_api'
import { useParams, Link } from 'react-router-dom'

export default function StudentDetail() {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchStudent(id)
      .then((s) => mounted && setStudent(s))
      .catch((err) => mounted && setError(err.message))
      .finally(() => mounted && setLoading(false))
    return () => (mounted = false)
  }, [id])

  if (loading) return <p>Loading student...</p>
  if (error) return <p style={{color:'red'}}>Error: {error}</p>
  if (!student) return <p>No student found.</p>

  return (
    <div>
      <h2>{student.name}</h2>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Major:</strong> {student.major}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <Link to="/">← Back to list</Link>
    </div>
  )
}
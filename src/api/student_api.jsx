// simple API helper using fetch (keeps project dependency-free; axios included as alternative)
const API_BASE = '../../public/'

export async function fetchStudents() {
  // simulate a network request to /api/students (we'll provide a static JSON in public/api)
  const res = await fetch(`${API_BASE}/student.json`)
  if (!res.ok) throw new Error('Failed to fetch students')
  return res.json()
}

export async function fetchStudent(id) {
  const res = await fetch(`${API_BASE}/students.json`)
  if (!res.ok) throw new Error('Failed to fetch student')
  const all = await res.json()
  const found = all.find((s) => String(s.id) === String(id))
  if (!found) throw new Error('Student not found')
  return found
}
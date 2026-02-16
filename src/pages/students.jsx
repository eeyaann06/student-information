import React, { useEffect, useState } from 'react'
import Student from '../components/StudentComponents/students'
import Modal from '../components/StudentComponents/modal'
import StudentCard from '../components/StudentComponents/student_card'
import { fetchStudents } from '../api/student_api'

export default function Students() {
  const [tab, setTab] = useState('private') // 'private' | 'public'

  // private students (local JSON)
  const [privateList, setPrivateList] = useState([])
  const [pLoading, setPLoading] = useState(true)
  const [pError, setPError] = useState(null)

  // public students (JSONPlaceholder)
  const [publicList, setPublicList] = useState([])
  const [uLoading, setULoading] = useState(true)
  const [uError, setUError] = useState(null)

  const [selected, setSelected] = useState(null)

  useEffect(() => {
    let mounted = true
    fetchStudents()
      .then((d) => mounted && setPrivateList(d))
      .catch((e) => mounted && setPError(e.message))
      .finally(() => mounted && setPLoading(false))

  fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('Network response not ok')
        return res.json()
      })
      .then((data) => {
        if (!mounted) return
    // request 10 users if available; map to student shape
    const mapped = data.slice(0, 10).map((u, idx) => ({
          id: u.id,
          name: u.name,
          age: 18 + (idx % 5),
          major: ['Computer Science', 'Mathematics', 'Biology', 'History'][idx % 4],
          email: u.email,
        }))
        setPublicList(mapped)
      })
      .catch((e) => mounted && setUError(e.message))
      .finally(() => mounted && setULoading(false))

    return () => (mounted = false)
  }, [])

  return (
    <div className="container">
      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:18}}>
        <h2 style={{margin:0}}>Students</h2>
        <div className="tabs">
          <button className={`tab ${tab==='private'?'active':''}`} onClick={() => setTab('private')}>Private</button>
          <button className={`tab ${tab==='public'?'active':''}`} onClick={() => setTab('public')}>Public (API)</button>
        </div>
      </div>

      {tab === 'private' && (
        <div>
          {pLoading && <p>Loading private students...</p>}
          {pError && <p style={{color:'red'}}>Error: {pError}</p>}
          <div className="grid">
            {privateList.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
        </div>
      )}

      {tab === 'public' && (
        <div>
          {uLoading && <p>Loading public students...</p>}
          {uError && <p style={{color:'red'}}>Error: {uError}</p>}
          <div className="grid">
            {publicList.map((s) => (
              <Student key={s.id} student={s} onClick={(st) => setSelected(st)} />
            ))}
          </div>
          {/* modal for detail */}
          {selected && (
            <>
              <Modal open={!!selected} onClose={() => setSelected(null)}>
                <h3>{selected.name}</h3>
                <p><strong>Age:</strong> {selected.age}</p>
                <p><strong>Major:</strong> {selected.major}</p>
                <p><strong>Email:</strong> {selected.email}</p>
              </Modal>
            </>
          )}
        </div>
      )}
    </div>
  )
}
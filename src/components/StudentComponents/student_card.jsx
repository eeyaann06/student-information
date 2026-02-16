import React from 'react'

export default function StudentCard({ student, onClick }) {
  const color = `hsl(${(student.id || 1) * 47 % 360} 85% 55%)`
  return (
    <div
      className="student-card"
      onClick={() => onClick?.(student)}
      style={{
        borderRadius: 8,
        margin: 8,
        cursor: onClick ? 'pointer' : 'default',
        padding: 14,
        boxSizing: 'border-box'
      }}
    >
      <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',gap:12}}>
        <div style={{width:44,height:44,borderRadius:8,background:color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#fff'}}>
          {String(student.name || '').split(' ').map((n)=>n[0]).slice(0,2).join('')}
        </div>
        <div style={{flex:1,textAlign:'left'}}>
          <h3 className="student-name" style={{margin:0}}>{student.name}</h3>
          <div style={{fontSize:13,opacity:0.9,color:'var(--muted)'}}>{student.major} · {student.age}</div>
        </div>
      </div>
    </div>
  )
}
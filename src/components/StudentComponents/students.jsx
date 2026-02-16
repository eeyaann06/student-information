import React, { useState } from 'react'

export default function Student({ student, onClick }) {
  const [showEmail, setShowEmail] = useState(false)

  const accent = `hsl(${(student.id || 1) * 47 % 360} 80% 60%)`

  return (
    <div
      onClick={() => onClick?.(student)}
      style={{
        border: '1px solid rgba(0,0,0,0.06)',
        padding: 14,
        borderRadius: 10,
        margin: 8,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
        cursor: onClick ? 'pointer' : 'default',
        width: 300,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        color: 'var(--text)'
      }}
    >
      <div style={{display:'flex',alignItems:'center',gap:12,width:'100%'}}>
        <div style={{width:44,height:44,borderRadius:8,background:accent,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'#fff'}}>
          {String(student.name || '').split(' ').map((n)=>n[0]).slice(0,2).join('')}
        </div>
        <div style={{flex:1,textAlign:'left'}}>
          <h3 style={{margin:0,color:'var(--accent)'}}>{student.name}</h3>
          <div style={{fontSize:13,opacity:0.9,color:'var(--muted)'}}>{student.major} · {student.age}</div>

          <div style={{marginTop:10}}>
            <button onClick={(e) => { e.stopPropagation(); setShowEmail((s) => !s) }} style={{padding:'6px 10px',borderRadius:8,border:'1px solid rgba(0,0,0,0.08)',background:'transparent',color:'var(--text)'}}>
              {showEmail ? 'Hide Email' : 'Show Email'}
            </button>
            {showEmail && <p style={{marginTop:8,color:'var(--text)'}}><strong>Email:</strong> {student.email}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
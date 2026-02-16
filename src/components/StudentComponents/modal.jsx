import React from 'react'

export default function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:60}} onClick={onClose}>
      <div style={{background:'white',color:'#111',padding:20,borderRadius:12,minWidth:320}} onClick={(e)=>e.stopPropagation()}>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button onClick={onClose} style={{border:'none',background:'transparent',fontSize:18}}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
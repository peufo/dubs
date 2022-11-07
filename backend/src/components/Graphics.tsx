import React from 'react'

// /admin
export const Icon = () => (
  <div style={{ display: 'flex', gap: '1.5em', alignItems: 'center' }}>
    <img
      src='/img/logo-borderless.png'
      width={40}
      style={{ background: '#fff', borderRadius: '50%', padding: '4px' }}
    />
    <div style={{ lineHeight: '16px' }}>
      Dubs <br />
      Apiculture <br />
    </div>
  </div>
)

// /admin/login
export const Logo = () => (
  <div style={{ display: 'flex', gap: '1.5em', alignItems: 'center' }}>
    <img
      src='/img/logo-borderless.png'
      width={120}
      style={{ background: '#fff', borderRadius: '50%', padding: '4px' }}
    />
    <div style={{ fontSize: '40px', lineHeight: '40px' }}>
      Dubs <br />
      Apiculture <br />
      <span style={{ fontSize: '20px', lineHeight: '10px', opacity: 0.5 }}>
        Gestion du contenu
      </span>
    </div>
  </div>
)

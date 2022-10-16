import React from 'react'

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
      Appiculture <br />
    </div>
  </div>
)

// /admin
export const Icon = () => (
  <img
    src='/img/logo-borderless.png'
    width={40}
    style={{ background: '#fff', borderRadius: '50%', padding: '4px' }}
  />
)

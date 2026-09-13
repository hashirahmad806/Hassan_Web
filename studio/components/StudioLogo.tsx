import React from 'react'

/**
 * Custom Luxury Hallmark Logo for Dr. Hassan's Sanity Studio Header
 */
export function StudioLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '3px 8px',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #D0B892 0%, #9C8259 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(208, 184, 146, 0.45)',
          color: '#0f0d0b',
          fontWeight: 800,
          fontSize: '14px',
          fontFamily: "'Playfair Display', Georgia, serif",
          flexShrink: 0,
        }}
      >
        H
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '14.5px',
              letterSpacing: '-0.01em',
              color: '#f0e8d8',
              lineHeight: 1.15,
            }}
          >
            Dr. Hassan
          </span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#D0B892',
              display: 'inline-block',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: '8px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#D0B892',
            lineHeight: 1,
          }}
        >
          Clinic Studio
        </span>
      </div>
    </div>
  )
}

/**
 * Minimalist monogram icon for browser favicon and workspace switcher
 */
export function StudioIcon() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #D0B892 0%, #9C8259 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0f0d0b',
        fontWeight: 800,
        fontSize: '12px',
        fontFamily: "'Playfair Display', Georgia, serif",
      }}
    >
      H
    </div>
  )
}

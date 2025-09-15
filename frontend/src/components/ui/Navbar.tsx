'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', height: '64px', backgroundColor: '#fff', boxShadow: '0 2px 8px #f0f1f2' }}>
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
        <Link href="/" style={{ color: '#722ed1', textDecoration: 'none' }}>
          Heritage Bridge
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Link
          href="/"
          style={{
            color: pathname === '/' ? '#722ed1' : '#000',
            textDecoration: 'none',
            fontWeight: pathname === '/' ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Join Us
        </Link>
        <Link
          href="/our-members"
          style={{
            color: pathname === '/our-members' ? '#722ed1' : '#000',
            textDecoration: 'none',
            fontWeight: pathname === '/our-members' ? 'bold' : 'normal',
            padding: '8px 16px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Our Members
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

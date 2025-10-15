'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('user'));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    window.location.href = '/login';
  };

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
        {loggedIn ? (
          <>
            <Link href="/detail" style={{ color: pathname === '/detail' ? '#722ed1' : '#000', textDecoration: 'none', fontWeight: pathname === '/detail' ? 'bold' : 'normal', padding: '8px 16px', borderRadius: '4px', transition: 'background-color 0.3s' }}>Details</Link>
            <button onClick={handleLogout} style={{ marginLeft: 12 }}>Logout</button>
          </>
        ) : (
          <Link href="/login" style={{ color: pathname === '/login' ? '#722ed1' : '#000', textDecoration: 'none', fontWeight: pathname === '/login' ? 'bold' : 'normal', padding: '8px 16px', borderRadius: '4px', transition: 'background-color 0.3s' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

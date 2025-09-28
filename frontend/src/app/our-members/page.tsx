'use client';

import React, { useEffect, useState } from 'react';
import MemberCard from '@/components/OurMembers/MemberCard';
import { Member } from '@/types';

const OurMembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/members')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        return response.json();
      })
      .then((fetchedMembers: any[]) => {
        setMembers(fetchedMembers.map(m => ({ ...m, id: m._id })));
      })
      .catch(error => {
        console.error('Error fetching members:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '24px' }}>Loading members...</div>;
  }

  return (
    <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <h1 style={{ width: '100%', marginBottom: '24px' }}>Our Members</h1>
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default OurMembersPage;

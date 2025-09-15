'use client';

import React from 'react';
import MemberCard from '@/components/OurMembers/MemberCard';
import members from '@/data/members';

const OurMembersPage: React.FC = () => {
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

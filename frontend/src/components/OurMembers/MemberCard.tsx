'use client';

import React from 'react';
import { Card, Button } from 'antd';
import { Member } from '@/types';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <Card
      hoverable
      style={{ width: 320, margin: '16px' }}
      cover={
        <img
          alt={member.fullName}
          src={member.profileImage}
          style={{ height: 250, objectFit: 'cover' }}
        />
      }
    >
      <Card.Meta
        title={member.fullName}
        description={
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>{member.role}</span>
              <span>£{member.hourlyRate}/hr</span>
            </div>
            <Button type="primary" block href={`mailto:${member.email}`}>
              Contact
            </Button>
          </>
        }
      />
    </Card>
  );
};

export default MemberCard;

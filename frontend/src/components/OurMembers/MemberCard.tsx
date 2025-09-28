'use client';

import React from 'react';
import { Card, Button } from 'antd';
import Image from 'next/image';
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
        <Image
          alt={member.fullName}
          src={`http://localhost:5000${member.profileImage}`}
          width={320}
          height={250}
          style={{ objectFit: 'cover' }}
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

'use client';

import React from 'react';
import { Card, Button } from 'antd';
import Image from 'next/image';
import { Member } from '@/types';

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  // Support both base64 and URL images
  let imageSrc = '';
  if (member.profileImage) {
    if (member.profileImage.startsWith('data:image/')) {
      imageSrc = member.profileImage;
    } else if (member.profileImage.startsWith('/uploads/')) {
      imageSrc = `http://localhost:5000${member.profileImage}`;
    } else {
      imageSrc = member.profileImage;
    }
  }
  return (
    <Card
      hoverable
      style={{ width: 320, margin: '16px' }}
      cover={
        imageSrc ? (
          <Image
            alt={member.fullName}
            src={imageSrc}
            width={320}
            height={250}
            style={{ objectFit: 'cover' }}
          />
        ) : null
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

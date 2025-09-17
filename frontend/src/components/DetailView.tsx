'use client';

import React from 'react';
import { Card, Row, Col, Avatar, Tag, Divider } from 'antd';
import { PricingData } from '@/types';

interface DetailViewProps {
  data: PricingData;
}

const DetailView: React.FC<DetailViewProps> = ({ data }) => {

  const normalizedCountryCode = `+${data.countryCode.replace(/^\++/, '')}`;
  const normalizedMobileNumber = data.mobileNumber.replace(/^\++/, '');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Submission Details</h1>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="Profile">
            {data.profileImage && (
              <Avatar size={100} src={data.profileImage.startsWith('data:image/') ? data.profileImage : `data:image/jpeg;base64,${data.profileImage}`} />
            )}
            <p><strong>Full Name:</strong> {data.fullName}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Role:</strong> {data.role}</p>
            <p><strong>Company:</strong> {data.company}</p>
            <p><strong>Telephone:</strong> {normalizedCountryCode} {normalizedMobileNumber}</p>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>LinkedIn:</strong> {data.linkedIn}</p>
          </Card>
        </Col>
        <Col xs={24} lg={16}>
          <Card title="Contribution Details">
            <p><strong>Skills:</strong></p>
            {data.skills.map(skill => <Tag key={skill}>{skill}</Tag>)}
            <p><strong>Other Skills:</strong> {data.otherSkills}</p>
            <p><strong>Hours Contributed:</strong> {data.hoursContributed}</p>
            <p><strong>Hourly Rate:</strong> {data.contributionHourlyRate}</p>
            <p><strong>Discount Offered:</strong> {data.discountOffered}</p>
            <p><strong>Public Listing:</strong> {data.publicListing}</p>
            <p><strong>Consent to Contact:</strong> {data.consentContact ? 'Yes' : 'No'}</p>
            <Divider />
            <p><strong>Country:</strong> {data.country}</p>
            <p><strong>Mobile Number:</strong>{normalizedCountryCode} {normalizedMobileNumber}</p>
            <p><strong>Is Full Day:</strong> {data.isFullDay ? 'Yes' : 'No'}</p>
            <p><strong>Working Hours:</strong> {data.workingHours}</p>
            <p><strong>Extra Hours:</strong> {data.extraHours}</p>
            <p><strong>Total Amount:</strong> {data.totalAmount !== 0 ? data.totalAmount : 'N/A'}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailView;

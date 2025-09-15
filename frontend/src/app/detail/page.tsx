'use client';

import React, { useEffect, useState } from 'react';
import DetailView from '@/components/DetailView';
import { PricingData } from '@/types';

const DetailPage: React.FC = () => {
  const [data, setData] = useState<PricingData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('submittedData');
    if (storedData) {
      try {
        const parsedData: PricingData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, []);

  if (!data) {
    return <div style={{ padding: '20px' }}>No submission data found. Please submit the form first.</div>;
  }

  return <DetailView data={data} />;
};

export default DetailPage;

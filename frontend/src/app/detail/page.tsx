'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DetailView from '@/components/DetailView';
import { PricingData } from '@/types';

const DetailPage: React.FC = () => {
  const [data, setData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/members/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          return response.json();
        })
        .then((fetchedData: PricingData) => {
          setData(fetchedData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (!data) {
    return <div style={{ padding: '20px' }}>No submission data found. Please submit the form first.</div>;
  }

  return <DetailView data={data} />;
};

export default DetailPage;

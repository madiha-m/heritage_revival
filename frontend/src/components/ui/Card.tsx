import React from 'react';
import { Card as AntCard } from 'antd';
import styles from './Card.module.css';

interface CardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
    return (
        <AntCard
            title={title}
            className={`${styles.card} ${className}`}
            headStyle={{ backgroundColor: '#f0f2f5', borderBottom: '1px solid #d9d9d9' }}
        >
            {children}
        </AntCard>
    );
};

export default Card;
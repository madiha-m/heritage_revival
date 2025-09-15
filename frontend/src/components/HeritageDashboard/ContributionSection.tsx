import React from 'react';
import { Checkbox, Input, Radio, Space } from 'antd';
import styles from './styles.module.css';

const skillsOptions = [
    'Architecture / Interior Design',
    'Legal Advice',
    'Branding / Graphic Design',
    'Marketing / Social Media',
    'Research / Academic Input',
    'Heritage Consultancy',
    'Business Mentoring / Start-up Help',
    'Other'
];

interface ContributionSectionProps {
    data: {
        skills: string[];
        otherSkills: string;
        hoursContributed: string;
        contributionHourlyRate: string;
        discountOffered: string;
    };
    onChange: (field: string, value: any) => void;
}

const ContributionSection: React.FC<ContributionSectionProps> = ({ data, onChange }) => {
    const handleSkillChange = (skill: string) => {
        const newSkills = data.skills.includes(skill)
            ? data.skills.filter(s => s !== skill)
            : [...data.skills, skill];
        onChange('skills', newSkills);
    };

    return (
        <div className={styles.section}>
            <h3>Your Contribution</h3>

            <div className={styles.formGroup}>
                <label>What kind of support can you offer? *</label>
                <div className={styles.checkboxGroup}>
                    {skillsOptions.map(skill => (
                        <Checkbox
                            key={skill}
                            checked={data.skills.includes(skill)}
                            onChange={() => handleSkillChange(skill)}
                            className={styles.checkbox}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            {skill}
                        </Checkbox>
                    ))}
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>Other / Additional Skills or Services *</label>
                    <Input
                        value={data.otherSkills}
                        onChange={(e) => onChange('otherSkills', e.target.value)}
                        placeholder="Other Skills"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>How many hours can you contribute (free of charge)? *</label>
                    <Input
                        value={data.hoursContributed}
                        onChange={(e) => onChange('hoursContributed', e.target.value)}
                        placeholder="eg., 1 hour/month"
                        required
                    />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>What is your usual hourly rate (if applicable)? *</label>
                    <Input
                        value={data.contributionHourlyRate}
                        onChange={(e) => onChange('contributionHourlyRate', e.target.value)}
                        placeholder="e.g., £45/hour – for internal value tracking"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Are you willing to offer additional hours at a discounted rate? *</label>
                    <Radio.Group
                        value={data.discountOffered}
                        onChange={(e) => onChange('discountOffered', e.target.value)}
                        className={styles.radioGroup}
                    >
                        <Space direction='horizontal'>
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};

export default ContributionSection;
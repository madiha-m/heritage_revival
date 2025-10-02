import React from 'react';
import { Input, Form } from 'antd';
import CountrySelector from './CountrySelector';
import PhoneInput from './PhoneInput';
import styles from './styles.module.css';

interface PersonalDetailsSectionProps {
    form: any;
    country: string;
    mobileNumber: string;
    countryCode: string;
    onCountryChange: (country: string) => void;
    onChange: (field: string, value: string) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ form, country, mobileNumber, countryCode, onCountryChange, onChange }) => {
    return (
        <div className={styles.section}>
            <h3>Personal and Professional Details</h3>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter your full name' }]}
                    >
                        <Input placeholder="Your Name" />
                    </Form.Item>
                </div>

                <div className={styles.formGroup}>
                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input type="email" placeholder="Email" />
                    </Form.Item>
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <Form.Item
                        label="Professional Title / Role"
                        name="role"
                        rules={[{ required: true, message: 'Please enter your role' }]}
                    >
                        <Input placeholder="e.g., Architect, Solicitor, Designer, Lecturer" />
                    </Form.Item>
                </div>

                <div className={styles.formGroup}>
                    <Form.Item
                        label="Company Name / Employer (if any)"
                        name="company"
                    >
                        <Input placeholder="Company Name" />
                    </Form.Item>
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <CountrySelector
                        value={country}
                        onChange={onCountryChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <Form.Item
                        label="Location / City / Region"
                        name="location"
                        rules={[{ required: true, message: 'Please enter your location' }]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <PhoneInput
                        countryCode={countryCode}
                        mobileNumber={mobileNumber}
                        onCountryCodeChange={(code) => onChange('countryCode', code)}
                        onMobileNumberChange={(number) => onChange('mobileNumber', number)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <Form.Item
                        label="LinkedIn Profile or Website (if available)"
                        name="linkedIn"
                    >
                        <Input placeholder="Type your url" />
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsSection;

import React from 'react';
import { Input } from 'antd';
import CountrySelector from './CountrySelector';
import PhoneInput from './PhoneInput';
import styles from './styles.module.css';

interface PersonalDetailsSectionProps {
    data: {
        fullName: string;
        email: string;
        role: string;
        company: string;
        telephone: string;
        location: string;
        linkedIn: string;
    };
    country: string;
    mobileNumber: string;
    countryCode: string;
    onCountryChange: (country: string) => void;
    onChange: (field: string, value: string) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ data, country, mobileNumber, countryCode, onCountryChange, onChange }) => {
    return (
        <div className={styles.section}>
            <h3>Personal and Professional Details</h3>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>Full Name *</label>
                    <Input
                        value={data.fullName}
                        onChange={(e) => onChange('fullName', e.target.value)}
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Email Address *</label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label>Professional Title / Role *</label>
                    <Input
                        value={data.role}
                        onChange={(e) => onChange('role', e.target.value)}
                        placeholder="e.g., Architect, Solicitor, Designer, Lecturer"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Company Name / Employer (if any)</label>
                    <Input
                        value={data.company}
                        onChange={(e) => onChange('company', e.target.value)}
                        placeholder="Company Name"
                    />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    {/* <label>Country</label> */}
                    <CountrySelector
                        value={country}
                        onChange={onCountryChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Location / City / Region *</label>
                    <Input
                        value={data.location}
                        onChange={(e) => onChange('location', e.target.value)}
                        placeholder="Address"
                        required
                    />
                </div>
            </div>

            <div className={styles.formRow}>

                <div className={styles.formGroup}>
                    {/* <label>Mobile Number</label> */}
                    <PhoneInput
                        countryCode={countryCode}
                        mobileNumber={mobileNumber}
                        onCountryCodeChange={(code) => onChange('countryCode', code)}
                        onMobileNumberChange={(number) => onChange('mobileNumber', number)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>LinkedIn Profile or Website (if available)</label>
                    <Input
                        value={data.linkedIn}
                        onChange={(e) => onChange('linkedIn', e.target.value)}
                        placeholder="Type your url"
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsSection;
import React from 'react';
import axios from 'axios';
import { Input, Form } from 'antd';
import CountrySelector from './CountrySelector';
import PhoneInput from './PhoneInput';
import styles from './styles.module.css';

interface PersonalDetailsSectionProps {
    country: string;
    mobileNumber: string;
    countryCode: string;
    onCountryChange: (country: string) => void;
    onChange: (field: string, value: string) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ country, mobileNumber, countryCode, onCountryChange, onChange }) => {
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
                            { type: 'email', message: 'Please enter a valid email' },
                            {
                                validator: async (_, value) => {
                                    if (!value) return Promise.resolve();
                                    try {
                                        const res = await axios.get(`/api/members?email=${encodeURIComponent(value)}`);
                                        if (Array.isArray(res.data) && res.data.length > 0) {
                                            return Promise.reject(new Error('This email is already registered.'));
                                        }
                                        return Promise.resolve();
                                    } catch (err) {
                                        // If backend returns 409 or error, treat as duplicate
                                        if (
                                            typeof err === 'object' && err !== null &&
                                            'response' in err &&
                                            err.response &&
                                            typeof err.response === 'object' &&
                                            'status' in err.response &&
                                            err.response.status === 409
                                        ) {
                                            return Promise.reject(new Error('This email is already registered.'));
                                        }
                                        // Otherwise, allow
                                        return Promise.resolve();
                                    }
                                },
                            },
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
                        name="professionalTitle"
                        rules={[{ required: true, message: 'Please enter your professional title or role' }]}
                    >
                        <Input placeholder="e.g. Software Engineer, Designer" />
                    </Form.Item>
                </div>
                <div className={styles.formGroup}>
                    <Form.Item
                        label="Company Name / Employer (if any)"
                        name="companyName"
                        rules={[]}
                    >
                        <Input placeholder="e.g. Google, Freelance, etc." />
                    </Form.Item>
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[{ required: true, message: 'Please select your country' }]}
                    >
                        <CountrySelector
                            value={country}
                            onChange={onCountryChange}
                        />
                    </Form.Item>
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
                    <Form.Item
                        label="Mobile Number"
                        name="mobileNumber"
                        rules={[{ required: true, message: 'Please enter your mobile number' }]}
                    >
                        <PhoneInput
                            countryCode={countryCode}
                            mobileNumber={mobileNumber}
                            onCountryCodeChange={(code) => onChange('countryCode', code)}
                            onMobileNumberChange={(number) => onChange('mobileNumber', number)}
                        />
                    </Form.Item>
                </div>
                <div className={styles.formGroup}>
                    <Form.Item
                        label="LinkedIn Profile or Website (if available)"
                        name="linkedIn"
                        rules={[{
                            validator: (_, value) => {
                                if (!value) return Promise.resolve();
                                if (value.includes(' ')) return Promise.reject(new Error('No spaces allowed in LinkedIn/URL'));
                                // Simple URL validation
                                const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/\S*)?$/;
                                if (!urlPattern.test(value)) return Promise.reject(new Error('Enter a valid URL'));
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <Input placeholder="Type your url" />
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsSection;

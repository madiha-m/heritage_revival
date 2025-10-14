import React from 'react';
import { Checkbox, Radio, Space, Form } from 'antd';
import styles from './styles.module.css';

interface ConsentSectionProps {
    consentContact: boolean;
    onConsentChange: (checked: boolean) => void;
}

const ConsentSection: React.FC<ConsentSectionProps> = ({ consentContact, onConsentChange }) => {
    return (
        <div className={styles.section}>
            <h3>Consent and Participation</h3>

            <Form.Item
                label="Would you like to be listed publicly on our website as a participating professional?"
                name="publicListing"
                rules={[{ required: true, message: 'Please select an option' }]}
            >
                <Radio.Group className={styles.radioGroup}>
                    <Space direction="vertical">
                        <Radio value="yes">Yes, list my name and field</Radio>
                        <Radio value="no">No, keep my participation private</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="consentContact"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must consent to be contacted')) }]}
            >
                <Checkbox className={styles.checkbox} checked={consentContact} onChange={e => onConsentChange(e.target.checked)}>
                    I agree to be contacted via email or phone for relevant projects or community support activities
                </Checkbox>
            </Form.Item>
        </div>
    );
};

export default ConsentSection;

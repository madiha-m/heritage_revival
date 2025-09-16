import React from 'react';
import { Checkbox, Radio, Space } from 'antd';
import styles from './styles.module.css';

interface ConsentSectionProps {
    data: {
        publicListing: string;
        consentContact: boolean;
    };
    onChange: (field: string, value: string | boolean) => void;
}

const ConsentSection: React.FC<ConsentSectionProps> = ({ data, onChange }) => {
    return (
        <div className={styles.section}>
            <h3>Consent and Participation</h3>

            <div className={styles.formGroup}>
                <label>Would you like to be listed publicly on our website as a participating professional? *</label>
                <Radio.Group
                    value={data.publicListing}
                    onChange={(e) => onChange('publicListing', e.target.value)}
                    className={styles.radioGroup}
                >
                    <Space direction="vertical">
                        <Radio value="yes">Yes, list my name and field</Radio>
                        <Radio value="no">No, keep my participation private</Radio>
                    </Space>
                </Radio.Group>
            </div>

            <div className={styles.checkboxGroup}>
                <Checkbox
                    checked={data.consentContact}
                    onChange={(e) => onChange('consentContact', e.target.checked)}
                    className={styles.checkbox}
                >
                    I agree to be contacted via email or phone for relevant projects or community support activities
                </Checkbox>
            </div>
        </div>
    );
};

export default ConsentSection;
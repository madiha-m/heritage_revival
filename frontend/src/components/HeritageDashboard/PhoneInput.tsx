import React from 'react';
import { Input, Select } from 'antd';
import { COUNTRIES } from '@/lib/constants';
import styles from './styles.module.css';

const { Option } = Select;

interface PhoneInputProps {
    countryCode: string; // should be plain digits like "94", not "+94"
    mobileNumber: string;
    onCountryCodeChange: (code: string) => void;
    onMobileNumberChange: (number: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
    countryCode,
    mobileNumber,
    onCountryCodeChange,
    onMobileNumberChange
}) => {
    const handleCountryCodeChange = (value: string) => {
        // always keep digits only in state
        const clean = value.replace(/^\+/, '');
        onCountryCodeChange(clean);
    };

    const filterOption = (input: string, option?: { children?: string; value?: string }): boolean => {
        if (!option) return false;
        const children = option.children || '';
        const value = option.value || '';
        return (
            children.toString().toLowerCase().includes(input.toLowerCase()) ||
            value.toString().toLowerCase().includes(input.toLowerCase())
        );
    };

    const countrySelectBefore = (
        <Select
            value={countryCode.replace(/^\+/, '')} // make sure value has no +
            onChange={handleCountryCodeChange}
            className={styles.countryCodeSelect}
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
        >
            {COUNTRIES.map(country => {
                const cleanPhoneCode = country.phoneCode.replace(/^\+/, '');
                return (
                    <Option key={country.code} value={cleanPhoneCode}>
                        {country.code} (+{cleanPhoneCode})
                    </Option>
                );
            })}
        </Select>
    );

    // Strip '+' or '00' from the start of the mobile number so it won't duplicate
    const formattedMobileNumber = mobileNumber
        .replace(/^\+/, '')   // remove leading +
        .replace(/^00/, '');  // remove leading 00

    return (
        <div className={styles.phoneInput}>
            <label>Mobile Number</label>
            <Input
                addonBefore={countrySelectBefore}
                value={formattedMobileNumber}
                onChange={(e) =>
                    onMobileNumberChange(e.target.value.replace(/[^0-9]/g, ''))
                }
                placeholder="Enter mobile number"
                className={styles.phoneInputField}
                maxLength={15}
            />
        </div>
    );
};

export default PhoneInput;

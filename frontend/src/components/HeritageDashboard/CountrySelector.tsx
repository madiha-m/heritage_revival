import React from 'react';
import { Select } from 'antd';
import { COUNTRIES } from '@/lib/constants';
import styles from './styles.module.css';

const { Option } = Select;

interface CountrySelectorProps {
    value: string;
    onChange: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ value, onChange }) => {
    const handleChange = (value: string) => {
        onChange(value);
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

    return (
        <div className={styles.countrySelector}>
            <Select
                value={value}
                onChange={handleChange}
                className={styles.countrySelect}
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
            >
                {COUNTRIES.map(country => (
                    <Option key={country.code} value={country.code}>
                        {country.name} ({country.currencySymbol})
                    </Option>
                ))}
            </Select>
        </div>
    );
};

export default CountrySelector;
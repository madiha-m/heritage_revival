import React from 'react';
import { InputNumber, Switch, Row, Col, Statistic, Divider } from 'antd';
import { COUNTRIES, DEFAULT_WORKING_HOURS } from '@/lib/constants';
import { formatCurrency, calculateTotal } from '@/lib/utils';
import styles from './styles.module.css';

interface PricingCalculatorProps {
    hourlyRate: number;
    isFullDay: boolean;
    workingHours: number;
    extraHours: number;
    country: string;
    discountOffered: string;
    discountPercentage: number;
    hoursDiscounted: number;
    onHourlyRateChange: (value: number) => void;
    onFullDayChange: (checked: boolean) => void;
    onWorkingHoursChange: (value: number) => void;
    onExtraHoursChange: (value: number) => void;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({
    hourlyRate,
    isFullDay,
    workingHours,
    extraHours,
    country,
    discountOffered,
    discountPercentage,
    hoursDiscounted,
    onHourlyRateChange,
    onFullDayChange,
    onWorkingHoursChange,
    onExtraHoursChange,
}) => {
    const countryData = COUNTRIES.find((c) => c.code === country);
    const currencySymbol = countryData?.currencySymbol || '£';

    const totalAmount = calculateTotal(
        hourlyRate,
        isFullDay,
        workingHours,
        discountOffered,
        discountPercentage,
        hoursDiscounted
    );

    return (
        <div className={styles.pricingCalculator}>
            <Row gutter={[16, 16]}>
                {/* Hourly Rate */}
                <Col span={12}>
                    <div className={styles.formItem}>
                        <label>Hourly Rate ({currencySymbol})</label>
                        <InputNumber
                            value={hourlyRate}
                            onChange={(value) => onHourlyRateChange(value || 0)}
                            min={0}
                            step={5}
                            className={styles.input}
                            addonBefore={currencySymbol}
                        />
                    </div>
                </Col>

                {/* Full Day */}
                <Col span={12}>
                    <div className={styles.formItem}>
                        <label>Full Day</label>
                        <div className={styles.switchContainer}>
                            <Switch checked={isFullDay} onChange={onFullDayChange} />
                            <span className={styles.switchLabel}>
                                {isFullDay ? 'Yes' : 'No'}
                            </span>
                        </div>
                    </div>
                </Col>

                {/* Working Hours */}
                <Col span={12}>
                    <div className={styles.formItem}>
                        <label>Working Hours per Day</label>
                        <InputNumber
                            value={workingHours}
                            onChange={(value) =>
                                onWorkingHoursChange(value || DEFAULT_WORKING_HOURS)
                            }
                            min={1}
                            max={24}
                            disabled={!isFullDay}
                            className={styles.input}
                        />
                    </div>
                </Col>

                {/* Extra Hours */}
                {/* <Col span={12}>
                    <div className={styles.formItem}>
                        <label>Extra Hours</label>
                        <InputNumber
                            value={extraHours}
                            onChange={(value) => onExtraHoursChange(value || 0)}
                            min={0}
                            max={24}
                            disabled={!isFullDay}
                            className={styles.input}
                        />
                    </div>
                </Col> */}
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Statistic
                        title="Total Amount"
                        value={totalAmount}
                        precision={2}
                        valueStyle={{ color: '#3f8600', fontSize: '24px' }}
                        prefix={currencySymbol}
                        className={styles.totalAmount}
                    />
                </Col>
            </Row>
            <div className={styles.breakdown}>
                {isFullDay ? (
                    <div className={styles.breakdown}>
                        <p className={styles.breakdownText}>
                            Breakdown: {workingHours} hours ×{' '}
                            {formatCurrency(hourlyRate, country)} ={' '}
                            {formatCurrency(hourlyRate * workingHours, country)}
                            {extraHours > 0 &&
                                ` + ${extraHours} extra hours × ${formatCurrency(
                                    hourlyRate,
                                    country
                                )} = ${formatCurrency(hourlyRate * extraHours, country)}`}
                        </p>
                    </div>
                ) : (
                    <p className={styles.breakdownText}>&nbsp;</p>
                )}
            </div>
        </div>
    );
};

export default PricingCalculator;

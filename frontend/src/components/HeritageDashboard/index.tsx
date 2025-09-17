'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, message } from 'antd';
import { PricingData } from '@/types';
import { DEFAULT_COUNTRY, DEFAULT_WORKING_HOURS, COUNTRIES } from '@/lib/constants';
import { calculateTotal } from '@/lib/utils';
import ProfileSection from './ProfileSection';
import PricingCalculator from './PricingCalculator';
import PersonalDetailsSection from './PersonalDetailsSection';
import ContributionSection from './ContributionSection';
import ConsentSection from './ConsentSection';
import styles from './styles.module.css';

const HeritageDashboard: React.FC = () => {
    const [pricingData, setPricingData] = useState<PricingData>({
        profileImage: '',
        fullName: '',
        email: '',
        role: '',
        company: '',
        telephone: '',
        telephoneCountry: DEFAULT_COUNTRY,
        telephoneCountryCode: '+44',
        location: '',
        linkedIn: '',
        skills: [],
        otherSkills: '',
        hoursContributed: '',
        contributionHourlyRate: '50',
        discountOffered: '',
        publicListing: '',
        consentContact: false,
        country: DEFAULT_COUNTRY,
        countryCode: '+44',
        mobileNumber: '',
        hourlyRate: 50,
        isFullDay: false,
        workingHours: DEFAULT_WORKING_HOURS,
        extraHours: 0,
        totalAmount: 0
    });
    const [profileFile, setProfileFile] = useState<File | null>(null);

    useEffect(() => {
        const total = calculateTotal(
            parseFloat(pricingData.contributionHourlyRate) || 50,
            pricingData.isFullDay,
            pricingData.workingHours,
            pricingData.extraHours
        );
        updatePricingData('totalAmount', total);
    }, [pricingData.contributionHourlyRate, pricingData.isFullDay, pricingData.workingHours, pricingData.extraHours]);

    const updatePricingData = (field: string, value: string | number | boolean | string[] | undefined) => {
        setPricingData(prev => ({ ...prev, [field]: value }));
    };

    const handleCountryChange = (countryCode: string) => {
        const country = COUNTRIES.find(c => c.code === countryCode);
        updatePricingData('country', countryCode);
        updatePricingData('telephoneCountry', countryCode);
        updatePricingData('telephoneCountryCode', country ? `+${country.phoneCode}` : '+44');
        updatePricingData('countryCode', country ? `+${country.phoneCode}` : '+44');
    };

    const handleSubmit = async () => {
        // Validate required fields
        const requiredFields = [
            'fullName', 'email', 'role', 'location',
            'skills', 'otherSkills', 'hoursContributed',
            'contributionHourlyRate', 'discountOffered', 'publicListing'
        ];

        const missingFields = requiredFields.filter(field => !pricingData[field as keyof PricingData]);

        if (missingFields.length > 0) {
            message.error('Please fill in all required fields');
            return;
        }

        if (!pricingData.consentContact) {
            message.error('Please agree to be contacted');
            return;
        }

        // Submit data to backend API
        try {
            const formData = new FormData();
            for (const key in pricingData) {
                if (pricingData.hasOwnProperty(key)) {
                    const value = pricingData[key as keyof typeof pricingData];
                    if (Array.isArray(value)) {
                        value.forEach((v, i) => formData.append(`${key}[${i}]`, v));
                    } else if (value !== undefined && value !== null) {
                        formData.append(key, value.toString());
                    }
                }
            }

            const response = await fetch('http://127.0.0.1:5000/api/members', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const newMember = await response.json();
            message.success('Submission successful!');
            window.location.href = `/detail?id=${newMember._id}`;
        } catch (error) {
            message.error('Failed to submit data. Please try again.');
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className={styles.container}>
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={8}>
                    <Card title="Profile Picture" className={styles.card}>
                        <ProfileSection
                            profileImage={pricingData.profileImage}
                            onImageChange={(image) => updatePricingData('profileImage', image)}
                            onFileChange={(file) => setProfileFile(file)}
                        />
                    </Card>


                </Col>

                <Col xs={24} lg={16}>
                    <Card title="Join the Heritage Support Network" className={styles.card}>
                        <div className={styles.formContainer}>
                            <PersonalDetailsSection
                                data={{
                                    fullName: pricingData.fullName,
                                    email: pricingData.email,
                                    role: pricingData.role,
                                    company: pricingData.company,
                                    telephone: pricingData.telephone,
                                    location: pricingData.location,
                                    linkedIn: pricingData.linkedIn
                                }}
                                country={pricingData.telephoneCountry}
                                mobileNumber={pricingData.mobileNumber}
                                countryCode={pricingData.telephoneCountryCode}
                                onCountryChange={handleCountryChange}
                                onChange={updatePricingData}
                            />

                            <ContributionSection
                                data={{
                                    skills: pricingData.skills,
                                    otherSkills: pricingData.otherSkills,
                                    hoursContributed: pricingData.hoursContributed,
                                    contributionHourlyRate: pricingData.contributionHourlyRate,
                                    discountOffered: pricingData.discountOffered
                                }}
                                onChange={updatePricingData}
                            />

                            <ConsentSection
                                data={{
                                    publicListing: pricingData.publicListing,
                                    consentContact: pricingData.consentContact
                                }}
                                onChange={updatePricingData}
                            />

                            <div className={styles.section}>
                                <h3>Pricing Configuration</h3>
                                <PricingCalculator
                                    hourlyRate={parseFloat(pricingData.contributionHourlyRate) || 50}
                                    isFullDay={pricingData.isFullDay}
                                    workingHours={pricingData.workingHours}
                                    extraHours={pricingData.extraHours}
                                    country={pricingData.country}
                                    onHourlyRateChange={(value) => updatePricingData('contributionHourlyRate', value.toString())}
                                    onFullDayChange={(checked) => updatePricingData('isFullDay', checked)}
                                    onWorkingHoursChange={(value) => updatePricingData('workingHours', value || DEFAULT_WORKING_HOURS)}
                                    onExtraHoursChange={(value) => updatePricingData('extraHours', value || 0)}
                                />
                            </div>

                            <div className={styles.submitSection}>
                                <Button
                                    type="primary"
                                    size="large"
                                    onClick={handleSubmit}
                                    className={styles.customButton}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>

            </Row>

        </div>
    );
};

export default HeritageDashboard;
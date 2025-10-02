 'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, message, Form } from 'antd';
import Swal from 'sweetalert2';
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
    const [form] = Form.useForm();
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
        discountOffered: 'no',
        discountPercentPerHr: '',
        hrsOfferForDiscount: '0',
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
        form.setFieldsValue(pricingData);
    }, [form, pricingData]);

    useEffect(() => {
        const total = calculateTotal(
            parseFloat(pricingData.contributionHourlyRate) || 50,
            pricingData.isFullDay,
            pricingData.workingHours,
            pricingData.discountOffered,
            parseFloat(pricingData.discountPercentPerHr) || 0,
            parseFloat(pricingData.hrsOfferForDiscount) || 0
        );
        updatePricingData('totalAmount', total);
    }, [pricingData.contributionHourlyRate, pricingData.isFullDay, pricingData.workingHours, pricingData.discountOffered, pricingData.discountPercentPerHr, pricingData.hrsOfferForDiscount]);

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
        try {
            const values = await form.validateFields();

            if (!values.consentContact) {
                Swal.fire({ icon: 'error', title: 'Consent Required', text: 'Please agree to be contacted' });
                return;
            }

            const formData = new FormData();

            // Append form values to formData
            for (const key in values) {
                if (values.hasOwnProperty(key)) {
                    const value = values[key];
                    if (Array.isArray(value)) {
                        value.forEach(v => formData.append(key, v));
                    } else if (value !== undefined && value !== null) {
                        formData.append(key, value.toString());
                    }
                }
            }

            if (profileFile) {
                formData.append('profileImageFile', profileFile);
            }

            const response = await fetch('http://127.0.0.1:5000/api/members', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }

            const newMember = await response.json();
            Swal.fire({ icon: 'success', title: 'Success!', text: 'Submission successful!' }).then(() => {
                window.location.href = `/detail?id=${newMember._id}`;
            });
        } catch (error: any) {
            if (error.errorFields) {
                // Validation errors handled by AntD form
                return;
            }
            Swal.fire({ icon: 'error', title: 'Submission Failed', text: 'Failed to submit data. Please try again.' });
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
                        <Form form={form} layout="vertical" className={styles.formContainer} onValuesChange={(changedValues, allValues) => setPricingData(prev => ({ ...prev, ...allValues }))}>
                            <PersonalDetailsSection
                                form={form}
                                country={pricingData.telephoneCountry}
                                mobileNumber={pricingData.mobileNumber}
                                countryCode={pricingData.telephoneCountryCode}
                                onCountryChange={handleCountryChange}
                                onChange={updatePricingData}
                            />

                            <ContributionSection form={form} />

                            <ConsentSection form={form} />

                            <div className={styles.section}>
                                <h3>Pricing Configuration</h3>
                                <PricingCalculator
                                    hourlyRate={parseFloat(pricingData.contributionHourlyRate) || 50}
                                    isFullDay={pricingData.isFullDay}
                                    workingHours={pricingData.workingHours}
                                    extraHours={pricingData.extraHours}
                                    country={pricingData.country}
                                    discountOffered={pricingData.discountOffered}
                                    discountPercentage={parseFloat(pricingData.discountPercentPerHr) || 0}
                                    hoursDiscounted={parseFloat(pricingData.hrsOfferForDiscount) || 0}
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
                        </Form>
                    </Card>
                </Col>

            </Row>

        </div>
    );
};

export default HeritageDashboard;
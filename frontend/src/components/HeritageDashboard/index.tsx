'use client';

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Form } from 'antd';
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
        location: '',
        linkedIn: '',
        skills: [],
        otherSkills: '',
        hoursContributed: '0',
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
        workingHours: 1,
        extraHours: 0,
        totalAmount: 0
    });
    // No need for profileFile state, image is base64 in pricingData.profileImage

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
        setPricingData(prev => {
            if (field === 'isFullDay') {
                const boolValue = Boolean(value);
                return {
                    ...prev,
                    isFullDay: boolValue,
                    workingHours: boolValue ? 8 : 1
                };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleCountryChange = (countryCode: string) => {
        const country = COUNTRIES.find(c => c.code === countryCode);
        updatePricingData('country', countryCode);
        updatePricingData('countryCode', country ? `+${country.phoneCode}` : '+44');
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            // Merge in fields from pricingData that may not be in AntD form (e.g., ContributionSection, file, etc.)
            const mergedValues = {
                ...pricingData,
                ...values
            };

            // Required fields check (beyond AntD validation)
            // Map 'role' to 'professionalTitle' for required field validation
            const requiredFields = [
                'fullName', 'email', 'professionalTitle', 'location', 'skills',
                'hoursContributed', 'contributionHourlyRate', 'discountOffered',
                'publicListing', 'consentContact'
            ];
            // Copy professionalTitle to role for backend compatibility
            if (!mergedValues.role && mergedValues.professionalTitle) {
                mergedValues.role = mergedValues.professionalTitle;
            }
            const missingFields = requiredFields.filter(field => {
                if (Array.isArray(mergedValues[field])) {
                    return mergedValues[field].length === 0;
                }
                // For the three required fields, check for empty string or undefined
                if ([
                    'hoursContributed',
                    'contributionHourlyRate',
                    'discountOffered'
                ].includes(field)) {
                    return mergedValues[field] === undefined || mergedValues[field] === '';
                }
                return mergedValues[field] === undefined || mergedValues[field] === '' || mergedValues[field] === null;
            });
            // Only require otherSkills if 'Other' is checked in skills
            if (Array.isArray(mergedValues.skills) && mergedValues.skills.includes('Other')) {
                if (!mergedValues.otherSkills || mergedValues.otherSkills.trim() === '') {
                    missingFields.push('otherSkills');
                }
            }
            if (missingFields.length > 0) {
                Swal.fire({ icon: 'error', title: 'Missing Required Fields', text: `Please fill in: ${missingFields.join(', ')}` });
                return;
            }
            if (!mergedValues.consentContact) {
                Swal.fire({ icon: 'error', title: 'Consent Required', text: 'Please agree to be contacted' });
                return;
            }

            // Send JSON with base64 image
            const response = await fetch('http://127.0.0.1:5000/api/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mergedValues),
            });
            if (!response.ok) {
                const errorText = await response.text();
                // Try to parse errorText as JSON
                let errorMsg = 'Failed to submit data. Please try again.';
                try {
                    const errObj = JSON.parse(errorText);
                    if (errObj && errObj.message && errObj.message.toLowerCase().includes('email')) {
                        errorMsg = errObj.message;
                    }
                } catch { }
                Swal.fire({ icon: 'error', title: 'Submission Failed', text: errorMsg });
                return;
            }
            const newMember = await response.json();
            Swal.fire({ icon: 'success', title: 'Success!', text: 'Submission successful!' }).then(() => {
                window.location.href = `/detail?id=${newMember._id}`;
            });
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'errorFields' in error) {
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
                        />
                    </Card>


                </Col>

                <Col xs={24} lg={16}>
                    <Card title="Join the Heritage Support Network" className={styles.card}>
                        <Form form={form} layout="vertical" className={styles.formContainer} onValuesChange={(changedValues, allValues) => setPricingData(prev => ({ ...prev, ...allValues }))}>
                            <PersonalDetailsSection
                                country={pricingData.country}
                                mobileNumber={pricingData.mobileNumber}
                                countryCode={pricingData.countryCode}
                                onCountryChange={handleCountryChange}
                                onChange={updatePricingData}
                            />

                            <ContributionSection
                                data={pricingData}
                                onChange={updatePricingData}
                            />

                            <ConsentSection consentContact={pricingData.consentContact} onConsentChange={checked => updatePricingData('consentContact', checked)} />

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
                                // onExtraHoursChange={(value) => updatePricingData('extraHours', value || 0)}
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
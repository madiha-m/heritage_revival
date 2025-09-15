// src/types/index.ts
export interface PricingData {
    profileImage?: string;
    fullName: string;
    email: string;
    role: string;
    company: string;
    telephone: string;
    telephoneCountry: string;
    telephoneCountryCode: string;
    location: string;
    linkedIn: string;
    skills: string[];
    otherSkills: string;
    hoursContributed: string;
    contributionHourlyRate: string;
    hourlyRate: number;
    discountOffered: string;
    publicListing: string;
    consentContact: boolean;
    country: string;
    countryCode: string;
    mobileNumber: string;
    isFullDay: boolean;
    workingHours: number;
    extraHours: number;
    totalAmount: number;
}

export interface Country {
    code: string;
    name: string;
    currency: string;
    currencySymbol: string;
    phoneCode: string;
}

export interface Member {
    id: string;
    profileImage: string;
    fullName: string;
    role: string;
    hourlyRate: number;
    email: string;
    skills: string[];
}

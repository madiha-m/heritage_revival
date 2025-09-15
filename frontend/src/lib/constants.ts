import { countries } from 'country-data';
import { Country } from '@/types';

// Helper function to get currency symbols
export const getCurrencySymbol = (currencyCode: string = 'USD'): string => {
    const currencySymbols: { [key: string]: string } = {
        USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$',
        CHF: 'CHF', CNY: '¥', INR: '₹', BRL: 'R$', RUB: '₽', KRW: '₩',
        MXN: '$', SGD: 'S$', NZD: 'NZ$', SEK: 'kr', NOK: 'kr', DKK: 'kr',
        TRY: '₺', ZAR: 'R', AED: 'د.إ', SAR: '﷼', QAR: 'ر.ق',
    };
    return currencySymbols[currencyCode] || currencyCode;
};

// Get all countries with phone codes
export const COUNTRIES: Country[] = countries.all
    .filter(country => country.alpha2 && country.name && country.countryCallingCodes?.[0])
    .map(country => ({
        code: country.alpha2,
        name: country.name,
        currency: country.currencies?.[0] || 'USD',
        currencySymbol: getCurrencySymbol(country.currencies?.[0]),
        phoneCode: country.countryCallingCodes?.[0] || ''
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

export const DEFAULT_WORKING_HOURS = 8;
export const DEFAULT_COUNTRY = 'GB';

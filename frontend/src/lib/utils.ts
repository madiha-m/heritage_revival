import { COUNTRIES } from './constants';

export const formatCurrency = (amount: number, currencyCode: string = 'GBP'): string => {
    const country = COUNTRIES.find(c => c.code === currencyCode);
    const symbol = country?.currencySymbol || '£';

    return `${symbol}${amount.toFixed(2)}`;
};

export const calculateTotal = (
    hourlyRate: number,
    isFullDay: boolean,
    workingHours: number,
    extraHours: number
): number => {
    if (isFullDay) {
        return hourlyRate * workingHours + (hourlyRate * extraHours);
    }
    return hourlyRate * workingHours;
};
import { COUNTRIES } from './constants';

export const formatCurrency = (amount: number, currencyCode: string = 'GBP'): string => {
    const country = COUNTRIES.find(c => c.code === currencyCode);
    const symbol = country?.currencySymbol || '£';

    return `${symbol}${amount.toFixed(2)}`;
};

export const calculateTotal = (
    perHrRate: number,
    isFullDay: boolean,
    workingHours: number,
    discountOffered: string,
    discountPercentPerHr: number,
    hrsOfferForDiscount: number,
    // perHrDiscount: number,
): number => {
    let totlDiscountedAmount = 0;
    if (discountOffered === 'yes') {
        totlDiscountedAmount = perHrRate * (1 - discountPercentPerHr / 100) * hrsOfferForDiscount;
    }
    let totalAmount = 0;
    isFullDay
    if (isFullDay) {
        totalAmount = perHrRate * workingHours + totlDiscountedAmount;
    } else {
        totalAmount = perHrRate * 1 + totlDiscountedAmount;
    }
    return totalAmount;
};

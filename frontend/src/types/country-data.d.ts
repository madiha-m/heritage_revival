declare module 'country-data' {
    export interface Country {
        alpha2: string;
        alpha3: string;
        countryCallingCodes: string[];
        currencies: string[];
        emoji: string;
        ioc: string;
        languages: string[];
        name: string;
        status: string;
    }

    export interface Countries {
        all: Country[];
    }

    export const countries: Countries;
}
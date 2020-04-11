import {
    InputDateStringToISODateString,
    InputDateStringToUTCDate,
    INVALID_DATE_VALUE,
    ISODateStringToInputDateString,
    ISODateStringToUTCDate,
} from '../dateFormatUtils';

describe('datoFormatUtils', () => {
    describe('ISODateStringToInputDateString', () => {
        it('it converts different valid iso-dates to input-dates', () => {
            expect(ISODateStringToInputDateString('2020-01-01')).toEqual('01.01.2020');
            expect(ISODateStringToInputDateString('2020-12-01')).toEqual('01.12.2020');
            expect(ISODateStringToInputDateString('2020-12-31')).toEqual('31.12.2020');
        });
        it('it does not convert invalid dates, and returns blank string', () => {
            expect(ISODateStringToInputDateString('202001-01')).toEqual(INVALID_DATE_VALUE);
            expect(ISODateStringToInputDateString('abc')).toEqual(INVALID_DATE_VALUE);
            expect(ISODateStringToInputDateString('')).toEqual(INVALID_DATE_VALUE);
        });
    });
    describe('inputDateStringToISODateString', () => {
        it('it converts different valid input-dates to iso-dates', () => {
            expect(InputDateStringToISODateString('01.01.2020')).toEqual('2020-01-01');
            expect(InputDateStringToISODateString('01.12.2020')).toEqual('2020-12-01');
            expect(InputDateStringToISODateString('31.12.2020')).toEqual('2020-12-31');
        });
        it('it returns "Invalid date" for invalid iso-dates', () => {
            expect(InputDateStringToISODateString('13.13.2020')).toEqual(INVALID_DATE_VALUE);
            expect(InputDateStringToISODateString('2000.10.10')).toEqual(INVALID_DATE_VALUE);
            expect(InputDateStringToISODateString('2000')).toEqual(INVALID_DATE_VALUE);
            expect(InputDateStringToISODateString('1-2.42')).toEqual(INVALID_DATE_VALUE);
        });
    });
    describe('ISODateStringToUTCDate', () => {
        it('it get utc dates from inpuDateStrings', () => {
            const date1 = InputDateStringToUTCDate('01.01.2000') as Date;
            expect(date1.getDate()).toBe(1);
            expect(date1.getMonth()).toBe(0);
            expect(date1.getFullYear()).toBe(2000);
            const date2 = InputDateStringToUTCDate('31.12.2999') as Date;
            expect(date2.getDate()).toBe(31);
            expect(date2.getMonth()).toBe(11);
            expect(date2.getFullYear()).toBe(2999);
        });
    });
    describe('ISODateStringToUTCDate', () => {
        it('it get utc dates from ISODateStrings', () => {
            const date1 = ISODateStringToUTCDate('2000-01-01') as Date;
            expect(date1.getDate()).toBe(1);
            expect(date1.getMonth()).toBe(0);
            expect(date1.getFullYear()).toBe(2000);
            const date2 = ISODateStringToUTCDate('2999-12-31') as Date;
            expect(date2.getDate()).toBe(31);
            expect(date2.getMonth()).toBe(11);
            expect(date2.getFullYear()).toBe(2999);
        });
    });
});

import { Tidsperiode } from '../../types';
import { erDatoGyldig } from '../datovalidering';

describe('datovalidering', () => {
    describe('erDatoGyldig without avgrensning', () => {
        it('should return false if date is invalid', () => {
            expect(erDatoGyldig('')).toBeFalsy();
            expect(erDatoGyldig('2019-31-01')).toBeFalsy();
            expect(erDatoGyldig('abc')).toBeFalsy();
            expect(erDatoGyldig('40')).toBeFalsy();
            expect(erDatoGyldig('40')).toBeFalsy();
        });
    });

    describe('erDatoGyldig with avgrensning', () => {
        it('should return false if date is not a weekday and helgedagerIkkeTillat is true', () => {
            expect(erDatoGyldig('2019-02-9', { helgedagerIkkeTillatt: true })).toBeFalsy();
            expect(erDatoGyldig('2019-02-10', { helgedagerIkkeTillatt: true })).toBeFalsy();
            expect(erDatoGyldig('2019-02-11', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(erDatoGyldig('2019-02-12', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(erDatoGyldig('2019-02-13', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(erDatoGyldig('2019-02-14', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(erDatoGyldig('2019-02-15', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(erDatoGyldig('2019-02-16', { helgedagerIkkeTillatt: true })).toBeFalsy();
            expect(erDatoGyldig('2019-02-17', { helgedagerIkkeTillatt: true })).toBeFalsy();
        });

        it('should return correct value if minDato is set', () => {
            const minDato = '2019-01-01';
            expect(erDatoGyldig('2019-01-01', { minDato })).toBeTruthy();
            expect(erDatoGyldig('2018-12-31', { minDato })).toBeFalsy();
            expect(erDatoGyldig('2019-01-02', { minDato })).toBeTruthy();
        });

        it('should return correct value if maxDato is set', () => {
            const maksDato = '2019-01-01';
            expect(erDatoGyldig('2019-01-01', { maksDato })).toBeTruthy();
            expect(erDatoGyldig('2018-12-31', { maksDato })).toBeTruthy();
            expect(erDatoGyldig('2019-01-02', { maksDato })).toBeFalsy();
        });

        it('should return correct value if ugyldigeTidsperioder is defined', () => {
            const ugyldigeTidsperioder: Tidsperiode[] = [
                {
                    fom: '2019-06-01',
                    tom: '2019-06-30',
                },
            ];

            expect(erDatoGyldig('2019-06-01', { ugyldigeTidsperioder })).toBeFalsy();
            expect(erDatoGyldig('2019-06-30', { ugyldigeTidsperioder })).toBeFalsy();
            expect(erDatoGyldig('2019-05-31', { ugyldigeTidsperioder })).toBeTruthy();
        });
    });
});

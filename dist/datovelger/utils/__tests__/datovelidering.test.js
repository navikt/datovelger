"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var datovalidering_1 = require("../datovalidering");
describe('datovalidering', function () {
    describe('erDatoGyldig without avgrensning', function () {
        it('should return false if date is invalid', function () {
            expect(datovalidering_1.erDatoGyldig('')).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('2019-31-01')).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('abc')).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('40')).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('40')).toBeFalsy();
        });
    });
    describe('erDatoGyldig with avgrensning', function () {
        it('should return false if date is not a weekday and helgedagerIkkeTillat is true', function () {
            expect(datovalidering_1.erDatoGyldig('2019-02-9', { helgedagerIkkeTillatt: true })).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('2019-02-10', { helgedagerIkkeTillatt: true })).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('2019-02-11', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2019-02-12', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2019-02-13', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2019-02-14', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2019-02-15', { helgedagerIkkeTillatt: true })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2019-02-16', { helgedagerIkkeTillatt: true })).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('2019-02-17', { helgedagerIkkeTillatt: true })).toBeFalsy();
        });
        it('should return correct value if minDato is set', function () {
            var minDato = '2019-01-01';
            expect(datovalidering_1.erDatoGyldig('2019-01-01', { minDato: minDato })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2018-12-31', { minDato: minDato })).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('2019-01-02', { minDato: minDato })).toBeTruthy();
        });
        it('should return correct value if maxDato is set', function () {
            var maksDato = '2019-01-01';
            expect(datovalidering_1.erDatoGyldig('2019-01-01', { maksDato: maksDato })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2018-12-31', { maksDato: maksDato })).toBeTruthy();
            expect(datovalidering_1.erDatoGyldig('2019-01-02', { maksDato: maksDato })).toBeFalsy();
        });
        it('should return correct value if ugyldigeTidsperioder is defined', function () {
            var ugyldigeTidsperioder = [{
                fom: '2019-06-01',
                tom: '2019-06-30'
            }];
            expect(datovalidering_1.erDatoGyldig('2019-06-01', { ugyldigeTidsperioder: ugyldigeTidsperioder })).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('2019-06-30', { ugyldigeTidsperioder: ugyldigeTidsperioder })).toBeFalsy();
            expect(datovalidering_1.erDatoGyldig('2019-05-31', { ugyldigeTidsperioder: ugyldigeTidsperioder })).toBeTruthy();
        });
    });
});
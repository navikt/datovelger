"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
exports.erDatoGyldig = function (dato, avgrensninger) {
    var d = moment(dato, moment.HTML5_FMT.DATE, true);
    return avgrensninger === undefined ? d.isValid() : d.isValid() && erDatoInnenforAvgrensninger(d, avgrensninger);
};
var erDatoInnenforAvgrensninger = function (dato, avgrensninger) {
    if (avgrensninger.minDato) {
        return dato.isSameOrAfter(moment(avgrensninger.minDato, moment.HTML5_FMT.DATE), 'day');
    }
    if (avgrensninger.maksDato) {
        return dato.isSameOrBefore(moment(avgrensninger.minDato, moment.HTML5_FMT.DATE), 'day');
    }
    if (avgrensninger.helgedagerIkkeTillatt) {
        return dato.isoWeekday() <= 5;
    }
    if (avgrensninger.ugyldigeTidsperioder) {
        return !exports.erDatoIEnUgyldigTidsperiode(dato, avgrensninger.ugyldigeTidsperioder);
    }
    return true;
};
exports.erDatoIEnUgyldigTidsperiode = function (dato, ugyldigeTidsperioder) {
    return ugyldigeTidsperioder.some(function (t) {
        var fom = moment(t.fom, moment.HTML5_FMT.DATE);
        var tom = moment(t.tom, moment.HTML5_FMT.DATE);
        return dato.isBetween(fom, tom, 'day', "[]");
    });
};
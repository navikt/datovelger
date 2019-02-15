"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var _1 = require("./");
exports.erDatoGyldig = function (dato, avgrensninger) {
    return exports.validerDato(dato, avgrensninger) !== undefined;
};
exports.validerDato = function (dato, avgrensninger) {
    if (dato === 'string' && dato.length < 8) {
        dato = undefined;
    }
    if (!dato) {
        return 'datoErIkkeDefinert';
    }
    if (typeof dato === 'string') {
        dato = moment(dato, 'DD.MM.YYYY').toDate();
    }
    if (!moment(dato,moment.HTML5_FMT.DATE,true).isValid()) {
        return 'datoErUgyldig';
    }
    if (!exports.erDatoEtterMinDato(dato, avgrensninger.minDato)) {
        return 'datoErFørMinDato';
    }
    if (!exports.erDatoFørSluttdato(dato, avgrensninger.maksDato)) {
        return 'datoErEtterMaksDato';
    }
    if (!exports.erDatoUkedag(dato)) {
        return 'datoErIkkeUkedag';
    }
    if (exports.erDatoITidsperioder(dato, avgrensninger.ugyldigeTidsperioder)) {
        return 'datoErIUgyldigPeriode';
    }
    return 'gyldig';
};
exports.erDatoDefinert = function (dato) {
    return dato !== undefined && dato !== null;
};
exports.erDatoEnDato = function (dato) {
    return moment.isDate(dato);
};
exports.erDatoEtterMinDato = function (dato, minDato) {
    return !minDato || _1.normaliserDato(dato).isSameOrAfter(_1.normaliserDato(minDato));
};
exports.erDatoFørSluttdato = function (dato, maksDato) {
    return !maksDato || _1.normaliserDato(dato).isSameOrBefore(_1.normaliserDato(maksDato));
};
exports.erDatoUkedag = function (dato) {
    var dag = _1.normaliserDato(dato).isoWeekday();
    return dag <= 5;
};
exports.erDatoITidsperioder = function (dato, tidsperioder) {
    if (!tidsperioder || tidsperioder.length === 0) {
        return false;
    }
    var d = _1.normaliserDato(dato);
    var gyldig = false;
    tidsperioder.forEach(function (periode) {
        if (gyldig && d.isSameOrAfter(_1.normaliserDato(periode.fom)) && d.isSameOrBefore(_1.normaliserDato(periode.tom))) {
            gyldig = true;
        }
    });
    return gyldig;
};
exports.erDagTilgjengelig = function (dato, avgrensninger) {
    return !avgrensninger || exports.validerDato(dato, avgrensninger);
};
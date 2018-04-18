"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
__export(require("./kalenderFokusUtils"));
exports.isDateObject = function (date) {
    return date && typeof date === "object" && date.getDate;
};
exports.normaliserDato = function (d) {
    return moment(d).startOf('day');
};
exports.formatDateInputValue = function (date) {
    if (exports.isDateObject(date)) {
        return moment(date).format('DD.MM.YYYY');
    } else if (typeof date === "string") {
        return date;
    }
    return '';
};
exports.formaterDayAriaLabel = function (dato, locale) {
    return moment(dato).format('DD.MM.YYYY, dddd');
};
exports.dagDatoNøkkel = function (dato) {
    return "" + moment(dato).format('DD.MM.YYYY');
};
exports.getMånedDiff = function (måned1, måned2) {
    return moment(måned1).startOf('month').diff(moment(måned2).startOf('month'), 'months');
};
exports.erMånedTilgjengelig = function (måned, avgrensninger) {
    if (!avgrensninger) {
        return true;
    }
    var mnd = moment(måned);
    var min = avgrensninger.min,
        maks = avgrensninger.maks;
    var erEtterMin = min ? mnd.endOf('month').isAfter(moment(min).startOf('month')) : true;
    var erFørMaks = maks ? mnd.startOf('month').isBefore(moment(maks).endOf('month')) : true;
    return erEtterMin && erFørMaks;
};
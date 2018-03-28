"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
__export(require("./kalenderFokusUtils"));
exports.normaliserDato = function (d) {
    return moment(d).startOf('day');
};
exports.formatDateInputValue = function (date) {
    return date ? moment(date).format('DD.MM.YYYY') : '';
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
// export function getSammeDatoIMåned(
// 	dato: Date,
// 	måned: Date,
// 	nesteMåned: Date
// ): Date {
// 	return moment(dato)
// 		.add(getMånedDiff(nesteMåned, måned), 'months')
// 		.toDate();
// }
"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
__export(require("./kalenderFokusUtils"));
exports.formatDateInputValue = function (dato) {
    var d = moment(dato, moment.HTML5_FMT.DATE, true);
    return d.isValid() ? d.format('DD.MM.YYYY') : dato;
};
exports.formatInputToISODateFormatStrig = function (input) {
    var d = moment.utc(input, 'DD.MM.YYYY', true);
    return d.isValid() ? d.format(moment.HTML5_FMT.DATE) : d.toString();
};
exports.dagDatoNøkkel = function (dato) {
    return moment(dato).format('DD.MM.YYYY');
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
exports.getUtilgjengeligeDager = function (avgrensninger) {
    var ugyldigeDager = [];
    if (avgrensninger.ugyldigeTidsperioder) {
        ugyldigeDager = avgrensninger.ugyldigeTidsperioder.map(function (t) {
            return {
                from: moment(t.fom, moment.HTML5_FMT.DATE).toDate(),
                to: moment(t.tom, moment.HTML5_FMT.DATE).toDate()
            };
        });
    }
    var minDato = avgrensninger.minDato;
    var maksDato = avgrensninger.maksDato;
    var helgedager = {
        daysOfWeek: avgrensninger.helgedagerIkkeTillatt ? [0, 6] : []
    };
    return ugyldigeDager.concat(maksDato ? [{ after: moment(maksDato, moment.HTML5_FMT.DATE).toDate() }] : [], minDato ? [{ before: moment(minDato, moment.HTML5_FMT.DATE).toDate() }] : [], [helgedager]);
};
exports.getDefaultMåned = function (dato, avgrensninger, dayPickerProps) {
    if (dato) {
        moment(dato, moment.HTML5_FMT.DATE).toDate();
        return moment(dato, moment.HTML5_FMT.DATE).toDate();
    }
    if (dayPickerProps && dayPickerProps.initialMonth) {
        return dayPickerProps.initialMonth;
    }
    var idag = moment().toDate();
    if (avgrensninger && avgrensninger.minDato) {
        return moment(avgrensninger.minDato).isAfter(idag) ? moment(avgrensninger.minDato, moment.HTML5_FMT.DATE).toDate() : idag;
    }
    return idag;
};
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var tekster_1 = require("../tekster");
var AvgrensningerInfo = function (_a) {
    var id = _a.id,
        avgrensninger = _a.avgrensninger;
    if (!avgrensninger.minDato && !avgrensninger.maksDato) {
        return React.createElement("span", null);
    }
    var msg = '';
    var fraDato = utils_1.formatDateInputValue(avgrensninger.minDato);
    var tilDato = utils_1.formatDateInputValue(avgrensninger.maksDato);
    if (avgrensninger.minDato && avgrensninger.maksDato) {
        msg = tekster_1.Tekster.avgrensninger.måVæreMellom(fraDato, tilDato) + ". ";
    } else {
        if (avgrensninger.minDato) {
            msg = tekster_1.Tekster.avgrensninger.fra(fraDato) + ". ";
        }
        if (avgrensninger.maksDato) {
            msg = tekster_1.Tekster.avgrensninger.til(tilDato) + ". ";
        }
    }
    if (avgrensninger.helgedagerIkkeTillatt) {
        msg = msg + " " + tekster_1.Tekster.avgrensninger.helg + ". ";
    }
    return React.createElement("p", { className: "sr-only", id: id }, msg);
};
exports.default = AvgrensningerInfo;
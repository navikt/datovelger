"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../utils");
var AvgrensningerInfo = function (_a) {
    var id = _a.id,
        avgrensninger = _a.avgrensninger;
    if (!avgrensninger.minDato && !avgrensninger.maksDato) {
        return null;
    }
    var msg = '';
    var fraDato = utils_1.formatDateInputValue(avgrensninger.minDato);
    var tilDato = utils_1.formatDateInputValue(avgrensninger.maksDato);
    if (avgrensninger.minDato && avgrensninger.maksDato) {
        msg = "Dato m\u00E5 v\u00E6re mellom \"" + fraDato + "\" og \"" + tilDato + "\". ";
    } else {
        if (avgrensninger.minDato) {
            msg = "Fra " + fraDato + ". ";
        }
        if (avgrensninger.maksDato) {
            msg = "Til " + tilDato + ". ";
        }
    }
    if (avgrensninger.helgedagerIkkeTillatt) {
        msg = msg + "L\u00F8rdager og s\u00F8ndager er ikke valgbare. ";
    }
    return React.createElement("p", { className: "sr-only", id: id }, msg);
};
exports.default = AvgrensningerInfo;
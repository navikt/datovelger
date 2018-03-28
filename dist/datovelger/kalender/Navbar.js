"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var classnames = require("classnames");
var nav_frontend_chevron_1 = require("nav-frontend-chevron");
var NavbarKnapp = function (_a) {
    var måned = _a.måned,
        retning = _a.retning,
        disabled = _a.disabled,
        onClick = _a.onClick;
    var label = retning === 'forrige' ? 'Forrige måned' : 'Neste måned';
    return React.createElement("button", { className: classnames('nav-datovelger__navbar__knapp', "nav-datovelger__navbar__knapp--" + retning, {
            'nav-datovelger__navbar__knapp--disabled': disabled
        }), type: "button", onClick: function (e) {
            return disabled ? null : onClick(e, måned);
        }, "aria-label": label, "aria-disabled": disabled, role: "button" }, React.createElement(nav_frontend_chevron_1.default, { type: retning === 'forrige' ? 'venstre' : 'høyre' }));
};
var Navbar = function (_a) {
    var måned = _a.måned,
        byttMåned = _a.byttMåned,
        min = _a.min,
        maks = _a.maks;
    var forrigeMåned = moment(måned).add(-1, 'months');
    var nesteMåned = moment(måned).add(1, 'months');
    var forrigeErDisabled = min ? moment(min).isAfter(forrigeMåned.endOf('month')) : false;
    var nesteErDisabled = maks ? moment(maks).isBefore(nesteMåned.startOf('month')) : false;
    var onClick = function (evt, mnd) {
        evt.preventDefault();
        evt.stopPropagation();
        byttMåned(mnd);
    };
    return React.createElement("div", { className: "nav-datovelger__navbar", role: "nav" }, React.createElement(NavbarKnapp, { "m\u00E5ned": forrigeMåned.toDate(), retning: "forrige", disabled: forrigeErDisabled, onClick: onClick }), React.createElement(NavbarKnapp, { "m\u00E5ned": nesteMåned.toDate(), retning: "neste", disabled: nesteErDisabled, onClick: onClick }));
};
exports.default = Navbar;
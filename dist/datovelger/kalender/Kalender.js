"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_day_picker_1 = require("react-day-picker");
var moment = require("moment");
var FocusTrap = require("focus-trap-react");
var utils_1 = require("../utils");
var Navbar_1 = require("./Navbar");
var localeUtils_1 = require("./localeUtils");
var Kalender = /** @class */function (_super) {
    __extends(Kalender, _super);
    function Kalender(props) {
        var _this = _super.call(this, props) || this;
        _this.navigerMåneder = _this.navigerMåneder.bind(_this);
        _this.settFokus = _this.settFokus.bind(_this);
        _this.onByttDag = _this.onByttDag.bind(_this);
        _this.onByttMåned = _this.onByttMåned.bind(_this);
        _this.state = {
            måned: props.måned
        };
        return _this;
    }
    Kalender.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevState.måned !== this.state.måned && this.kalender && this.nesteFokusertDato) {
            utils_1.fokuserPåDato(this.kalender, this.nesteFokusertDato);
            this.nesteFokusertDato = undefined;
        }
    };
    Kalender.prototype.settFokus = function () {
        if (this.kalender) {
            utils_1.fokuserKalender(this.kalender);
        }
    };
    Kalender.prototype.onByttDag = function (dato, modifiers) {
        if (this.props.kanVelgeUgyldigDato || !modifiers.disabled) {
            this.props.onVelgDag(dato);
        }
    };
    Kalender.prototype.onByttMåned = function (måned) {
        var fokusertDato = utils_1.getFokusertDato(this.kalender);
        this.nesteFokusertDato = fokusertDato ? utils_1.getSammeDatoIMåned(fokusertDato, this.state.måned, måned) : undefined;
        this.setState({
            måned: måned
        });
    };
    Kalender.prototype.navigerMåneder = function (evt, antall) {
        evt.preventDefault();
        var mnd = moment(this.state.måned).add(antall, 'month').toDate();
        if (utils_1.erMånedTilgjengelig(mnd, { min: this.props.min, maks: this.props.maks })) {
            this.onByttMåned(mnd);
        }
    };
    Kalender.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            dato = _a.dato,
            min = _a.min,
            maks = _a.maks,
            locale = _a.locale,
            visUkenumre = _a.visUkenumre,
            utilgjengeligeDager = _a.utilgjengeligeDager,
            visÅrVelger = _a.visÅrVelger,
            dayPickerProps = _a.dayPickerProps;
        var måned = this.state.måned;
        var localeUtils = __assign({}, localeUtils_1.default, this.props.localeUtils);
        var innstillinger = {
            locale: locale,
            localeUtils: localeUtils,
            navbarElement: function (props) {
                return React.createElement("span", null);
            },
            captionElement: function (props) {
                return React.createElement(Navbar_1.default, { "defaultM\u00E5ned": måned, "byttM\u00E5ned": function (d) {
                        return _this.onByttMåned(d);
                    }, min: min, maks: maks, locale: locale, localeUtils: localeUtils, "vis\u00C5rVelger": visÅrVelger });
            },
            firstDayOfWeek: 1,
            showWeekNumbers: visUkenumre
        };
        return React.createElement("div", { ref: function (c) {
                return _this.kalender = c;
            }, role: "dialog", "aria-label": "Kalender", className: "nav-datovelger__kalender" }, React.createElement(FocusTrap, { active: true, focusTrapOptions: {
                clickOutsideDeactivates: true,
                onDeactivate: this.props.onLukk
            } }, React.createElement(react_day_picker_1.default, __assign({ locale: locale, localeUtils: localeUtils, fromMonth: min, toMonth: maks, month: måned, canChangeMonth: false, selectedDays: utils_1.isDateObject(dato) ? dato : undefined, onDayClick: this.onByttDag, onMonthChange: this.onByttMåned, disabledDays: utilgjengeligeDager }, innstillinger, dayPickerProps))));
    };
    return Kalender;
}(React.Component);
exports.Kalender = Kalender;
exports.default = Kalender;
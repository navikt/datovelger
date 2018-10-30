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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var nav_frontend_js_utils_1 = require("nav-frontend-js-utils");
var moment = require("moment");
var getAvailableMonths = function (monthNames, date, min, maks) {
    var options = [];
    var from = min && date.getFullYear() === min.getFullYear() ? min.getMonth() : 0;
    var to = maks && date.getFullYear() === maks.getFullYear() ? maks.getMonth() : 11;
    var m = from;
    while (m <= to) {
        options.push({
            value: m,
            label: monthNames[m]
        });
        m++;
    }
    return options;
};
var YearSelector = /** @class */function (_super) {
    __extends(YearSelector, _super);
    function YearSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = _this.onChange.bind(_this);
        _this.onYearChange = _this.onYearChange.bind(_this);
        return _this;
    }
    YearSelector.prototype.onChange = function (evt) {
        var _a = evt.target.form,
            year = _a.year,
            month = _a.month;
        this.props.onChange(new Date(year.value, month.value));
    };
    YearSelector.prototype.onYearChange = function (evt) {
        var _a = evt.target.form,
            year = _a.year,
            month = _a.month;
        var newDate = new Date(year.value, month.value);
        if (this.props.min && moment(newDate).isBefore(this.props.min)) {
            this.props.onChange(this.props.min);
        } else if (this.props.max && moment(newDate).isAfter(this.props.max)) {
            this.props.onChange(this.props.max);
        } else {
            this.props.onChange(newDate);
        }
    };
    YearSelector.prototype.render = function () {
        var _a = this.props,
            date = _a.date,
            _b = _a.min,
            min = _b === void 0 ? new Date(1900, 0, 1) : _b,
            _c = _a.max,
            max = _c === void 0 ? moment().add(4, 'years').toDate() : _c,
            localeUtils = _a.localeUtils,
            locale = _a.locale;
        var monthNames = localeUtils.getMonths(locale);
        var monthOptions = getAvailableMonths(monthNames, date, min, max);
        var years = [];
        for (var i = min.getFullYear(); i <= max.getFullYear(); i += 1) {
            years.push(i);
        }
        var mndSelectId = nav_frontend_js_utils_1.guid();
        var yearSelectId = nav_frontend_js_utils_1.guid();
        return React.createElement("div", { className: "nav-datovelger__yearSelector" }, React.createElement("div", { className: "selectContainer" }, React.createElement("label", { className: "sr-only", htmlFor: yearSelectId }, "Velg \u00E5r"), React.createElement("select", { id: yearSelectId, className: "skjemaelement__input skjemaelement__input--year", name: "year", onChange: this.onYearChange, value: date.getFullYear() }, years.map(function (year) {
            return React.createElement("option", { key: year, value: year }, year);
        }))), React.createElement("div", { className: "selectContainer" }, React.createElement("label", { className: "sr-only", htmlFor: mndSelectId }, "Velg m\u00E5ned"), React.createElement("select", { id: mndSelectId, className: "skjemaelement__input", name: "month", onChange: this.onChange, value: date.getMonth() }, monthOptions.map(function (m) {
            return React.createElement("option", { key: m.value, value: m.value }, m.label);
        }))));
    };
    return YearSelector;
}(React.Component);
exports.default = YearSelector;
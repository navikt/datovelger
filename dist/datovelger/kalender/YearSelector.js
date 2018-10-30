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
var YearSelector = /** @class */function (_super) {
    __extends(YearSelector, _super);
    function YearSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }
    YearSelector.prototype.onChange = function (evt) {
        var _a = evt.target.form,
            year = _a.year,
            month = _a.month;
        this.props.onChange(new Date(year.value, month.value));
    };
    YearSelector.prototype.render = function () {
        var _a = this.props,
            dato = _a.dato,
            min = _a.min,
            maks = _a.maks,
            localeUtils = _a.localeUtils,
            locale = _a.locale;
        var months = localeUtils.getMonths(locale);
        var years = [];
        for (var i = min.getFullYear(); i <= maks.getFullYear(); i += 1) {
            years.push(i);
        }
        var mndSelectId = nav_frontend_js_utils_1.guid();
        var yearSelectId = nav_frontend_js_utils_1.guid();
        return React.createElement("form", { className: "nav-datovelger__yearSelector" }, React.createElement("div", { className: "selectContainer" }, React.createElement("label", { className: "sr-only", htmlFor: mndSelectId }, "Velg m\u00E5ned"), React.createElement("select", { id: mndSelectId, className: "skjemaelement__input", name: "month", onChange: this.onChange, value: dato.getMonth() }, months.map(function (month, i) {
            return React.createElement("option", { key: month, value: i }, month);
        }))), React.createElement("div", { className: "selectContainer" }, React.createElement("label", { className: "sr-only", htmlFor: yearSelectId }, "Velg \u00E5r"), React.createElement("select", { id: yearSelectId, className: "skjemaelement__input skjemaelement__input--year", name: "year", onChange: this.onChange, value: dato.getFullYear() }, years.map(function (year) {
            return React.createElement("option", { key: year, value: year }, year);
        }))));
    };
    return YearSelector;
}(React.Component);
exports.default = YearSelector;
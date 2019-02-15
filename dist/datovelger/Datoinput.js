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
var classnames = require("classnames");
var utils_1 = require("./utils");
var datovalidering_1 = require("./utils/datovalidering");
var Datoinput = /** @class */function (_super) {
    __extends(Datoinput, _super);
    function Datoinput(props) {
        var _this = _super.call(this, props) || this;
        _this.focus = _this.focus.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.triggerDateChange = _this.triggerDateChange.bind(_this);
        _this.state = {
            value: utils_1.formatDateInputValue(props.selectedDate || '')
        };
        return _this;
    }
    Datoinput.prototype.componentWillReceiveProps = function (nextProps) {
        this.updateAfterDateChange(nextProps.selectedDate);
    };
    Datoinput.prototype.updateAfterDateChange = function (nextSelectedDate) {
        if (this.props.selectedDate !== nextSelectedDate && datovalidering_1.erDatoGyldig(nextSelectedDate)) {
            this.setState({
                value: utils_1.formatDateInputValue(nextSelectedDate)
            });
        }
    };
    Datoinput.prototype.triggerDateChange = function () {
        var ISODateString = utils_1.formatInputToISODateFormatStrig(this.state.value);
        if (ISODateString !== this.props.selectedDate) {
            this.props.onDateChange(ISODateString);
        }
    };
    Datoinput.prototype.onKeyDown = function (evt) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            this.triggerDateChange();
        }
    };
    Datoinput.prototype.focus = function () {
        if (this.input) {
            this.input.focus();
        }
    };
    Datoinput.prototype.onChange = function (evt) {
        var value = evt.target.value;
        if (this.props.onInputChange) {
            this.props.onInputChange(value, evt);
        }
        this.setState({ value: value });
    };
    Datoinput.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            inputProps = _a.inputProps,
            disabled = _a.disabled;
        return React.createElement("input", __assign({}, inputProps, { className: classnames('nav-datovelger__input', {
                'nav-datovelger__input--datePickerTarget': this.props.isDatePickerTarget
            }), disabled: disabled, autoComplete: "off", autoCorrect: "off", pattern: "\\d{2}.\\d{2}.\\d{4}", type: "text", ref: function (c) {
                return _this.input = c;
            }, value: this.state.value || '', maxLength: 10, onChange: this.onChange, onBlur: this.triggerDateChange, onKeyDown: this.onKeyDown }));
    };
    return Datoinput;
}(React.Component);
exports.Datoinput = Datoinput;
exports.default = Datoinput;
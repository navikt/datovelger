"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames = require("classnames");
var utils_1 = require("./utils");
var moment = require("moment");
exports.dateRegExp = /^(\d{1,2}).(\d{1,2}).(\d{4})$/;
var getDateFromString = function (value) {
    var values = value.match(exports.dateRegExp);
    if (values && values.length === 4) {
        return moment.utc(value, 'DD.MM.YYYY').toDate();
    }
    return undefined;
};
var Input = /** @class */function (_super) {
    __extends(Input, _super);
    function Input(props) {
        var _this = _super.call(this, props) || this;
        _this.focus = _this.focus.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.triggerDateChange = _this.triggerDateChange.bind(_this);
        _this.state = {
            value: utils_1.formatDateInputValue(props.date)
        };
        return _this;
    }
    Input.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.date !== this.props.date) {
            this.setState({
                value: utils_1.formatDateInputValue(nextProps.date)
            });
        }
    };
    Input.prototype.focus = function () {
        if (this.input) {
            this.input.focus();
        }
    };
    Input.prototype.onBlur = function (evt) {
        this.triggerDateChange();
    };
    Input.prototype.onKeyDown = function (evt) {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            this.triggerDateChange();
        }
    };
    Input.prototype.onChange = function (evt) {
        var value = evt.target.value;
        if (this.props.onInputChange) {
            this.props.onInputChange(value, evt);
        }
        this.setState({ value: value });
    };
    Input.prototype.triggerDateChange = function () {
        if (getDateFromString(this.state.value) !== this.props.date) {
            this.props.onDateChange(getDateFromString(this.state.value));
        }
    };
    Input.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            inputProps = _a.inputProps,
            disabled = _a.disabled;
        return React.createElement("input", __assign({}, inputProps, { className: classnames('nav-datovelger__input', {
                'nav-datovelger__input--datePickerTarget': this.props.isDatePickerTarget
            }), disabled: disabled, autoComplete: "off", autoCorrect: "off", pattern: "\\d{2}.\\d{2}.\\d{4}", type: "text", ref: function (c) {
                return _this.input = c;
            }, value: this.state.value, maxLength: 10, onChange: this.onChange, onBlur: this.onBlur, onKeyDown: this.onKeyDown }));
    };
    return Input;
}(React.Component);
exports.Input = Input;
exports.default = Input;
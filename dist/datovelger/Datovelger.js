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
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames = require("classnames");
var utils_1 = require("./utils");
var datovalidering_1 = require("./utils/datovalidering");
var KalenderKnapp_1 = require("./elementer/KalenderKnapp");
var DomEventContainer_1 = require("./common/DomEventContainer");
var Datoinput_1 = require("./Datoinput");
var Kalender_1 = require("./kalender/Kalender");
var KalenderPortal_1 = require("./elementer/KalenderPortal");
var AvgrensningerInfo_1 = require("./elementer/AvgrensningerInfo");
var Datovelger = /** @class */function (_super) {
    __extends(Datovelger, _super);
    function Datovelger(props) {
        var _this = _super.call(this, props) || this;
        _this.onVelgDag = _this.onVelgDag.bind(_this);
        _this.onDatoDateChange = _this.onDatoDateChange.bind(_this);
        _this.toggleKalender = _this.toggleKalender.bind(_this);
        _this.lukkKalender = _this.lukkKalender.bind(_this);
        _this.onDateInputChange = _this.onDateInputChange.bind(_this);
        _this.state = {
            måned: utils_1.getDefaultMåned(props.dato, props.avgrensninger),
            datovalidering: props.dato ? datovalidering_1.validerDato(props.dato, props.avgrensninger || {}) : 'datoErIkkeDefinert',
            erÅpen: false,
            inputValue: ''
        };
        return _this;
    }
    Datovelger.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            datovalidering: datovalidering_1.validerDato(nextProps.dato, nextProps.avgrensninger || {}),
            måned: utils_1.getDefaultMåned(nextProps.dato, nextProps.avgrensninger)
        });
    };
    Datovelger.prototype.onVelgDag = function (dato, lukkKalender) {
        var datovalidering = datovalidering_1.validerDato(dato, this.props.avgrensninger || {});
        this.setState({
            erÅpen: false,
            datovalidering: datovalidering
        });
        this.props.onChange(dato);
        if (lukkKalender) {
            this.lukkKalender(true);
        }
    };
    Datovelger.prototype.onDatoDateChange = function (dato) {
        var datovalidering = datovalidering_1.validerDato(dato, this.props.avgrensninger || {});
        this.setState({
            erÅpen: false,
            datovalidering: datovalidering
        });
        this.props.onChange(dato);
    };
    Datovelger.prototype.onDateInputChange = function (value, event) {
        var _a = this.props,
            avgrensninger = _a.avgrensninger,
            input = _a.input;
        var dato = event.target.value;
        var datovalidering = datovalidering_1.validerDato(dato, avgrensninger || {});
        this.setState({
            erÅpen: false,
            datovalidering: datovalidering,
            inputValue: dato
        });
        if (input && input.onChange) {
            input.onChange(value, event);
        }
    };
    Datovelger.prototype.toggleKalender = function () {
        this.setFokusPåKalenderKnapp = true;
        this.setState({ erÅpen: !this.state.erÅpen });
    };
    Datovelger.prototype.lukkKalender = function (settFokusPåKalenderknapp) {
        this.setState({ erÅpen: false });
        this.setFokusPåKalenderKnapp = settFokusPåKalenderknapp;
    };
    Datovelger.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!prevState.erÅpen && this.state.erÅpen && this.kalender) {
            this.kalender.settFokus();
        } else if (prevState.erÅpen && !this.state.erÅpen && this.setFokusPåKalenderKnapp && this.kalenderKnapp) {
            this.setFokusPåKalenderKnapp = false;
            this.kalenderKnapp.focus();
        }
    };
    Datovelger.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            dato = _a.dato,
            input = _a.input,
            kalender = _a.kalender,
            avgrensninger = _a.avgrensninger,
            _b = _a.locale,
            locale = _b === void 0 ? 'nb' : _b,
            disabled = _a.disabled,
            _c = _a.kanVelgeUgyldigDato,
            kanVelgeUgyldigDato = _c === void 0 ? false : _c,
            kalenderProps = __rest(_a, ["dato", "input", "kalender", "avgrensninger", "locale", "disabled", "kanVelgeUgyldigDato"]);
        var _d = this.state,
            erÅpen = _d.erÅpen,
            datovalidering = _d.datovalidering;
        var avgrensningerInfoId = avgrensninger ? this.props.id + "_srDesc" : undefined;
        var invalidDate = datovalidering !== 'gyldig' && this.state.inputValue !== '';
        var onChange = input.onChange,
            ariaDescribedby = input.ariaDescribedby,
            ariaLabel = input.ariaLabel,
            restOfInputProps = __rest(input, ["onChange", "ariaDescribedby", "ariaLabel"]);
        var dateInputProps = __assign({ name: input && input.name ? input.name : this.props.id + "__input", 'aria-invalid': invalidDate, 'aria-describedby': avgrensningerInfoId, 'aria-label': ariaLabel }, restOfInputProps);
        return React.createElement(DomEventContainer_1.default, null, React.createElement("div", { className: classnames('nav-datovelger') }, React.createElement("div", { className: "nav-datovelger__inputContainer" }, React.createElement(Datoinput_1.default, { inputProps: dateInputProps, ref: function (c) {
                return _this.input = c;
            }, date: dato, onDateChange: this.onDatoDateChange, onInputChange: this.onDateInputChange, disabled: disabled }), React.createElement(KalenderKnapp_1.default, { disabled: disabled, ref: function (c) {
                return _this.kalenderKnapp = c;
            }, onClick: this.toggleKalender, "er\u00C5pen": erÅpen || false }), avgrensninger && React.createElement(AvgrensningerInfo_1.default, { id: avgrensningerInfoId, avgrensninger: avgrensninger })), erÅpen && React.createElement(KalenderPortal_1.default, { plassering: kalender && kalender.plassering }, React.createElement(Kalender_1.default, __assign({ ref: function (c) {
                return _this.kalender = c;
            } }, kalenderProps, { locale: locale, dato: dato, "m\u00E5ned": this.state.måned, min: avgrensninger && avgrensninger.minDato, maks: avgrensninger && avgrensninger.maksDato, utilgjengeligeDager: avgrensninger ? utils_1.getUtilgjengeligeDager(avgrensninger) : undefined, onVelgDag: function (d) {
                return _this.onVelgDag(d, true);
            }, onLukk: function () {
                return _this.lukkKalender(true);
            }, kanVelgeUgyldigDato: kanVelgeUgyldigDato, dayPickerProps: this.props.dayPickerProps })))));
    };
    return Datovelger;
}(React.Component);
exports.default = Datovelger;
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
var __rest = this && this.__rest || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames = require("classnames");
var nav_frontend_js_utils_1 = require("nav-frontend-js-utils");
var utils_1 = require("./utils");
var datovalidering_1 = require("./utils/datovalidering");
var KalenderKnapp_1 = require("./elementer/KalenderKnapp");
var DomEventContainer_1 = require("./common/DomEventContainer");
var Datoinput_1 = require("./Datoinput");
var AvgrensningerInfo_1 = require("./elementer/AvgrensningerInfo");
var Kalender_1 = require("./kalender/Kalender");
var getUtilgjengeligeDager = function (avgrensninger) {
    var ugyldigeDager = [];
    if (avgrensninger.ugyldigeTidsperioder) {
        ugyldigeDager = avgrensninger.ugyldigeTidsperioder.map(function (t) {
            return {
                from: t.startdato,
                to: t.sluttdato
            };
        });
    }
    var minDato = avgrensninger.minDato && utils_1.normaliserDato(avgrensninger.minDato);
    var maksDato = avgrensninger.maksDato && utils_1.normaliserDato(avgrensninger.maksDato);
    var helgedager = {
        daysOfWeek: avgrensninger.helgedagerIkkeTillatt ? [0, 6] : []
    };
    return ugyldigeDager.concat(maksDato ? [{ after: maksDato.toDate() }] : [], minDato ? [{ before: minDato.toDate() }] : [], [helgedager]);
};
var Datovelger = /** @class */function (_super) {
    __extends(Datovelger, _super);
    function Datovelger(props) {
        var _this = _super.call(this, props) || this;
        _this.instansId = nav_frontend_js_utils_1.guid();
        _this.onVelgDag = _this.onVelgDag.bind(_this);
        _this.onDatoDateChange = _this.onDatoDateChange.bind(_this);
        _this.toggleKalender = _this.toggleKalender.bind(_this);
        _this.lukkKalender = _this.lukkKalender.bind(_this);
        _this.state = {
            måned: props.valgtDato || new Date(),
            datovalidering: props.valgtDato ? datovalidering_1.validerDato(props.valgtDato, props.avgrensninger || {}) : 'datoErIkkeDefinert',
            erÅpen: false,
            statusMessage: ''
        };
        return _this;
    }
    Datovelger.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            datovalidering: datovalidering_1.validerDato(nextProps.valgtDato, nextProps.avgrensninger || {})
        });
    };
    Datovelger.prototype.onVelgDag = function (dato, lukkKalender) {
        var datovalidering = datovalidering_1.validerDato(dato, this.props.avgrensninger || {});
        if (datovalidering === 'gyldig') {
            this.setState({
                statusMessage: "Valgt dag: " + utils_1.formatDateInputValue(dato),
                erÅpen: false,
                datovalidering: datovalidering
            });
            this.props.onVelgDag(dato);
        } else if (this.props.onUgyldigDagValgt) {
            this.props.onUgyldigDagValgt(dato, datovalidering);
            this.setState({ datovalidering: datovalidering });
        }
        if (lukkKalender) {
            this.lukkKalender(true);
        }
    };
    Datovelger.prototype.onDatoDateChange = function (dato) {
        var datovalidering = datovalidering_1.validerDato(dato, this.props.avgrensninger || {});
        if (datovalidering === 'gyldig') {
            this.setState({
                statusMessage: "Valgt dag: " + utils_1.formatDateInputValue(dato),
                erÅpen: false,
                datovalidering: datovalidering
            });
            this.props.onVelgDag(dato);
        } else if (this.props.onUgyldigDagValgt) {
            this.props.onUgyldigDagValgt(dato, datovalidering);
            this.setState({ datovalidering: datovalidering });
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
            valgtDato = _a.valgtDato,
            id = _a.id,
            inputProps = _a.inputProps,
            avgrensninger = _a.avgrensninger,
            _b = _a.locale,
            locale = _b === void 0 ? 'nb' : _b,
            kalenderProps = __rest(_a, ["valgtDato", "id", "inputProps", "avgrensninger", "locale"]);
        var _c = this.state,
            erÅpen = _c.erÅpen,
            datovalidering = _c.datovalidering;
        var avgrensningerInfoId = avgrensninger ? this.instansId + "_srDesc" : undefined;
        var invalidDate = datovalidering !== 'gyldig' && this.props.valgtDato !== undefined;
        return React.createElement(DomEventContainer_1.default, null, React.createElement("div", { className: classnames('nav-datovelger') }, avgrensninger && avgrensningerInfoId && React.createElement(AvgrensningerInfo_1.default, { id: avgrensningerInfoId, avgrensninger: avgrensninger }), React.createElement("div", { className: "nav-datovelger__inputContainer blokk-s" }, "a", React.createElement(Datoinput_1.default, __assign({}, inputProps, { inputProps: {
                id: id,
                'aria-invalid': invalidDate,
                'aria-describedby': avgrensningerInfoId
            }, ref: function (c) {
                return _this.input = c;
            }, date: valgtDato, onDateChange: this.onDatoDateChange })), React.createElement(KalenderKnapp_1.default, { ref: function (c) {
                return _this.kalenderKnapp = c;
            }, onClick: this.toggleKalender, "er\u00C5pen": erÅpen || false })), erÅpen && React.createElement(Kalender_1.default, __assign({ ref: function (c) {
                return _this.kalender = c;
            } }, kalenderProps, { locale: locale, dato: valgtDato, "m\u00E5ned": valgtDato || new Date(), min: avgrensninger && avgrensninger.minDato, maks: avgrensninger && avgrensninger.maksDato, utilgjengeligeDager: avgrensninger ? getUtilgjengeligeDager(avgrensninger) : undefined, onVelgDag: function (d) {
                return _this.onVelgDag(d, true);
            }, onLukk: function () {
                return _this.lukkKalender(true);
            } }))));
    };
    return Datovelger;
}(React.Component);
exports.default = Datovelger;
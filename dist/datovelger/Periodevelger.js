"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var Datoinput_1 = require("./Datoinput");

var KalenderKnapp_1 = require("./elementer/KalenderKnapp");

var utils_1 = require("./utils");

var KalenderPortal_1 = require("./elementer/KalenderPortal");

var Kalender_1 = require("./kalender/Kalender");

var moment = require("moment");

var trimInputProps = function (componentId, id, props) {
  var standardProps = {
    id: componentId + "_" + id
  };

  if (!props) {
    return standardProps;
  }

  var onChange = props.onChange,
      ariaDescribedby = props.ariaDescribedby,
      ariaLabel = props.ariaLabel,
      rest = __rest(props, ["onChange", "ariaDescribedby", "ariaLabel"]);

  return __assign({}, standardProps, {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel
  }, rest);
};

var Periodevelger =
/** @class */
function (_super) {
  __extends(Periodevelger, _super);

  function Periodevelger(props) {
    var _this = _super.call(this, props) || this;

    _this.onStartdateChange = _this.onStartdateChange.bind(_this);
    _this.onStartInputChange = _this.onStartInputChange.bind(_this);
    _this.onSluttdateChange = _this.onSluttdateChange.bind(_this);
    _this.onSluttInputChange = _this.onSluttInputChange.bind(_this);
    _this.toggleKalender = _this.toggleKalender.bind(_this);
    _this.onVelgDato = _this.onVelgDato.bind(_this);
    _this.onMouseEnter = _this.onMouseEnter.bind(_this);
    _this.lukkKalender = _this.lukkKalender.bind(_this);
    _this.getSelectedDays = _this.getSelectedDays.bind(_this);
    _this.onDayFocus = _this.onDayFocus.bind(_this);
    _this.state = {
      måned: new Date(),
      erÅpen: false,
      fra: props.startdato,
      til: props.sluttdato
    };
    return _this;
  }

  Periodevelger.prototype.componentWillReceiveProps = function (nextProps) {
    this.setState({
      fra: nextProps.startdato,
      til: nextProps.sluttdato,
      hoverTil: undefined
    });
  };

  Periodevelger.prototype.onStartdateChange = function (fra) {
    this.setState({
      fra: fra
    });
    var sluttdato = this.props.sluttdato;
    var til = this.state.til;

    if (sluttdato !== undefined || til !== undefined) {
      this.props.onChange(fra, sluttdato || til);
    }
  };

  Periodevelger.prototype.onStartInputChange = function (verdi, evt) {
    if (this.props.startInputProps && this.props.startInputProps.onChange) {
      this.props.startInputProps.onChange(verdi, evt);
    }
  };

  Periodevelger.prototype.onSluttdateChange = function (til) {
    this.setState({
      til: til
    });
    var startdato = this.props.startdato;
    var fra = this.state.fra;

    if (startdato !== undefined || fra !== undefined) {
      this.props.onChange(startdato || fra, til);
    }
  };

  Periodevelger.prototype.onSluttInputChange = function (verdi, evt) {
    if (this.props.sluttInputProps && this.props.sluttInputProps.onChange) {
      this.props.sluttInputProps.onChange(verdi, evt);
    }
  };

  Periodevelger.prototype.onVelgDato = function (dato, lukkKalender) {
    var _a = this.state,
        fra = _a.fra,
        til = _a.til;

    if (fra && til) {
      this.setState({
        fra: dato,
        til: undefined,
        hoverTil: this.props.sluttdato,
        inputTarget: 'til'
      });
    }

    if (!fra) {
      this.setState({
        fra: dato,
        til: this.props.sluttdato,
        inputTarget: 'til'
      });
    } else if (fra && !til) {
      var f = moment.min(moment(fra), moment(dato)).format('YYYY-MM-DD');
      var t = moment.max(moment(fra), moment(dato)).format('YYYY-MM-DD');
      this.setState({
        fra: f,
        til: t
      });
      this.props.onChange(f, t);
      this.lukkKalender();
    }
  };

  Periodevelger.prototype.onMouseEnter = function (dato) {
    if (this.state.fra && !this.state.til) {
      this.setState({
        hoverTil: moment.utc(dato, moment.HTML5_FMT.DATE).format('YYYY-DD-MM')
      });
    }
  };

  Periodevelger.prototype.onDayFocus = function (dato, modifiers, evt) {
    if (this.state.fra) {
      this.setState({
        hoverTil: dato
      });
    }
  };

  Periodevelger.prototype.toggleKalender = function (start) {
    var _a = this.props,
        startdato = _a.startdato,
        sluttdato = _a.sluttdato;
    this.setFokusPåKalenderKnapp = true;
    this.setState({
      erÅpen: !this.state.erÅpen,
      inputTarget: 'fra',
      fra: start || startdato,
      til: sluttdato
    });
  };

  Periodevelger.prototype.lukkKalender = function (settFokusPåKalenderknapp) {
    this.setState({
      erÅpen: false
    });
    this.setFokusPåKalenderKnapp = settFokusPåKalenderknapp;
  };

  Periodevelger.prototype.componentDidUpdate = function (prevProps, prevState) {
    if (!prevState.erÅpen && this.state.erÅpen && this.kalender) {
      this.kalender.settFokus();
    } else if (prevState.erÅpen && !this.state.erÅpen && this.setFokusPåKalenderKnapp && this.sluttKalenderKnapp) {
      this.setFokusPåKalenderKnapp = false;
      this.sluttKalenderKnapp.focus();
    }
  };

  Periodevelger.prototype.getSelectedDays = function () {
    var _a = this.state,
        fra = _a.fra,
        til = _a.til;

    if (fra && til) {
      return [moment.utc(fra, moment.HTML5_FMT.DATE).toDate(), {
        from: moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
        to: moment.utc(til, moment.HTML5_FMT.DATE).toDate()
      }];
    } else if (fra && !til && this.state.hoverTil) {
      return [moment.utc(fra, moment.HTML5_FMT.DATE).toDate(), {
        from: moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
        to: moment.utc(this.state.hoverTil, moment.HTML5_FMT.DATE).toDate()
      }];
    }

    return [];
  };

  Periodevelger.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        startdato = _a.startdato,
        sluttdato = _a.sluttdato,
        kalender = _a.kalender,
        avgrensninger = _a.avgrensninger,
        _b = _a.locale,
        locale = _b === void 0 ? 'nb' : _b,
        disabled = _a.disabled,
        _c = _a.kanVelgeUgyldigDato,
        kanVelgeUgyldigDato = _c === void 0 ? false : _c,
        startInputProps = _a.startInputProps,
        sluttInputProps = _a.sluttInputProps,
        kalenderProps = __rest(_a, ["startdato", "sluttdato", "kalender", "avgrensninger", "locale", "disabled", "kanVelgeUgyldigDato", "startInputProps", "sluttInputProps"]);

    var _d = this.state,
        erÅpen = _d.erÅpen,
        fra = _d.fra,
        til = _d.til,
        hoverTil = _d.hoverTil,
        inputTarget = _d.inputTarget;
    var mod;

    if (fra && til || hoverTil) {
      mod = {
        start: moment.utc(fra, moment.HTML5_FMT.DATE).toDate(),
        end: moment.utc(til, moment.HTML5_FMT.DATE).toDate() || moment.utc(hoverTil, moment.HTML5_FMT.DATE).toDate()
      };
    }

    var dayPickerProps = __assign({}, this.props.dayPickerProps, {
      modifiers: mod,
      onDayMouseEnter: this.onMouseEnter,
      selectedDays: this.getSelectedDays(),
      numberOfMonths: 1,
      onDayFocus: this.onDayFocus,
      className: 'DayPicker--range'
    });

    return React.createElement("div", {
      className: "nav-datovelger"
    }, React.createElement("div", {
      className: "nav-datovelger__periode"
    }, React.createElement("div", {
      className: "nav-datovelger__periode__startInput"
    }, React.createElement("div", {
      className: "nav-datovelger__inputContainer"
    }, React.createElement(Datoinput_1.default, {
      inputProps: __assign({}, trimInputProps(this.props.id, 'start', startInputProps)),
      ref: function (c) {
        return _this.startInput = c;
      },
      selectedDate: fra && fra || startdato && startdato,
      onDateChange: function (d) {
        return _this.onStartdateChange(d);
      },
      onInputChange: this.onStartInputChange,
      isDatePickerTarget: erÅpen && inputTarget === 'fra',
      disabled: disabled
    }), React.createElement(KalenderKnapp_1.default, {
      ref: function (c) {
        return _this.startKalenderKnapp = c;
      },
      onClick: this.toggleKalender,
      "er\u00C5pen": erÅpen || false,
      disabled: disabled
    }))), React.createElement("div", {
      className: "nav-datovelger__periode__sluttInput"
    }, React.createElement("div", {
      className: "nav-datovelger__inputContainer"
    }, React.createElement(Datoinput_1.default, {
      inputProps: __assign({}, trimInputProps(this.props.id, 'slutt', sluttInputProps), {
        'aria-label': 'Til dato'
      }),
      ref: function (c) {
        return _this.sluttInput = c;
      },
      selectedDate: til && til || sluttdato && sluttdato,
      onDateChange: function (d) {
        return _this.onSluttdateChange(d);
      },
      onInputChange: this.onSluttInputChange,
      isDatePickerTarget: erÅpen && inputTarget === 'til',
      disabled: disabled
    }), React.createElement(KalenderKnapp_1.default, {
      ref: function (c) {
        return _this.sluttKalenderKnapp = c;
      },
      onClick: function () {
        return _this.toggleKalender(startdato);
      },
      "er\u00C5pen": erÅpen || false,
      disabled: disabled
    }))), erÅpen && React.createElement(KalenderPortal_1.default, {
      plassering: kalender && kalender.plassering
    }, React.createElement(Kalender_1.default, __assign({
      ref: function (c) {
        return _this.kalender = c;
      }
    }, kalenderProps, {
      locale: locale,
      "m\u00E5ned": this.state.måned,
      min: avgrensninger && avgrensninger.minDato,
      maks: avgrensninger && avgrensninger.maksDato,
      utilgjengeligeDager: avgrensninger ? utils_1.getUtilgjengeligeDager(avgrensninger) : undefined,
      onVelgDag: function (d) {
        return _this.onVelgDato(d, true);
      },
      onLukk: function () {
        return _this.lukkKalender(true);
      },
      kanVelgeUgyldigDato: kanVelgeUgyldigDato,
      dayPickerProps: dayPickerProps
    })))));
  };

  return Periodevelger;
}(React.Component);

exports.default = Periodevelger;
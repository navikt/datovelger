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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var nav_frontend_js_utils_1 = require("nav-frontend-js-utils");

var moment = require("moment");

var getAvailableMonths = function (monthNames, defaultMonth, min, maks) {
  var options = [];
  var from = min && defaultMonth.getFullYear() === min.getFullYear() ? min.getMonth() : 0;
  var to = maks && defaultMonth.getFullYear() === maks.getFullYear() ? maks.getMonth() : 11;
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

var YearSelector =
/** @class */
function (_super) {
  __extends(YearSelector, _super);

  function YearSelector(props) {
    var _this = _super.call(this, props) || this;

    _this.onChange = _this.onChange.bind(_this);
    _this.onYearChange = _this.onYearChange.bind(_this);
    _this.getYear = _this.getYear.bind(_this);
    _this.getMonth = _this.getMonth.bind(_this);
    return _this;
  }

  YearSelector.prototype.getYear = function () {
    if (this.yearSelect) {
      return parseInt(this.yearSelect.value, 10);
    }

    return (this.props.min || this.props.max || new Date()).getFullYear();
  };

  YearSelector.prototype.getMonth = function () {
    if (this.monthSelect) {
      return parseInt(this.monthSelect.value, 10);
    }

    return (this.props.min || this.props.max || new Date()).getMonth();
  };

  YearSelector.prototype.onChange = function (evt) {
    this.props.onChange(new Date(this.getYear(), this.getMonth()));
  };

  YearSelector.prototype.onYearChange = function (evt) {
    var year = parseInt(this.yearSelect.value, 10);
    var month = parseInt(this.monthSelect.value, 10);
    var newDate = new Date(year, month);

    if (this.props.min && moment(newDate).isBefore(this.props.min)) {
      this.props.onChange(this.props.min);
    } else if (this.props.max && moment(newDate).isAfter(this.props.max)) {
      this.props.onChange(this.props.max);
    } else {
      this.props.onChange(newDate);
    }
  };

  YearSelector.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        defaultMonth = _a.defaultMonth,
        _b = _a.min,
        min = _b === void 0 ? new Date(1900, 0, 1) : _b,
        _c = _a.max,
        max = _c === void 0 ? moment().add(4, 'years').toDate() : _c,
        localeUtils = _a.localeUtils,
        locale = _a.locale;
    var monthNames = localeUtils.getMonths(locale);
    var monthOptions = getAvailableMonths(monthNames, defaultMonth, min, max);
    var years = [];
    var minYear = Math.min(defaultMonth.getFullYear(), min.getFullYear());
    var maxYear = Math.max(defaultMonth.getFullYear(), max.getFullYear());

    for (var i = minYear; i <= maxYear; i += 1) {
      years.push(i);
    }

    var mndSelectId = nav_frontend_js_utils_1.guid();
    var yearSelectId = nav_frontend_js_utils_1.guid();
    var showYearSelect = years.length > 1;
    return React.createElement("div", {
      className: "nav-datovelger__yearSelector"
    }, showYearSelect && React.createElement("div", {
      className: "selectContainer"
    }, React.createElement("label", {
      className: "sr-only",
      htmlFor: yearSelectId
    }, "Velg \u00E5r"), React.createElement("select", {
      id: yearSelectId,
      ref: function (c) {
        return _this.yearSelect = c;
      },
      className: "skjemaelement__input skjemaelement__input--year",
      name: "year",
      onChange: this.onYearChange,
      value: defaultMonth.getFullYear()
    }, years.map(function (year) {
      return React.createElement("option", {
        key: year,
        value: year
      }, year);
    }))), React.createElement("div", {
      className: "selectContainer" + (showYearSelect === false ? ' selectContainer--monthOnly' : '')
    }, React.createElement("label", {
      className: "sr-only",
      htmlFor: mndSelectId
    }, "Velg m\u00E5ned"), React.createElement("select", {
      id: mndSelectId,
      ref: function (c) {
        return _this.monthSelect = c;
      },
      className: "skjemaelement__input",
      name: "month",
      onChange: this.onChange,
      value: defaultMonth.getMonth()
    }, monthOptions.map(function (m) {
      return React.createElement("option", {
        key: m.value,
        value: m.value
      }, m.label);
    }))));
  };

  return YearSelector;
}(React.Component);

exports.default = YearSelector;
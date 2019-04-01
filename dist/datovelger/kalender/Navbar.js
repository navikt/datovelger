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

var moment = require("moment");

var classnames = require("classnames");

var ChevronSvg_1 = require("../elementer/ChevronSvg");

var tekster_1 = require("../tekster");

var YearSelector_1 = require("./YearSelector");

var NavbarKnapp = function (_a) {
  var måned = _a.måned,
      retning = _a.retning,
      disabled = _a.disabled,
      onClick = _a.onClick;
  var label = retning === 'forrige' ? tekster_1.Tekster.navbar_forrigeManed_label : tekster_1.Tekster.navbar_nesteManed_label;
  return React.createElement("button", {
    className: classnames('nav-datovelger__navbar__knapp', "nav-datovelger__navbar__knapp--" + retning, {
      'nav-datovelger__navbar__knapp--disabled': disabled
    }),
    type: "button",
    onClick: function (e) {
      return disabled ? null : onClick(e, måned);
    },
    "aria-label": label,
    "aria-disabled": disabled,
    role: "button"
  }, React.createElement(ChevronSvg_1.default, {
    retning: retning === 'forrige' ? 'venstre' : 'høyre'
  }));
};

var lagCaption = function (props) {
  return props.localeUtils.formatMonthTitle(props.defaultMåned, props.locale);
};

var Navbar =
/** @class */
function (_super) {
  __extends(Navbar, _super);

  function Navbar() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Navbar.prototype.shouldComponentUpdate = function (nextProps) {
    return lagCaption(nextProps) !== lagCaption(this.props);
  };

  Navbar.prototype.render = function () {
    var _a = this.props,
        defaultMåned = _a.defaultMåned,
        byttMåned = _a.byttMåned,
        min = _a.min,
        maks = _a.maks,
        visÅrVelger = _a.visÅrVelger,
        locale = _a.locale,
        localeUtils = _a.localeUtils;
    var forrigeMåned = moment(defaultMåned).add(-1, 'months');
    var nesteMåned = moment(defaultMåned).add(1, 'months');
    var forrigeErDisabled = min ? moment(min).isAfter(forrigeMåned.endOf('month')) : false;
    var nesteErDisabled = maks ? moment(maks).isBefore(nesteMåned.startOf('month')) : false;

    var onClick = function (evt, mnd) {
      evt.preventDefault();
      evt.stopPropagation();
      byttMåned(mnd);
    };

    return React.createElement("div", {
      className: "DayPicker-Caption"
    }, React.createElement("span", {
      "aria-live": "assertive",
      className: visÅrVelger ? 'sr-only' : ''
    }, lagCaption(this.props)), visÅrVelger && React.createElement("div", {
      className: "nav-datovelger__navbar__yearSelector"
    }, React.createElement(YearSelector_1.default, {
      defaultMonth: defaultMåned,
      max: maks,
      min: min,
      locale: locale,
      localeUtils: localeUtils,
      onChange: function (mnd) {
        return byttMåned(mnd);
      }
    })), React.createElement("div", {
      className: "nav-datovelger__navbar " + (visÅrVelger ? 'nav-datovelger__navbar--withYearSelector' : ''),
      role: "nav"
    }, React.createElement(NavbarKnapp, {
      "m\u00E5ned": forrigeMåned.toDate(),
      retning: "forrige",
      disabled: forrigeErDisabled,
      onClick: onClick
    }), React.createElement(NavbarKnapp, {
      "m\u00E5ned": nesteMåned.toDate(),
      retning: "neste",
      disabled: nesteErDisabled,
      onClick: onClick
    })));
  };

  return Navbar;
}(React.Component);

exports.default = Navbar;
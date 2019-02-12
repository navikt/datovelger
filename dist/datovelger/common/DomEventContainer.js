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

function contains(node, child) {
  return node === child || node.contains(child);
}

exports.contains = contains;

var DomEventContainer =
/** @class */
function (_super) {
  __extends(DomEventContainer, _super);

  function DomEventContainer(props) {
    var _this = _super.call(this, props) || this;

    _this.handleBlur = _this.handleBlur.bind(_this);
    _this.startEventListening = _this.startEventListening.bind(_this);
    _this.stopEventListening = _this.stopEventListening.bind(_this);
    _this.handleDocumentKeyDown = _this.handleDocumentKeyDown.bind(_this);
    _this.handleInternalDocumentKeyDown = _this.handleInternalDocumentKeyDown.bind(_this);

    if (props.active) {
      _this.startEventListening();
    }

    return _this;
  }

  DomEventContainer.prototype.componentWillReceiveProps = function (nextProps) {
    if (!this.props.active && nextProps.active) {
      this.startEventListening();
    } else {
      this.stopEventListening();
    }
  };

  DomEventContainer.prototype.componentWillUnmount = function () {
    this.stopEventListening();
  };

  DomEventContainer.prototype.handleBlur = function (evt) {
    var _this = this;

    var domElement = this.domElement;

    if (!domElement) {
      return;
    }

    setTimeout(function () {
      var isChildElement = contains(domElement, window.document.activeElement);

      if (!isChildElement) {
        _this.blur('blur');
      }
    }, 0);
  };

  DomEventContainer.prototype.blur = function (source) {
    if (this.props.onBlur) {
      this.props.onBlur({
        source: source
      });
    }
  };

  DomEventContainer.prototype.handleDocumentKeyDown = function (evt) {
    if (evt.keyCode === 27) {
      this.blur('esc');
    }
  };

  DomEventContainer.prototype.handleInternalDocumentKeyDown = function (evt) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(evt);
    }
  };

  DomEventContainer.prototype.startEventListening = function () {
    window.addEventListener('keydown', this.handleDocumentKeyDown);
  };

  DomEventContainer.prototype.stopEventListening = function () {
    window.removeEventListener('keydown', this.handleDocumentKeyDown);
  };

  DomEventContainer.prototype.render = function () {
    var _this = this;
    /** Fjerner props som ikke er gyldige på div */


    var _a = this.props,
        deletedActive = _a.active,
        deletedOnBlur = _a.onBlur,
        children = _a.children,
        propsRest = __rest(_a, ["active", "onBlur", "children"]);

    return React.createElement("div", __assign({
      ref: function (c) {
        return _this.domElement = c;
      }
    }, propsRest, {
      onBlur: this.handleBlur,
      onKeyDown: this.handleInternalDocumentKeyDown,
      tabIndex: this.props.tabIndex
    }), this.props.children);
  };

  return DomEventContainer;
}(React.Component);

exports.default = DomEventContainer;
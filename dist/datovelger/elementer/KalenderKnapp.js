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
var KalenderIkon_1 = require("./KalenderIkon");
var tekster_1 = require("../tekster");
var KalenderKnapp = /** @class */function (_super) {
    __extends(KalenderKnapp, _super);
    function KalenderKnapp(props) {
        return _super.call(this, props) || this;
    }
    KalenderKnapp.prototype.focus = function () {
        if (this.button) {
            this.button.focus();
        }
    };
    KalenderKnapp.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            onClick = _a.onClick,
            erÅpen = _a.erÅpen,
            disabled = _a.disabled;
        return React.createElement("button", { ref: function (c) {
                return _this.button = c;
            }, type: "button", className: "nav-datovelger__kalenderknapp", onClick: function (e) {
                e.preventDefault();
                onClick();
            }, role: "button", disabled: disabled, "aria-label": tekster_1.Tekster.kalenderLabel, "aria-expanded": erÅpen }, React.createElement(KalenderIkon_1.default, null));
    };
    return KalenderKnapp;
}(React.Component);
exports.default = KalenderKnapp;
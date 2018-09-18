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
var lagCaption = function (props) {
    return props.localeUtils.formatMonthTitle(props.date, props.locale);
};
var AktivManed = /** @class */function (_super) {
    __extends(AktivManed, _super);
    function AktivManed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AktivManed.prototype.shouldComponentUpdate = function (nextProps) {
        return lagCaption(nextProps) !== lagCaption(this.props);
    };
    AktivManed.prototype.render = function () {
        return React.createElement("div", { className: "DayPicker-Caption", role: "presentation" }, lagCaption(this.props), React.createElement("div", null, React.createElement("button", null, "sdf")));
    };
    return AktivManed;
}(React.Component);
exports.AktivManed = AktivManed;
exports.default = AktivManed;
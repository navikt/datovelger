"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames = require("classnames");
var KalenderPortal = function (_a) {
    var _b = _a.plassering,
        plassering = _b === void 0 ? 'under' : _b,
        children = _a.children;
    return React.createElement("div", { className: classnames('nav-datovelger__kalenderPortal', "nav-datovelger__kalenderPortal--" + plassering) }, React.createElement("div", { className: "nav-datovelger__kalenderPortal__content" }, children));
};
exports.default = KalenderPortal;
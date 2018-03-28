"use strict";

var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var KalenderIkon = function (props) {
    return React.createElement("svg", __assign({ height: 16, width: 16, viewBox: "0 0 18 18" }, props, { role: "presentation", "aria-hidden": "true" }), React.createElement("title", null, "Kalender"), React.createElement("g", { stroke: "#0067C5", fill: "none", fillRule: "evenodd" }, React.createElement("path", { d: "M4 2.667H1.333v14h15.334v-14H14" }), React.createElement("path", { d: "M4 1.333h2V4H4zm8 0h2V4h-2zM6 2h6M1.333 6h15.334" })));
};
exports.default = KalenderIkon;
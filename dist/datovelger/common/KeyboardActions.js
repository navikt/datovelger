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
var DomEventContainer_1 = require("./DomEventContainer");
var getAction = function (evt, actions) {
    return actions.find(function (action) {
        if (evt.altKey) {
            return evt.key === action.key && action.altKey === true;
        }
        return evt.key === action.key;
    });
};
var KeyboardActions = /** @class */function (_super) {
    __extends(KeyboardActions, _super);
    function KeyboardActions(props) {
        var _this = _super.call(this, props) || this;
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        return _this;
    }
    KeyboardActions.prototype.onKeyDown = function (evt) {
        var action = getAction(evt, this.props.actions);
        if (action) {
            action.onAction(evt);
        }
    };
    KeyboardActions.prototype.render = function () {
        return React.createElement(DomEventContainer_1.default, { onKeyDown: this.onKeyDown }, this.props.children);
    };
    return KeyboardActions;
}(React.Component);
exports.KeyboardActions = KeyboardActions;
exports.default = KeyboardActions;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var KeyboardActions_1 = require("./KeyboardActions");

var enterAction = function (onAction) {
  return {
    name: 'enter',
    key: 'Enter',
    onAction: onAction
  };
};

var escapeAction = function (onAction) {
  return {
    name: 'escape',
    key: 'Escape',
    onAction: onAction
  };
};

var arrowUpAction = function (onAction) {
  return {
    name: 'arrowUp',
    key: 'ArrowUp',
    onAction: onAction
  };
};

var arrowDownAction = function (onAction) {
  return {
    name: 'arrowUp',
    key: 'ArrowUp',
    onAction: onAction
  };
};

var arrowLeftAction = function (onAction) {
  return {
    name: 'arrowLeft',
    key: 'ArrowLeft',
    onAction: onAction
  };
};

var arrowRightAction = function (onAction) {
  return {
    name: 'arrowRight',
    key: 'ArrowRight',
    onAction: onAction
  };
};

var pageUpAction = function (onAction) {
  return {
    name: 'pageUp',
    key: 'PageUp',
    onAction: onAction
  };
};

var pageDownAction = function (onAction) {
  return {
    name: 'pageDown',
    key: 'PageDown',
    onAction: onAction
  };
};

var altPageUpAction = function (onAction) {
  return {
    name: 'altPageUp',
    key: 'PageUp',
    altKey: true,
    onAction: onAction
  };
};

var altPageDownAction = function (onAction) {
  return {
    name: 'altPageDown',
    key: 'PageDown',
    altKey: true,
    onAction: onAction
  };
};

var homeAction = function (onAction) {
  return {
    name: 'home',
    key: 'Home',
    onAction: onAction
  };
};

var endAction = function (onAction) {
  return {
    name: 'end',
    key: 'End',
    onAction: onAction
  };
};

var KeyboardNavigation = function (props) {
  return React.createElement(KeyboardActions_1.KeyboardActions, {
    actions: (props.onEnter ? [enterAction(props.onEnter)] : []).concat(props.onEscape ? [escapeAction(props.onEscape)] : [], props.onArrowUp ? [arrowUpAction(props.onArrowUp)] : [], props.onArrowDown ? [arrowDownAction(props.onArrowDown)] : [], props.onArrowLeft ? [arrowLeftAction(props.onArrowLeft)] : [], props.onArrowRight ? [arrowRightAction(props.onArrowRight)] : [], props.onPageUp ? [pageUpAction(props.onPageUp)] : [], props.onPageDown ? [pageDownAction(props.onPageDown)] : [], props.onAltPageUp ? [altPageUpAction(props.onAltPageUp)] : [], props.onAltPageDown ? [altPageDownAction(props.onAltPageDown)] : [], props.onHome ? [homeAction(props.onHome)] : [], props.onEnd ? [endAction(props.onEnd)] : [])
  }, props.children);
};

exports.default = KeyboardNavigation;
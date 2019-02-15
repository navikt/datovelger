"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Datovelger_1 = require("../Datovelger");
describe('Datovelger', function () {
    it('Should be defined', function () {
        // TODO remove onChange from input prop. Function is unused.
        expect(enzyme_1.shallow(React.createElement(Datovelger_1.default, { input: { onChange: jest.fn() }, id: '1', onChange: jest.fn() }))).toBeDefined();
    });
    it('', function () {});
});
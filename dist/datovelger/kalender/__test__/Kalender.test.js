"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Kalender_1 = require("../Kalender");
describe('Kalender', function () {
    it('Should be defined', function () {
        expect(enzyme_1.shallow(React.createElement(Kalender_1.default, { onLukk: jest.fn(), onVelgDag: jest.fn(), locale: 'nb', "m\u00E5ned": new Date() }))).toBeDefined();
    });
});
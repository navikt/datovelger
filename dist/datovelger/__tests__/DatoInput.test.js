"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var enzyme_1 = require("enzyme");
var Datoinput_1 = require("../Datoinput");
describe('DatoInput', function () {
    it('Should be defined', function () {
        expect(enzyme_1.shallow(React.createElement(Datoinput_1.default, { onDateChange: jest.fn() }))).toBeDefined();
    });
    it('Should be blank initially', function () {
        var component = enzyme_1.shallow(React.createElement(Datoinput_1.default, { selectedDate: undefined, onDateChange: jest.fn() }));
        component.find('input').simulate('blur');
        expect(component.find('input').prop("value")).toEqual('');
    });
    it('onDateChange should return ISO formatted selectedDate string', function () {
        var onDateChangeMock = jest.fn();
        var component = enzyme_1.shallow(React.createElement(Datoinput_1.default, { onDateChange: onDateChangeMock }));
        component.find('input').simulate('change', { target: { value: '01.01.2019' } });
        component.find('input').simulate('blur');
        expect(onDateChangeMock).toHaveBeenCalledWith('2019-01-01');
    });
    it('ISO formatted selectedDate prop should render in DD.MM.YYYY format', function () {
        var component = enzyme_1.shallow(React.createElement(Datoinput_1.default, { selectedDate: '2019-01-01', onDateChange: jest.fn() }));
        expect(component.find('input').prop("value")).toEqual('01.01.2019');
    });
    it('selected date should not render in DD.MM.YYYY format', function () {
        var component = enzyme_1.shallow(React.createElement(Datoinput_1.default, { selectedDate: '2019-01-01', onDateChange: jest.fn() }));
        expect(component.find('input').prop("value")).toEqual('01.01.2019');
    });
    it('Should not render invalid date string', function () {
        var component = enzyme_1.shallow(React.createElement(Datoinput_1.default, { selectedDate: '40-30-2019', onDateChange: jest.fn() }));
        expect(component.find('input').prop("value") === 'Invalid date').toBeFalsy();
    });
    it('Should return invalid date string if selected date does not exist', function () {
        var onDateChangeMock = jest.fn();
        var component = enzyme_1.shallow(React.createElement(Datoinput_1.default, { selectedDate: '40-30-2019', onDateChange: onDateChangeMock }));
        component.find('input').simulate('change', { target: { value: '30.02.2019' } });
        component.find('input').simulate('blur');
        expect(onDateChangeMock).toHaveBeenCalledWith('Invalid date');
    });
});
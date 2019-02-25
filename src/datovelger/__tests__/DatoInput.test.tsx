import * as React from 'react';
import { shallow } from 'enzyme';

import Datoinput from '../Datoinput';

describe('DatoInput', () => {
    it('Should be defined', () => {
        expect(shallow(<Datoinput onDateChange={jest.fn()} />)).toBeDefined();
    });

    it('Should be blank initially', () => {
        const component  = shallow(<Datoinput valgtDato={undefined} onDateChange={jest.fn()} />);
        component.find('input').simulate('blur');
        expect(component.find('input').prop("value")).toEqual('');
    });

    it('onDateChange should return ISO formatted valgtDato string', () => {
        const onDateChangeMock = jest.fn();
        const component  = shallow(<Datoinput onDateChange={onDateChangeMock} />);
        component.find('input').simulate('change', { target: { value: '01.01.2019'}});
        component.find('input').simulate('blur');
        expect(onDateChangeMock).toHaveBeenCalledWith('2019-01-01');
    });

    it('ISO formatted valgtDato prop should render in DD.MM.YYYY format', () => {
        const component  = shallow(<Datoinput valgtDato={'2019-01-01'} onDateChange={jest.fn()} />);
        expect(component.find('input').prop("value")).toEqual('01.01.2019');
    });

    it('selected date should not render in DD.MM.YYYY format', () => {
        const component  = shallow(<Datoinput valgtDato={'2019-01-01'} onDateChange={jest.fn()} />);
        expect(component.find('input').prop("value")).toEqual('01.01.2019');
    });

    it('Should not render invalid date string', () => {
        const component  = shallow(<Datoinput valgtDato={'40-30-2019'} onDateChange={jest.fn()} />);
        expect(component.find('input').prop("value") ===  'Invalid date').toBeFalsy();
    });

    it('Should return invalid date string if selected date does not exist', () => {
        const onDateChangeMock = jest.fn();
        const component  = shallow(<Datoinput valgtDato={'40-30-2019'} onDateChange={onDateChangeMock} />);
        component.find('input').simulate('change', { target: { value: '30.02.2019'}});
        component.find('input').simulate('blur');
        expect(onDateChangeMock).toHaveBeenCalledWith('Invalid date');
    });
});

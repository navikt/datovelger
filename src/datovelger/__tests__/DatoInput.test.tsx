import * as React from 'react';
import { shallow } from 'enzyme';

import Datoinput from '../Datoinput';

describe('DatoInput', () => {
    it('Should be defined', () => {
        const component = shallow(
          <Datoinput onDateChange={jest.fn()} />,
        );
        expect(component).toBeDefined();
    });

    it('Should be blank initially', () => {
        const onDateChangeMock = jest.fn();
        const component  = shallow(<Datoinput selectedDate={undefined} onDateChange={onDateChangeMock} />);
        component.find('input').simulate('blur');
        expect(component.find('input').prop("value")).toEqual('');
    });

    it('onDateChange should return ISO formatted selectedDate string', () => {
        const onDateChangeMock = jest.fn();
        const component  = shallow(<Datoinput onDateChange={onDateChangeMock} />);
        component.find('input').simulate('change', { target: { value: '01.01.2019'}});
        component.find('input').simulate('blur');
        expect(onDateChangeMock).toHaveBeenCalledWith('2019-01-01');
    });

    it('ISO formatted selectedDate prop should render with correct formatting in input field', () => {
        const onDateChangeMock = jest.fn();
        const component  = shallow(<Datoinput selectedDate={'2019-01-01'} onDateChange={onDateChangeMock} />);
        expect(component.find('input').prop("value")).toEqual('01.01.2019');
    });

    // TODO skrive test for diverse timezone
});

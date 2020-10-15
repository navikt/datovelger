import React from 'react';
import { shallow } from 'enzyme';
import DateInput from '../DateInput';

describe('DateInput', () => {
    it('Should be defined', () => {
        expect(shallow(<DateInput id="abc" onDateChange={jest.fn()} />)).toBeDefined();
    });

    it('Should be blank initially', () => {
        const wrapper = shallow(<DateInput id="abc" dateValue={''} onDateChange={jest.fn()} />);
        expect(wrapper.find('input').length).toEqual(1);
        wrapper.find('input').simulate('blur', { target: { value: '' } });
        expect(wrapper.find('input').prop('value')).toEqual('');
    });

    it('onDateChange should return ISO formatted value string', () => {
        const onDateChangeMock = jest.fn();
        const component = shallow(<DateInput id="abc" onDateChange={onDateChangeMock} />);
        component.find('input').simulate('change', { target: { value: '01.01.2019' } });
        component.find('input').simulate('blur', { target: { value: '01.01.2019' } });
        expect(onDateChangeMock).toHaveBeenCalledWith('2019-01-01');
    });

    it('ISO formatted value prop should render in DD.MM.YYYY format', () => {
        const component = shallow(<DateInput id="abc" dateValue={'2019-01-01'} onDateChange={jest.fn()} />);
        expect(component.find('input').prop('value')).toEqual('01.01.2019');
    });

    it('selected date should not render in DD.MM.YYYY format', () => {
        const component = shallow(<DateInput id="abc" dateValue={'2019-01-01'} onDateChange={jest.fn()} />);
        expect(component.find('input').prop('value')).toEqual('01.01.2019');
    });

    it('Should render invalid date string', () => {
        const component = shallow(<DateInput id="abc" dateValue={'40-30-2019'} onDateChange={jest.fn()} />);
        expect(component.find('input').prop('value') === '40-30-2019').toBeTruthy();
    });

    it('Should return invalid date string if selected date does not exist', () => {
        const onDateChangeMock = jest.fn();
        const component = shallow(<DateInput id="abc" dateValue={'40-30-2019'} onDateChange={onDateChangeMock} />);
        component.find('input').simulate('change', { target: { value: '30.02.2019' } });
        component.find('input').simulate('blur', { target: { value: '30.02.2019' } });
        expect(onDateChangeMock).toHaveBeenCalledWith('30.02.2019');
    });
});

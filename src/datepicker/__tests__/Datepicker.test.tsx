import React from 'react';
import { mount, shallow } from 'enzyme';
import Datepicker from '../Datepicker';

describe('Datepicker', () => {
    it('Should be defined', () => {
        expect(
            shallow(<Datepicker inputProps={{ onChange: jest.fn() } as any} inputId={'inputId'} onChange={jest.fn()} />)
        ).toBeDefined();
    });

    it('Should render DateInput and CalendarButton', () => {
        const wrapper = shallow(<Datepicker inputProps={{ name: 'sdf' }} inputId={'inputId'} onChange={jest.fn()} />);
        const input = wrapper.find('ForwardRef(DateInput)');
        const button = wrapper.find('CalendarButton');
        expect(input.length).toBe(1);
        expect(button.length).toBe(1);
    });

    it('Should show calendar when CalendarButton clicked', () => {
        const wrapper = shallow(<Datepicker inputProps={{ name: 'sdf' }} inputId={'inputId'} onChange={jest.fn()} />);
        const button = wrapper.find('CalendarButton');
        button.simulate('click');
        expect(wrapper.find('CalendarPortal').length).toBe(1);
    });

    it('Should set new date when typed into DateInput ', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(
            <Datepicker inputProps={{ name: 'abc' }} inputId={'inputId'} onChange={changeFunction} />
        );
        const input = wrapper.find('ForwardRef(DateInput)');
        input.simulate('change', { target: { name: 'abc', value: '12.10.2000' } });
        input.simulate('blur');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual('2000-10-12');
        expect(wrapper.find('input').prop('value')).toBe('12.10.2000');
    });

    it('Should keep invalid date string in input when invalid formatted date is typed into DateInput ', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(
            <Datepicker inputProps={{ name: 'sdf' }} inputId={'inputId'} onChange={changeFunction} />
        );
        const input = wrapper.find('ForwardRef(DateInput)');
        input.simulate('change', { target: { value: '1210.2000' } });
        input.simulate('blur');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual('1210.2000');
        expect(wrapper.find('input').prop('value')).toBe('1210.2000');
    });

    it('Should trigger onChange with "" when empty string typed into DateInput ', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(
            <Datepicker inputProps={{ name: 'sdf' }} inputId={'inputId'} onChange={changeFunction} />
        );
        const input = wrapper.find('ForwardRef(DateInput)');
        input.simulate('change', { target: { value: '' } });
        input.simulate('blur');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual('');
        expect(wrapper.find('input').prop('value')).toBe('');
    });

    it('Should set correct date when date chosen from calendar', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(
            <Datepicker
                inputProps={{ name: 'sdf' }}
                inputId={'inputId'}
                onChange={changeFunction}
                value={'2020-06-20'}
            />
        );
        const button = wrapper.find('CalendarButton');
        button.simulate('click');
        const day = wrapper.find('[empty=false]').at(3);
        day.simulate('click');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual('2020-06-04');
    });
});

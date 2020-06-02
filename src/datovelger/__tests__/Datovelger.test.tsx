import React from 'react';
import { mount, shallow } from 'enzyme';
import Datovelger from '../Datovelger';

describe('Datovelger', () => {
    it('Should be defined', () => {
        expect(
            shallow(<Datovelger input={{ onChange: jest.fn() } as any} id={'1'} onChange={jest.fn()} />)
        ).toBeDefined();
    });

    it('Should render Datoinput and KalenderKnapp', () => {
        const wrapper = shallow(<Datovelger input={{ id: 'abc', name: 'sdf' }} id={'1'} onChange={jest.fn()} />);
        const input = wrapper.find('ForwardRef(Datoinput)');
        const button = wrapper.find('KalenderKnapp');
        expect(input.length).toBe(1);
        expect(button.length).toBe(1);
    });

    it('Should show calendar when KalenderKnapp clicked', () => {
        const wrapper = shallow(<Datovelger input={{ id: 'abc', name: 'sdf' }} id={'1'} onChange={jest.fn()} />);
        const button = wrapper.find('KalenderKnapp');
        button.simulate('click');
        expect(wrapper.find('KalenderPortal').length).toBe(1);
    });

    it('Should set new date when typed into Datoinput ', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(<Datovelger input={{ id: 'abc', name: 'abc' }} id={'1'} onChange={changeFunction} />);
        const input = wrapper.find('ForwardRef(Datoinput)');
        input.simulate('change', { target: { name: 'abc', value: '12.10.2000' } });
        input.simulate('blur');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual('2000-10-12');
        expect(wrapper.find('input').prop('value')).toBe('12.10.2000');
    });

    it('Should set "Invalid date" when invalid date is typed into Datoinput ', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(<Datovelger input={{ id: 'abc', name: 'sdf' }} id={'1'} onChange={changeFunction} />);
        const input = wrapper.find('ForwardRef(Datoinput)');
        input.simulate('change', { target: { value: '1210.2000' } });
        input.simulate('blur');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual('Invalid date');
        expect(wrapper.find('input').prop('value')).toBe('');
    });

    it('Should trigger onChange with undefined when empty string typed into Datoinput ', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(<Datovelger input={{ id: 'abc', name: 'sdf' }} id={'1'} onChange={changeFunction} />);
        const input = wrapper.find('ForwardRef(Datoinput)');
        input.simulate('change', { target: { value: '' } });
        input.simulate('blur');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual(undefined);
        expect(wrapper.find('input').prop('value')).toBe('');
    });

    it('Should set correct date when date chosen from calendar', () => {
        const changeFunction = jest.fn();
        const wrapper = mount(
            <Datovelger
                input={{ id: 'abc', name: 'sdf' }}
                id={'1'}
                onChange={changeFunction}
                valgtDato={'2000-01-01'}
            />
        );
        const button = wrapper.find('KalenderKnapp');
        button.simulate('click');
        const day = wrapper.find('Day[empty=false]').at(3);
        day.simulate('click');
        expect(changeFunction.mock.calls.length).toBe(1);
        expect(changeFunction.mock.calls[0][0]).toEqual('2000-01-04');
    });
});

import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../Calendar';

describe('Calendar', () => {
    it('Should be defined', () => {
        expect(shallow(<Calendar onClose={jest.fn()} onSelect={jest.fn()} month={new Date()} />)).toBeDefined();
    });
});

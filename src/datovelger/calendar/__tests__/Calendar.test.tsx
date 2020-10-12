import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../Calendar';

describe('Kalender', () => {
    it('Should be defined', () => {
        expect(
            shallow(<Calendar onClose={jest.fn()} onSelect={jest.fn()} locale={'nb'} month={new Date()} />)
        ).toBeDefined();
    });
});

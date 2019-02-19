import * as React from 'react';
import { shallow } from 'enzyme';
import Kalender from '../Kalender';

describe('Kalender', () => {
	it('Should be defined', () => {
		expect(shallow(<Kalender onLukk={jest.fn()} onVelgDag={jest.fn()} locale={'nb'} måned={new Date()} />)).toBeDefined();
	});
});
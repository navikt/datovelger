import * as React from 'react';
import { shallow } from 'enzyme';

import Datovelger from '../Datovelger';

describe('Datovelger', () => {
	it('Should be defined', () => {
		expect(shallow(<Datovelger input={{ onChange: jest.fn()} as any} id={'1'} onChange={jest.fn()}/>)).toBeDefined();
	});
});

import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Box from './components/box/Box';
import PageIntro from './components/page-intro/PageIntro';
import DatepickerExample from './examples/DatepickerExample';

const Intro: React.FunctionComponent = () => (
    <>
        <PageIntro title="nav-datovelger">
            <h2>Simple datepicker based on react-day-picker</h2>
        </PageIntro>
        <Ingress style={{ marginBottom: '.5rem' }}>Example:</Ingress>
        <Box>
            <DatepickerExample />
        </Box>
    </>
);

export default Intro;

import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import Box from './components/box/Box';
import PageIntro from './components/page-intro/PageIntro';
import DatovelgerEksempel from './eksempler/DatovelgerEksempel';

interface Props {}

const Intro: React.FunctionComponent<Props> = (props) => (
    <>
        <PageIntro title="nav-datovelger">
            <h2>Enkel datovelger basert på react-day-picker</h2>
        </PageIntro>
        <Ingress style={{ marginBottom: '.5rem' }}>Eksempel:</Ingress>
        <Box>
            <DatovelgerEksempel />
        </Box>
    </>
);

export default Intro;

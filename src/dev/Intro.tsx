import React from 'react';
import { Ingress } from 'nav-frontend-typografi';
import PageIntro from './components/page-intro/PageIntro';
import DatovelgerEksempel from './eksempler/DatovelgerEksempel';

interface Props {}

const Intro: React.FunctionComponent<Props> = (props) => (
    <>
        <PageIntro title="@navikt/sif-common-formik">
            <h2>nav-datovelger</h2>
            <Ingress>Enkel datovelger</Ingress>
            <DatovelgerEksempel />
        </PageIntro>
    </>
);

export default Intro;

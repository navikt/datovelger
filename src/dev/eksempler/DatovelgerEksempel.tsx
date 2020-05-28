import React, { useState } from 'react';
import moment from 'moment';
import Knapp from 'nav-frontend-knapper';
import Datovelger from '../../datovelger/Datovelger';
import { Tidsperiode, ISODateString } from '../../datovelger/types';
import Box from '../components/box/Box';

const DatovelgerEksempel: React.FunctionComponent = () => {
    const [dato, setDato] = useState<ISODateString | undefined>('');
    const takenRange: Tidsperiode = {
        fom: '2020-04-10',
        tom: '2020-04-11',
    };

    return (
        <div>
            <Box>
                <label htmlFor="datovelger-input">Velg dato</label>
                <Datovelger
                    valgtDato={dato}
                    onChange={(d) => setDato(d)}
                    id="datovelger"
                    kalender={{ visUkenumre: true }}
                    visÅrVelger={true}
                    locale={'nb'}
                    input={{ name: 'dato', id: 'datovelger-input' }}
                    datoErGyldig={true}
                    avgrensninger={{
                        helgedagerIkkeTillatt: false,
                        ugyldigeTidsperioder: [takenRange],
                        minDato: '2000-04-03',
                        maksDato: '2020-05-15',
                    }}
                />
            </Box>
            <Box margin="l">Valgt dato: {dato}</Box>
            <Box margin="l">
                <Knapp onClick={() => setDato(moment(new Date()).format(moment.HTML5_FMT.DATE))}>
                    Sett dagens dato
                </Knapp>
                <Knapp onClick={() => setDato(undefined)}>Fjern dato</Knapp>{' '}
            </Box>
        </div>
    );
};
export default DatovelgerEksempel;

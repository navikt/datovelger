import React, { useState } from 'react';
import moment from 'moment';
import Knapp from 'nav-frontend-knapper';
import Datovelger from '../../datovelger/Datovelger';
import { Tidsperiode } from '../../datovelger/types';
import { dateToISOFormattedDateString, getDateStringFromValue } from '../../datovelger/utils';
import Box from '../components/box/Box';

interface Props {}

const DatovelgerEksempel: React.FunctionComponent<Props> = (props) => {
    const [dato, setDato] = useState<string | undefined>('');
    const takenRange: Tidsperiode = {
        fom: dateToISOFormattedDateString(
            moment()
                .subtract(1, 'week')
                .toDate()
        )!,
        tom: dateToISOFormattedDateString(
            moment()
                .subtract(1, 'day')
                .toDate()
        )!
    };

    return (
        <div>
            <Box>
                <Datovelger
                    valgtDato={dato}
                    onChange={(d) => setDato(d)}
                    id="datovelger"
                    kalender={{ visUkenumre: true }}
                    visÅrVelger={true}
                    locale={'fr'}
                    input={{ name: 'dato', id: 'ahl' }}
                    avgrensninger={{
                        helgedagerIkkeTillatt: false,
                        ugyldigeTidsperioder: [takenRange]
                    }}
                />
            </Box>
            <Box margin="l">Valgt dato: {dato}</Box>
            <Box margin="l">
                <Knapp onClick={() => setDato(getDateStringFromValue(new Date()))}>Sett dagens dato</Knapp>
            </Box>
            {moment()
                .locale('fr')
                .toLocaleString()}
        </div>
    );
};
export default DatovelgerEksempel;

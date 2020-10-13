import React, { useState } from 'react';
import moment from 'moment';
import Knapp from 'nav-frontend-knapper';
import Datepicker, { DatepickerValue } from '../../datovelger/Datepicker';
import { Tidsperiode } from '../../datovelger/types';
import Box from '../components/box/Box';

const DatovelgerEksempel: React.FunctionComponent = () => {
    const [dato, setDato] = useState<DatepickerValue>('');

    const takenRange: Tidsperiode = {
        fom: '2020-04-10',
        tom: '2020-04-11',
    };

    return (
        <div>
            <Box>
                <label htmlFor="datovelger-input">Velg dato</label>
                <Datepicker
                    inputId="datovelger-input"
                    value={dato}
                    onChange={(d) => {
                        console.log('new date: ', d);
                        setDato(d);
                    }}
                    calendarSettings={{ showWeekNumbers: true }}
                    showYearSelector={true}
                    locale={'nb'}
                    inputProps={{ name: 'dato' }}
                    showInvalidFormattedDate={true}
                    limitations={{
                        weekendsNotSelectable: false,
                        invalidDateRanges: [takenRange],
                        minDate: '2000-04-03',
                        maxDate: '2020-12-12',
                    }}
                />
            </Box>
            <Box margin="l">Valgt dato: {dato}</Box>
            <Box margin="l">
                <Knapp onClick={() => setDato(moment(new Date()).format(moment.HTML5_FMT.DATE))}>
                    Sett dagens dato
                </Knapp>
                <Knapp onClick={() => setDato('')}>Fjern dato</Knapp>{' '}
            </Box>
        </div>
    );
};
export default DatovelgerEksempel;

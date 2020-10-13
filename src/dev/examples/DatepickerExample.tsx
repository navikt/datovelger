import React, { useState } from 'react';
import moment from 'moment';
import Knapp from 'nav-frontend-knapper';
import Datepicker, { DatepickerValue } from '../../datovelger/Datepicker';
import { Tidsperiode } from '../../datovelger/types';
import Box from '../components/box/Box';

const DatepickerExample: React.FunctionComponent = () => {
    const [date, setDate] = useState<DatepickerValue>('');

    const takenRange: Tidsperiode = {
        fom: '2020-04-10',
        tom: '2020-04-11',
    };

    return (
        <div>
            <Box>
                <label htmlFor="datovelger-input">Choose date</label>
                <Datepicker
                    inputId="datovelger-input"
                    value={date}
                    onChange={setDate}
                    calendarSettings={{ showWeekNumbers: true }}
                    showYearSelector={true}
                    locale={'nb'}
                    inputProps={{ name: 'dato' }}
                    showInvalidFormattedDate={false}
                    limitations={{
                        weekendsNotSelectable: false,
                        invalidDateRanges: [takenRange],
                        minDate: '2000-04-03',
                        maxDate: '2020-12-12',
                    }}
                />
            </Box>
            <Box margin="l">Chosen date: {date}</Box>
            <Box margin="l">
                <Knapp onClick={() => setDate(moment(new Date()).format(moment.HTML5_FMT.DATE))}>Choose today</Knapp>-
                <Knapp onClick={() => setDate('')}>Unselect date</Knapp>
            </Box>
        </div>
    );
};
export default DatepickerExample;

import React, { useState } from 'react';
import moment from 'moment';
import Knapp from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import Datovelger, { DatepickerValue } from '../../datovelger/Datovelger';
import { Tidsperiode } from '../../datovelger/types';
import Box from '../components/box/Box';
import { INVALID_DATE_VALUE } from '../../datovelger/utils/dateFormatUtils';

const DatepickerExample: React.FunctionComponent = () => {
    const [date, setDate] = useState<DatepickerValue>('');
    const [showInvalidFormattedDate, setShowInvalidFormattedDate] = useState<boolean>(false);
    const [showYearSelector, setShowYearSelector] = useState<boolean>(false);
    const [showWeekNumbers, setShowWeekNumbers] = useState<boolean>(false);

    const takenRange: Tidsperiode = {
        fom: '2020-04-10',
        tom: '2020-04-11',
    };

    return (
        <div>
            <Box>
                <label htmlFor="datovelger-input">Choose date</label>
                <Datovelger
                    locale={'nb'}
                    inputId="datovelger-input"
                    value={date}
                    onChange={setDate}
                    inputProps={{ name: 'dato', 'aria-invalid': date === INVALID_DATE_VALUE }}
                    calendarSettings={{ showWeekNumbers }}
                    showYearSelector={showYearSelector}
                    showInvalidFormattedDate={showInvalidFormattedDate}
                    limitations={{
                        weekendsNotSelectable: false,
                        invalidDateRanges: [takenRange],
                        minDate: '2000-04-03',
                        maxDate: '2020-12-12',
                    }}
                />
                <Box margin="l">Chosen date: {date}</Box>
                <Box margin="l">
                    <Knapp onClick={() => setDate(moment(new Date()).format(moment.HTML5_FMT.DATE))}>
                        Choose today
                    </Knapp>
                    -<Knapp onClick={() => setDate('')}>Unselect date</Knapp>
                </Box>

                <Box margin="l">
                    <fieldset>
                        <legend>Presentation properties</legend>
                        <div style={{ padding: '1rem' }}>
                            <Box margin="none">
                                <Checkbox
                                    checked={showYearSelector}
                                    onChange={() => setShowYearSelector(!showYearSelector)}
                                    label={
                                        <>
                                            <code>showYearSelector</code>:<br /> Show dropdowns for year and month
                                        </>
                                    }
                                />
                            </Box>
                            <Box margin="l">
                                <Checkbox
                                    checked={showWeekNumbers}
                                    onChange={() => setShowWeekNumbers(!showWeekNumbers)}
                                    label={
                                        <>
                                            <code>calendarSettings.showWeekNumbers</code>
                                            <br />
                                            Toggle visibility on week numbers in calendar view
                                        </>
                                    }
                                />
                            </Box>
                            <Box margin="l">
                                <Checkbox
                                    checked={showInvalidFormattedDate}
                                    onChange={() => setShowInvalidFormattedDate(!showInvalidFormattedDate)}
                                    label={
                                        <>
                                            <code>showInvalidFormattedDate</code>:<br />
                                            Do not clear input field when the entered date is invalid
                                        </>
                                    }
                                />
                            </Box>
                        </div>
                    </fieldset>
                </Box>
            </Box>
        </div>
    );
};
export default DatepickerExample;

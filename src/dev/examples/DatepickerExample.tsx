import React, { useState } from 'react';
import moment from 'moment';
import Knapp from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import Datepicker, { DatepickerValue } from '../../datepicker/Datepicker';
import { DatepickerDateRange } from '../../datepicker/types';
import { isISODateString } from '../../datepicker/types/typeGuards';
import { ISODateStringToUTCDate } from '../../datepicker/utils/dateFormatUtils';
import Box from '../components/box/Box';

const renderDate = (dateString = ''): string => {
    if (dateString === '') {
        return '';
    }
    const date = ISODateStringToUTCDate(dateString);
    return date ? moment(date).format('DD.MM.YYYY') : 'invalid date';
};

const DatepickerExample: React.FunctionComponent = () => {
    const [date, setDate] = useState<DatepickerValue>('');
    const [showYearSelector, setShowYearSelector] = useState<boolean>(false);
    const [showWeekNumbers, setShowWeekNumbers] = useState<boolean>(false);

    const takenRange: DatepickerDateRange = {
        from: '2020-04-10',
        to: '2020-04-11',
    };

    return (
        <div>
            <Box margin="xl">
                <label style={{ display: 'block', marginBottom: '.5rem' }} htmlFor="datovelger-input">
                    Choose date (format dd.mm.yyyy)
                </label>
                <Datepicker
                    locale={'nb'}
                    inputId="datovelger-input"
                    value={date}
                    onChange={setDate}
                    inputProps={{
                        name: 'dateInput',
                        'aria-invalid': date !== '' && isISODateString(date) === false,
                    }}
                    calendarSettings={{ showWeekNumbers }}
                    showYearSelector={showYearSelector}
                    limitations={{
                        weekendsNotSelectable: false,
                        invalidDateRanges: [takenRange],
                        minDate: '2000-04-03',
                        maxDate: '2020-12-12',
                    }}
                />
                <Box margin="l">Chosen date: {renderDate(date)}</Box>
                <Box margin="l">
                    <Knapp onClick={() => setDate(moment(new Date()).format(moment.HTML5_FMT.DATE))}>
                        Choose today
                    </Knapp>
                    -<Knapp onClick={() => setDate('')}>Unselect date</Knapp>-
                    <Knapp onClick={() => setDate('abc')}>Set invalid formatted date</Knapp>
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
                                            <div>
                                                <code>showYearSelector</code>:
                                            </div>{' '}
                                            Show dropdowns for year and month
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
                                            <div>
                                                <code>calendarSettings.showWeekNumbers</code>
                                            </div>
                                            Toggle visibility on week numbers in calendar view
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

# nav-datovelger

Simple datepicker basert på react-day-picker
https://www.npmjs.com/package/react-day-picker

# Use

```javascript
import { Datepicker } from 'nav-datovelger';

const BasicDatepicker = () => {
    const [date, setDate] = useState('');
    return (
        <Datepicker onChange={setDato} value={date} />
    );
};

const AdvancedDatePicker = () => {
    const [date, setDate] = useState<string | INVALID_DATE_TYPE | undefined>('');

    return (
        <Datepicker
            locale={'nb'}
            inputId="datovelger-input"
            value={date}
            onChange={setDate}
            inputProps={{ name: 'dato', 'aria-invalid': date === INVALID_DATE_VALUE }}
            calendarSettings={{ showWeekNumbers }}
            showYearSelector={showYearSelector}
            limitations={{
                weekendsNotSelectable: false,
                invalidDateRanges: [{
                    from: '2020-04-10',
                    to: '2020-04-11',
                }],
                minDate: '2000-04-03',
                maxDate: '2020-12-12',
            }}
        />
    );
}
```

# Kjøre eksempel-app

Starter app med enkelt eksempel

```
npm run dev
```

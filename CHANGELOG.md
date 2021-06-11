# Changelog

## [11.2.0] - 2021-06-11
Add ability to navigate outside restricted range via prop

## [9.0.0] - 2021-01-04
Refactor locale code. Set 'nb' as default locale (was 'en').

## [7.0.0-beta.1] - 2020-12-14
Rewrite and simplification. Props are changed and removed, and the change event will now always send the selected date or value in the input field - disregarding if the value is a valid date string or not. This is no the containing apps responsibility. The onChange event will send an extra prop saying if the date is valid, but this is only as a helping value, and is not reflected within the component.

### Changed
- Refactor most of the code
- Activate `showWeekNumbers` prop (was inactive)
- Change language used in code from norwegian to english (css classNames not changed)
- type `INVALID_DATE` is renamed to `INVALID_DATE_TYPE`
- type `Tidsperiode` is changed to `DatepickerDateRange` with props `from` and `to`
- type `DatovelgerAvgrensninger` is renamed to `DatpickerLimitations`
- type `KalenderPlassering` is renamed to `CalendarPlacement`

#### New `Datovelger` interface:
  ```
  <Datepicker
    inputId?: string; // replaces previous two id's
    value?: string | undefined; // was valgtDato
    onChange: (value: DatepickerValue, isValidISODateString: boolean) => void;  // se comments below
    disabled?: boolean; // unchanged
    limitations?: DatepickerLimitations; // was avgrensninger
    calendarSettings?: { // was kalender
        showWeekNumbers?: boolean; // was visUkenumre
        position?: CalendarPlacement; // was plassering
    };
    inputProps?: DatepickerInputProps & { inputRef?: React.Ref<HTMLInputElement> }; // type is changed
    allowInvalidDateSelection?: boolean; // was kanVelgeUgyldigDato
    showYearSelector?: boolean; // was visÅrVelger
    dayPickerProps?: DayPickerProps; // unchanged

    // removed props:
    datoErGyldig // use inputProps['aria-invalid']
  />

  ```
- **Datepicker changes explained**
  - `inputId` replaces previous two id props
  - `inputProps` is now a limited set of InputHTMLAttributes<HTMLInputElement>.
  - `inputProps.placeholder` defaults to undefined - was "dd.mm.åååå". Either describe the pattern in the label (recomended), or send in the prop.
  - `onChange` is now called with two different values - the string value from the input, and a flag indicating if the value is a valid ISODateString (YYYY-MM-DD).
  - `datoErGyldig`is removed, use `aria-invalid` on `inputProps` instead.
  - The input does not set `aria-invalid` anymore, this must be set from the containing app.


# Changelog



## [7.0.0-beta.1] - 2020-12-14
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
  <Datovelger
    inputId?: string; // replaces previous two id's
    value?: DatepickerValue; // was valgtDato
    onChange: (date: DatepickerValue) => void; // se comments below
    locale?: string; // unchanged
    disabled?: boolean; // unchanged
    limitations?: DatepickerLimitations; // was avgrensninger
    calendarSettings?: { // was kalender
        showWeekNumbers?: boolean; // was visUkenumre
        position?: CalendarPlacement; // was plassering
    };
    inputProps?: DatepickerInputProps & { inputRef?: React.Ref<HTMLInputElement> }; // type is changed
    allowInvalidDateSelection?: boolean; // was kanVelgeUgyldigDato
    showInvalidFormattedDate?: boolean; // new; see comments below
    showYearSelector?: boolean; // was visÅrVelger
    dayPickerProps?: DayPickerProps; // unchanged

    // removed props:
    datoErGyldig // use inputProps['aria-invalid']
  />

  ```
- **Datovelger changes explained**
  - `inputId` replaces previous two id props
  - `inputProps` is now a limited set of InputHTMLAttributes<HTMLInputElement>
  - new prop `showInvalidFormattedDate` which sets the input field to show invalid formatted datestrings. Default value is `false`, so the behaviour is the same as previous versions if not set to `true`
  - `onChange` is now called with three different values if `showInvalidFormattedDate={true}`. The values are Date | "Invalid date" | undefined
  - `datoErGyldig`is removed, use `aria-invalid` on `inputProps` instead

### Removed
- `datoErGyldig` prop on Datevelger; use `aria-invalid` on `inputProps` instead

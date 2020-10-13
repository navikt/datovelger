export const Texts = {
    calendarLabel: 'Kalender',
    navBarNextMonthLabel: 'Neste måned',
    navbarPreviousMonthLabel: 'Forrige måned',
    limitations: {
        validDateRange: (fraDato: string, tilDato: string) => `Dato må være mellom "${fraDato}" og "${tilDato}"`,
        from: (dato: string) => `Fra ${dato}`,
        to: (dato: string) => `Til ${dato}`,
        weekendsNotSelectable: 'Lørdager og søndager er ikke valgbare',
    },
};

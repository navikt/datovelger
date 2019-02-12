"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tekster = {
  kalenderLabel: 'Kalender',
  navbar_nesteManed_label: 'Neste måned',
  navbar_forrigeManed_label: 'Forrige måned',
  avgrensninger: {
    måVæreMellom: function (fraDato, tilDato) {
      return "Dato m\u00E5 v\u00E6re mellom \"" + fraDato + "\" og \"" + tilDato + "\"";
    },
    fra: function (dato) {
      return "Fra " + dato;
    },
    til: function (dato) {
      return "Til " + dato;
    },
    helg: 'Lørdager og søndager er ikke valgbare'
  }
};
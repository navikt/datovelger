"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var moment = require("moment");

var _1 = require(".");

exports.getFokusertDato = function (kalender) {
  if (kalender) {
    if (document.activeElement.classList.contains('DayPicker-Day')) {
      var dagElement = document.activeElement.childNodes.item(0);

      if (dagElement) {
        var attr = dagElement.attributes.getNamedItem('data-date');

        if (attr) {
          return moment(attr.value, 'DD.MM.YYYY').toDate();
        }
      }
    }
  }

  return undefined;
};

exports.getSammeDatoIMåned = function (dato, måned, nesteMåned) {
  return moment(dato).add(_1.getMånedDiff(nesteMåned, måned), 'months').toDate();
};

exports.fokuserPåDato = function (kalender, dato) {
  if (kalender) {
    var el = kalender.querySelector("[data-date=\"" + _1.dagDatoNøkkel(dato) + "\"]");

    if (el) {
      el.parentNode.focus();
    }
  }
};

var getMånedFokusDomElement = function (kalender, fokusElement) {
  switch (fokusElement) {
    case 'forrige':
    case 'neste':
      return kalender.querySelector(".nav-datovelger__navbar__knapp--" + fokusElement);

    case 'aar':
      return kalender.querySelector("select[name=year]");

    case 'mnd':
      return kalender.querySelector("select[name=month]");
  }
};

exports.fokuserPåMåned = function (kalender, fokusElement) {
  if (kalender) {
    var el = getMånedFokusDomElement(kalender, fokusElement);

    if (el) {
      el.focus();
    }
  }
};

exports.fokuserKalender = function (kalender) {
  if (kalender) {
    var selectedDay = kalender.querySelector('.DayPicker-Day--selected');
    var availableDay = kalender.querySelector('.DayPicker-Day[aria-disabled=false],.DayPicker-Day--today');

    if (selectedDay) {
      selectedDay.focus();
    } else if (availableDay) {
      availableDay.focus();
    } else {
      kalender.focus();
    }
  }
};
(this["webpackJsonpnav-datovelger"]=this["webpackJsonpnav-datovelger"]||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(26),i=n.n(o),l=n(43),s=n.n(l),c=(n(65),n(3)),u=n(19);var d=function(e){return r.a.createElement("svg",Object.assign({className:"prefix__navLogo",width:90,viewBox:"0 0 269 169"},e),r.a.createElement("g",{fill:"none",fillRule:"evenodd"},r.a.createElement("path",{fill:"#C30000",d:"M125.31 168.942c-46.642 0-84.46-37.817-84.46-84.465C40.85 37.824 78.667 0 125.31 0c46.657 0 84.48 37.824 84.48 84.477 0 46.648-37.823 84.465-84.48 84.465zM0 121.359l17.265-42.73h16.589l-17.243 42.73zm213.044 0l17.044-42.73h9.044l-17.043 42.73zM246.564 121.359l17.04-42.73h4.803l-17.043 42.731z"}),r.a.createElement("path",{fill:"#FEFEFE",d:"M197.36 78.63h-15.016s-1.035 0-1.4.914l-8.31 25.439-8.304-25.44c-.366-.913-1.407-.913-1.407-.913h-28.872c-.625 0-1.149.522-1.149 1.143v8.639c0-6.853-7.292-9.782-11.562-9.782-9.562 0-15.963 6.298-17.956 15.873-.108-6.352-.636-8.628-2.347-10.96-.786-1.141-1.922-2.101-3.159-2.895-2.547-1.492-4.834-2.018-9.749-2.018h-5.77s-1.044 0-1.412.914l-5.25 13.013V79.773c0-.621-.52-1.143-1.145-1.143H61.198s-1.03 0-1.406.914l-5.459 13.53s-.545 1.354.701 1.354h5.133v25.784c0 .64.504 1.147 1.147 1.147h13.238c.624 0 1.144-.507 1.144-1.147V94.428h5.16c2.961 0 3.588.08 4.74.618.694.262 1.32.792 1.66 1.403.698 1.314.873 2.892.873 7.545v16.218c0 .64.514 1.147 1.15 1.147h12.687s1.434 0 2.001-1.416l2.812-6.95c3.74 5.237 9.893 8.366 17.541 8.366h1.671s1.443 0 2.014-1.416l4.897-12.128v12.397c0 .64.524 1.147 1.15 1.147h12.951s1.43 0 2.003-1.416c0 0 5.18-12.861 5.2-12.958h.008c.2-1.07-1.153-1.07-1.153-1.07h-4.623V83.847l14.545 36.096c.568 1.416 2 1.416 2 1.416h15.301s1.44 0 2.008-1.416l16.125-39.93c.558-1.383-1.057-1.383-1.057-1.383zm-64.458 27.285h-8.7c-3.463 0-6.28-2.804-6.28-6.271 0-3.461 2.817-6.283 6.28-6.283h2.433c3.454 0 6.267 2.822 6.267 6.283v6.27z"})))},h=n(15),m=(n(78),n(20)),v=n(12),p=n.n(v),g=function e(t){return{block:t,element:function(e,n){return"".concat(t,"__").concat(e).concat(n?" ".concat(t,"__").concat(e,"--").concat(n):"")},modifier:function(e){return"".concat(t,"--").concat(e)},modifierConditional:function(e,n){return!0===n&&void 0!==e?"".concat(t,"--").concat(e):void 0},child:function(n){return e(e(t).element(n))},classNames:p.a}},f=(n(79),g("box")),b=function(e){var t,n=e.margin,a=e.padBottom,o=e.className,i=e.textAlignCenter,l=e.children,s=f.classNames(f.block,f.modifierConditional(n,void 0!==n),f.modifierConditional("bottom-".concat(a),void 0!==a),(t={},Object(m.a)(t,f.modifier("textAlignCenter"),i),Object(m.a)(t,"".concat(o),void 0!==o),t));return r.a.createElement("div",{className:s},l)},k=function(e){var t=e.title,n=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(b,{margin:"m"},r.a.createElement(b,null,r.a.createElement(c.Undertittel,null,t)),n&&r.a.createElement(b,{padBottom:"xl"},r.a.createElement(c.Ingress,{tag:"div"},n))))},D=n(48),y=n(1),E=n.n(y),O=n(18),M=n.n(O),C=n(28),j=n(21),_=n(6),T=n(7),F=n(9),Y=n(8),w=n(2),K=n(10);var L=function(e){function t(e){var n;return Object(_.a)(this,t),(n=Object(F.a)(this,Object(Y.a)(t).call(this,e))).domElement=null,n.ignoreDocumentClick=!1,n.handleBlur=n.handleBlur.bind(Object(w.a)(n)),n.startEventListening=n.startEventListening.bind(Object(w.a)(n)),n.stopEventListening=n.stopEventListening.bind(Object(w.a)(n)),n.handleDocumentKeyDown=n.handleDocumentKeyDown.bind(Object(w.a)(n)),n.handleInternalDocumentKeyDown=n.handleInternalDocumentKeyDown.bind(Object(w.a)(n)),e.active&&n.startEventListening(),n}return Object(K.a)(t,e),Object(T.a)(t,[{key:"componentWillReceiveProps",value:function(e){!this.props.active&&e.active?this.startEventListening():this.stopEventListening()}},{key:"componentWillUnmount",value:function(){this.stopEventListening()}},{key:"handleBlur",value:function(e){var t=this,n=this.domElement;n&&setTimeout((function(){var e,a,r=window.document.activeElement;(r?(e=n)===(a=r)||e.contains(a):void 0)||t.blur("blur")}),0)}},{key:"blur",value:function(e){this.props.onBlur&&this.props.onBlur({source:e})}},{key:"handleDocumentKeyDown",value:function(e){27===e.keyCode&&this.blur("esc")}},{key:"handleInternalDocumentKeyDown",value:function(e){this.props.onKeyDown&&this.props.onKeyDown(e)}},{key:"startEventListening",value:function(){window.addEventListener("keydown",this.handleDocumentKeyDown)}},{key:"stopEventListening",value:function(){window.removeEventListener("keydown",this.handleDocumentKeyDown)}},{key:"render",value:function(){var e=this,t=this.props,n=(t.active,t.onBlur,t.children,Object(j.a)(t,["active","onBlur","children"]));return r.a.createElement("div",Object.assign({ref:function(t){return e.domElement=t}},n,{onBlur:this.handleBlur,onKeyDown:this.handleInternalDocumentKeyDown,tabIndex:this.props.tabIndex}),this.props.children)}}]),t}(r.a.Component),N=n(29),S=function(e){var t=E()(e,E.a.HTML5_FMT.DATE,!0);return t.isValid()?t.format("DD.MM.YYYY"):e},P=function(e){return e?E.a.utc(e).format("YYYY-MM-DD"):void 0},B=function(e){return E()(e).format("DD.MM.YYYY")},A=function(e,t){return E()(e).startOf("month").diff(E()(t).startOf("month"),"months")},V=function(e){var t=[];e.ugyldigeTidsperioder&&(t=e.ugyldigeTidsperioder.map((function(e){return{from:E()(e.fom,E.a.HTML5_FMT.DATE).toDate(),to:E()(e.tom,E.a.HTML5_FMT.DATE).toDate()}})));var n=e.minDato,a=e.maksDato,r={daysOfWeek:e.helgedagerIkkeTillatt?[0,6]:[]};return[].concat(Object(N.a)(t),Object(N.a)(a?[{after:E()(a,E.a.HTML5_FMT.DATE).toDate()}]:[]),Object(N.a)(n?[{before:E()(n,E.a.HTML5_FMT.DATE).toDate()}]:[]),[r])},I=function(e,t,n){var a=E.a.utc(e,E.a.HTML5_FMT.DATE,!0);if(e&&a.isValid())return a.toDate();if(n&&n.initialMonth)return n.initialMonth;var r=E()().toDate();return t&&t.minDato&&E()(t.minDato).isAfter(r)?E()(t.minDato,E.a.HTML5_FMT.DATE).toDate():r},x=function(e,t){var n=E()(e,E.a.HTML5_FMT.DATE,!0);return void 0===t?n.isValid():n.isValid()&&H(n,t)},H=function(e,t){return t.minDato?e.isSameOrAfter(E()(t.minDato,E.a.HTML5_FMT.DATE),"day"):t.maksDato?e.isSameOrBefore(E()(t.maksDato,E.a.HTML5_FMT.DATE),"day"):t.helgedagerIkkeTillatt?e.isoWeekday()<=5:!t.ugyldigeTidsperioder||!U(e,t.ugyldigeTidsperioder)},U=function(e,t){return t.some((function(t){var n=E()(t.fom,E.a.HTML5_FMT.DATE),a=E()(t.tom,E.a.HTML5_FMT.DATE);return e.isBetween(n,a,"day","[]")}))},W=function(e){function t(e){var n;return Object(_.a)(this,t),(n=Object(F.a)(this,Object(Y.a)(t).call(this,e))).input=null,n.focus=n.focus.bind(Object(w.a)(n)),n.onChange=n.onChange.bind(Object(w.a)(n)),n.onKeyDown=n.onKeyDown.bind(Object(w.a)(n)),n.triggerDateChange=n.triggerDateChange.bind(Object(w.a)(n)),n.state={value:e.valgtDato?S(e.valgtDato):""},n}return Object(K.a)(t,e),Object(T.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.valgtDato&&this.updateAfterDateChange(e.valgtDato)}},{key:"updateAfterDateChange",value:function(e){this.props.valgtDato!==e&&x(e)?this.setState({value:S(e)}):""===e&&this.setState({value:""})}},{key:"triggerDateChange",value:function(){if(""!==this.state.value){var e=function(e){var t=E.a.utc(e,"DD.MM.YYYY",!0);return t.isValid()?t.format(E.a.HTML5_FMT.DATE):t.toString()}(this.state.value);e!==this.props.valgtDato&&this.props.onDateChange(e)}else this.props.onDateChange(void 0)}},{key:"onKeyDown",value:function(e){"Enter"===e.key&&(e.preventDefault(),this.triggerDateChange())}},{key:"focus",value:function(){this.input&&this.input.focus()}},{key:"onChange",value:function(e){var t=e.target.value;this.props.onInputChange&&this.props.onInputChange(t,e),this.setState({value:t})}},{key:"render",value:function(){var e=this,t=this.props,n=t.inputProps,a=t.disabled;return r.a.createElement("input",Object.assign({},n,{className:p()("nav-datovelger__input",{"nav-datovelger__input--datePickerTarget":this.props.isDatePickerTarget}),disabled:a,autoComplete:"off",autoCorrect:"off",pattern:"\\d{2}.\\d{2}.\\d{4}",type:"text",inputMode:"numeric",ref:function(t){return e.input=t},value:this.state.value||"",maxLength:10,onChange:this.onChange,onBlur:this.triggerDateChange,onKeyDown:this.onKeyDown}))}}]),t}(r.a.Component),z="Kalender",q="Neste m\xe5ned",G="Forrige m\xe5ned",R=function(e){return r.a.createElement("svg",Object.assign({height:16,width:16,viewBox:"0 0 18 18"},e,{role:"presentation","aria-hidden":"true"}),r.a.createElement("title",null,"Kalenderikon"),r.a.createElement("g",{stroke:"#0067C5",fill:"none",fillRule:"evenodd"},r.a.createElement("path",{d:"M4 2.667H1.333v14h15.334v-14H14"}),r.a.createElement("path",{d:"M4 1.333h2V4H4zm8 0h2V4h-2zM6 2h6M1.333 6h15.334"})))},J=function(e){function t(){var e,n;Object(_.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(F.a)(this,(e=Object(Y.a)(t)).call.apply(e,[this].concat(r)))).button=null,n}return Object(K.a)(t,e),Object(T.a)(t,[{key:"focus",value:function(){this.button&&this.button.focus()}},{key:"render",value:function(){var e=this,t=this.props,n=t.onClick,a=t.er\u00c5pen,o=t.disabled;return r.a.createElement("button",{ref:function(t){return e.button=t},type:"button",className:"nav-datovelger__kalenderknapp",onClick:function(e){e.preventDefault(),n()},disabled:o,"aria-label":z,"aria-expanded":a},r.a.createElement(R,null))}}]),t}(r.a.Component),Q=function(e){function t(){return Object(_.a)(this,t),Object(F.a)(this,Object(Y.a)(t).apply(this,arguments))}return Object(K.a)(t,e),Object(T.a)(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.plassering;return r.a.createElement("div",{className:p()("nav-datovelger__kalenderPortal","nav-datovelger__kalenderPortal--".concat(n))},r.a.createElement("div",{className:"nav-datovelger__kalenderPortal__content"},t))}}]),t}(r.a.Component),X=n(44),Z=n.n(X),$=n(45),ee=n.n($);var te={formatDay:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return E()(e).locale(t).format("DD.MM.YYYY, dddd")},formatMonthTitle:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return E()(e).locale(t).format("MMMM YYYY")},formatWeekdayLong:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return E()().locale(t).localeData().weekdays()[e]},formatWeekdayShort:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"en";return E()().locale(t).localeData().weekdays()[e].substr(0,3)},getMonths:function(e){for(var t=[],n=0;n<12;)t.push(E()().locale(e).month(n).format("MMMM")),n+=1;return t},getFirstDayOfWeek:function(e){return E()().locale(e).localeData().firstDayOfWeek()},formatDate:function(e){return"TODO"},parseDate:function(e){return E()(e).toDate()}},ne=function(e){var t=function(e){switch(e){case"venstre":return"rotate(180deg)";case"opp":return"rotate(270deg)";case"ned":return"rotate(90deg)";default:return}}(e.retning),n=t?{transform:t}:void 0;return r.a.createElement("svg",{style:n,width:16,height:16,viewBox:"0 0 16 24",role:"presentation","aria-hidden":"true"},r.a.createElement("title",null,"Chevron"),r.a.createElement("path",{d:"M1.5 24a1 1 0 0 1-.646-1.764L12.953 12 .853 1.764A1 1 0 1 1 2.146.236l13 11a1.005 1.005 0 0 1 0 1.528l-13 11a1.003 1.003 0 0 1-.645.236",fill:"#3e3832",fillRule:"evenodd"}))},ae=n(27),re=function(e){function t(e){var n;return Object(_.a)(this,t),(n=Object(F.a)(this,Object(Y.a)(t).call(this,e))).yearSelect=null,n.monthSelect=null,n.onChange=n.onChange.bind(Object(w.a)(n)),n.onYearChange=n.onYearChange.bind(Object(w.a)(n)),n.getYear=n.getYear.bind(Object(w.a)(n)),n.getMonth=n.getMonth.bind(Object(w.a)(n)),n}return Object(K.a)(t,e),Object(T.a)(t,[{key:"getYear",value:function(){return this.yearSelect?parseInt(this.yearSelect.value,10):(this.props.min||this.props.max||new Date).getFullYear()}},{key:"getMonth",value:function(){return this.monthSelect?parseInt(this.monthSelect.value,10):(this.props.min||this.props.max||new Date).getMonth()}},{key:"onChange",value:function(e){this.props.onChange(new Date(this.getYear(),this.getMonth()),"mnd")}},{key:"onYearChange",value:function(e){var t,n,a=parseInt((null===(t=this.yearSelect)||void 0===t?void 0:t.value)||"",10),r=parseInt((null===(n=this.monthSelect)||void 0===n?void 0:n.value)||"",10),o=new Date(a,r);this.props.min&&E()(o).isBefore(this.props.min)?this.props.onChange(this.props.min,"aar"):this.props.max&&E()(o).isAfter(this.props.max)?this.props.onChange(this.props.max,"aar"):this.props.onChange(o,"aar")}},{key:"render",value:function(){for(var e=this,t=this.props,n=t.defaultMonth,a=t.min,o=void 0===a?new Date(1900,0,1):a,i=t.max,l=void 0===i?E()().add(4,"years").toDate():i,s=t.localeUtils,c=t.locale,u=function(e,t,n,a){for(var r=[],o=n&&t.getFullYear()===n.getFullYear()?n.getMonth():0,i=a&&t.getFullYear()===a.getFullYear()?a.getMonth():11,l=o;l<=i;)r.push({value:l,label:e[l]}),l++;return r}(s.getMonths(c),n,o,l),d=[],h=Math.min(n.getFullYear(),o.getFullYear()),m=Math.max(n.getFullYear(),l.getFullYear()),v=h;v<=m;v+=1)d.push(v);var p=Object(ae.guid)(),g=Object(ae.guid)(),f=d.length>1;return r.a.createElement("div",{className:"nav-datovelger__yearSelector"},f&&r.a.createElement("div",{className:"selectContainer"},r.a.createElement("label",{className:"sr-only",htmlFor:g},"Velg \xe5r"),r.a.createElement("select",{id:g,ref:function(t){return e.yearSelect=t},className:"skjemaelement__input skjemaelement__input--year",name:"year",onChange:this.onYearChange,value:n.getFullYear()},d.map((function(e){return r.a.createElement("option",{key:e,value:e},e)})))),r.a.createElement("div",{className:"selectContainer".concat(!1===f?" selectContainer--monthOnly":"")},r.a.createElement("label",{className:"sr-only",htmlFor:p},"Velg m\xe5ned"),r.a.createElement("select",{id:p,ref:function(t){return e.monthSelect=t},className:"skjemaelement__input",name:"month",onChange:this.onChange,value:n.getMonth()},u.map((function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.label)})))))}}]),t}(r.a.Component),oe=function(e){function t(){return Object(_.a)(this,t),Object(F.a)(this,Object(Y.a)(t).apply(this,arguments))}return Object(K.a)(t,e),Object(T.a)(t,[{key:"render",value:function(){var e=this.props,t=e.m\u00e5ned,n=e.retning,a=e.disabled,o=e.onClick,i="forrige"===n?G:q;return r.a.createElement("button",{id:"kalender-navbarknapp-".concat(n),className:p()("nav-datovelger__navbar__knapp","nav-datovelger__navbar__knapp--".concat(n),{"nav-datovelger__navbar__knapp--disabled":a}),onClick:function(e){return a?null:o(e,t,n)},"aria-label":i,"aria-disabled":a},r.a.createElement(ne,{retning:"forrige"===n?"venstre":"h\xf8yre"}))}}]),t}(r.a.Component),ie=function(e){return e.localeUtils.formatMonthTitle(e.defaultM\u00e5ned,e.locale)},le=function(e){function t(){return Object(_.a)(this,t),Object(F.a)(this,Object(Y.a)(t).apply(this,arguments))}return Object(K.a)(t,e),Object(T.a)(t,[{key:"shouldComponentUpdate",value:function(e){return ie(e)!==ie(this.props)}},{key:"render",value:function(){var e=this.props,t=e.defaultM\u00e5ned,n=e.byttM\u00e5ned,a=e.min,o=e.maks,i=e.vis\u00c5rVelger,l=e.locale,s=e.localeUtils,c=E()(t).add(-1,"months"),u=E()(t).add(1,"months"),d=!!a&&E()(a).isAfter(c.endOf("month")),h=!!o&&E()(o).isBefore(u.startOf("month")),m=function(e,t,a){e.preventDefault(),e.stopPropagation(),n(t,a)};return r.a.createElement("div",{className:"DayPicker-Caption"},r.a.createElement("span",{"aria-live":"assertive",className:i?"sr-only":""},ie(this.props)),i&&r.a.createElement("div",{className:"nav-datovelger__navbar__yearSelector"},r.a.createElement(re,{defaultMonth:t,max:o,min:a,locale:l,localeUtils:s,onChange:function(e,t){return n(e,t)}})),r.a.createElement("div",{role:"navigation",className:"nav-datovelger__navbar ".concat(i?"nav-datovelger__navbar--withYearSelector":"")},r.a.createElement(oe,{"m\xe5ned":c.toDate(),retning:"forrige",disabled:d,onClick:function(e,t){return m(e,t,"forrige")}}),r.a.createElement(oe,{"m\xe5ned":u.toDate(),retning:"neste",disabled:h,onClick:function(e,t){return m(e,t,"neste")}})))}}]),t}(r.a.Component),se=function(e){function t(e){var n;return Object(_.a)(this,t),(n=Object(F.a)(this,Object(Y.a)(t).call(this,e))).kalender=null,n.nesteFokusertDato=void 0,n.setFokusP\u00e5Input=void 0,n.m\u00e5nedFokusElement=void 0,n.settFokus=n.settFokus.bind(Object(w.a)(n)),n.onByttDag=n.onByttDag.bind(Object(w.a)(n)),n.onByttM\u00e5ned=n.onByttM\u00e5ned.bind(Object(w.a)(n)),n.state={"m\xe5ned":e.m\u00e5ned},n}return Object(K.a)(t,e),Object(T.a)(t,[{key:"componentDidUpdate",value:function(e,t){t.m\u00e5ned!==this.state.m\u00e5ned&&this.kalender&&this.nesteFokusertDato?(!function(e,t){if(e){var n=e.querySelector('[data-date="'.concat(B(t),'"]'));n&&n.parentNode.focus()}}(this.kalender,this.nesteFokusertDato),this.nesteFokusertDato=void 0):t.m\u00e5ned!==this.state.m\u00e5ned&&this.kalender&&this.m\u00e5nedFokusElement&&(!function(e,t){if(e){var n=function(e,t){var n;if(e)switch(t){case"forrige":case"neste":n=e.querySelector(".nav-datovelger__navbar__knapp--".concat(t));break;case"aar":n=e.querySelector("select[name=year]");break;case"mnd":n=e.querySelector("select[name=month]")}if(n&&null!==n)return n}(e,t);n&&n.focus()}}(this.kalender,this.m\u00e5nedFokusElement),this.m\u00e5nedFokusElement=void 0)}},{key:"settFokus",value:function(){this.kalender&&function(e){if(e){var t=e.querySelector(".DayPicker-Day--selected"),n=e.querySelector(".DayPicker-Day[aria-disabled=false],.DayPicker-Day--today");t?t.focus():n?n.focus():e.focus()}}(this.kalender)}},{key:"onByttDag",value:function(e,t){!this.props.kanVelgeUgyldigDato&&t.disabled||this.props.onVelgDag(E.a.utc(e).format("YYYY-MM-DD"))}},{key:"onByttM\xe5ned",value:function(e,t){var n=function(e){var t=document.activeElement;if(e&&t&&t.classList.contains("DayPicker-Day")){var n=t.childNodes.item(0);if(n){var a=n.attributes.getNamedItem("data-date");if(a)return E()(a.value,"DD.MM.YYYY").toDate()}}}(this.kalender);this.nesteFokusertDato=n?function(e,t,n){return E()(e).add(A(n,t),"months").toDate()}(n,this.state.m\u00e5ned,e):void 0,this.m\u00e5nedFokusElement=t,this.setState({"m\xe5ned":e})}},{key:"render",value:function(){var e=this,t=this.props,n=t.dato,a=t.min,o=t.maks,i=t.locale,l=t.visUkenumre,s=t.utilgjengeligeDager,c=t.vis\u00c5rVelger,u=t.dayPickerProps,d=this.state.m\u00e5ned,h=Object(C.a)({},te,{},this.props.localeUtils),m={locale:i,localeUtils:h,navbarElement:function(e){return r.a.createElement("span",null)},captionElement:function(t){return r.a.createElement(le,{"defaultM\xe5ned":d,"byttM\xe5ned":function(t,n){return e.onByttM\u00e5ned(t,n)},min:a?E.a.utc(a,E.a.HTML5_FMT.DATE,!0).toDate():void 0,maks:o?E.a.utc(o,E.a.HTML5_FMT.DATE,!0).toDate():void 0,locale:i,localeUtils:h,"vis\xc5rVelger":c})},firstDayOfWeek:1,showWeekNumbers:l};return r.a.createElement("div",{ref:function(t){return e.kalender=t},role:"dialog","aria-label":"Kalender",className:"nav-datovelger__kalender"},r.a.createElement(Z.a,{active:!0,focusTrapOptions:{clickOutsideDeactivates:!0,onDeactivate:this.props.onLukk}},r.a.createElement(ee.a,Object.assign({locale:i,localeUtils:h,fromMonth:a?E()(a,E.a.HTML5_FMT.DATE,!0).toDate():void 0,toMonth:o?E()(o,E.a.HTML5_FMT.DATE,!0).toDate():void 0,month:d,canChangeMonth:!1,selectedDays:n?E()(n,E.a.HTML5_FMT.DATE,!0).toDate():void 0,onDayClick:this.onByttDag,onMonthChange:this.onByttM\u00e5ned,disabledDays:s},m,u))))}}]),t}(r.a.Component),ce=function(e){function t(e){var n;return Object(_.a)(this,t),(n=Object(F.a)(this,Object(Y.a)(t).call(this,e))).input=null,n.setFokusP\u00e5KalenderKnapp=void 0,n.kalender=null,n.kalenderKnapp=null,n.onKalenderChange=n.onKalenderChange.bind(Object(w.a)(n)),n.onDatoinputChange=n.onDatoinputChange.bind(Object(w.a)(n)),n.toggleKalender=n.toggleKalender.bind(Object(w.a)(n)),n.lukkKalender=n.lukkKalender.bind(Object(w.a)(n)),n.onDatoInputOnChange=n.onDatoInputOnChange.bind(Object(w.a)(n)),n.state={"m\xe5ned":I(e.valgtDato,e.avgrensninger,e.dayPickerProps),erDatoGyldig:x(e.valgtDato),"er\xc5pen":!1,inputValue:" "},n}return Object(K.a)(t,e),Object(T.a)(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({erDatoGyldig:x(e.valgtDato,e.avgrensninger),"m\xe5ned":I(e.valgtDato,e.avgrensninger,e.dayPickerProps)})}},{key:"onKalenderChange",value:function(e,t){var n=this;this.setState({"er\xc5pen":!1,erDatoGyldig:x(e,this.props.avgrensninger)},(function(){n.props.onChange(e),t&&n.lukkKalender(!0)}))}},{key:"onDatoinputChange",value:function(e){var t=this;this.setState({"er\xc5pen":!1,erDatoGyldig:x(e,this.props.avgrensninger)},(function(){t.props.onChange(e)}))}},{key:"onDatoInputOnChange",value:function(e,t){var n=this.props,a=n.avgrensninger,r=n.input,o=t.target.value;this.setState({"er\xc5pen":!1,erDatoGyldig:x(o,a),inputValue:o}),r&&r.onChange&&r.onChange(e,t)}},{key:"toggleKalender",value:function(){this.setFokusP\u00e5KalenderKnapp=!0,this.setState({"er\xc5pen":!this.state.er\u00c5pen})}},{key:"lukkKalender",value:function(e){this.setState({"er\xc5pen":!1}),this.setFokusP\u00e5KalenderKnapp=e}},{key:"componentDidUpdate",value:function(e,t){!t.er\u00c5pen&&this.state.er\u00c5pen&&this.kalender?this.kalender.settFokus():t.er\u00c5pen&&!this.state.er\u00c5pen&&this.setFokusP\u00e5KalenderKnapp&&this.kalenderKnapp&&(this.setFokusP\u00e5KalenderKnapp=!1,this.kalenderKnapp.focus())}},{key:"render",value:function(){var e=this,t=this.props,n=t.valgtDato,a=t.input,o=t.kalender,i=t.avgrensninger,l=t.locale,s=void 0===l?"nb":l,c=t.disabled,u=t.vis\u00c5rVelger,d=t.kanVelgeUgyldigDato,h=void 0!==d&&d,m=Object(j.a)(t,["valgtDato","input","kalender","avgrensninger","locale","disabled","vis\xc5rVelger","kanVelgeUgyldigDato"]),v=this.state,g=v.er\u00c5pen,f=v.erDatoGyldig,b=(a.onChange,a.ariaDescribedby),k=a.ariaLabel,D=Object(j.a)(a,["onChange","ariaDescribedby","ariaLabel"]),y=Object(C.a)({name:a&&a.name?a.name:"".concat(this.props.id,"__input"),"aria-invalid":f,"aria-label":k,"aria-describedby":b},D);return r.a.createElement(L,null,r.a.createElement("div",{className:p()("nav-datovelger")},r.a.createElement("div",{className:"nav-datovelger__inputContainer"},r.a.createElement(W,{inputProps:y,ref:function(t){return e.input=t},valgtDato:n||"",onDateChange:this.onDatoinputChange,onInputChange:this.onDatoInputOnChange,disabled:c}),r.a.createElement(J,{disabled:c,ref:function(t){return e.kalenderKnapp=t},onClick:this.toggleKalender,"er\xc5pen":g||!1})),g&&r.a.createElement(Q,{plassering:o&&o.plassering},r.a.createElement(se,Object.assign({ref:function(t){return e.kalender=t}},m,{locale:s,dato:n,"m\xe5ned":this.state.m\u00e5ned,min:i&&i.minDato,maks:i&&i.maksDato,utilgjengeligeDager:i?V(i):void 0,onVelgDag:function(t){return e.onKalenderChange(t,!0)},onLukk:function(){return e.lukkKalender(!0)},kanVelgeUgyldigDato:h,dayPickerProps:this.props.dayPickerProps,"vis\xc5rVelger":u})))))}}]),t}(r.a.Component),ue=function(e){var t=Object(a.useState)(""),n=Object(D.a)(t,2),o=n[0],i=n[1],l={fom:P(E()().subtract(1,"week").toDate()),tom:P(E()().subtract(1,"day").toDate())};return r.a.createElement("div",null,r.a.createElement(b,null,r.a.createElement(ce,{valgtDato:o,onChange:function(e){return i(e)},id:"datovelger",kalender:{visUkenumre:!0},"vis\xc5rVelger":!0,input:{name:"dato",id:"ahl"},avgrensninger:{helgedagerIkkeTillatt:!1,ugyldigeTidsperioder:[l]}})),r.a.createElement(b,{margin:"l"},"Valgt dato: ",o),r.a.createElement(b,{margin:"l"},r.a.createElement(M.a,{onClick:function(){return i(function(e){var t;return e&&"string"===typeof e?E()(e,E.a.ISO_8601,!0).isValid()&&(t=E()(e).toDate()):"object"===typeof e&&(t=e),t?P(t):void 0}(new Date))}},"Sett dagens dato")))},de=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(k,{title:"nav-datovelger"},r.a.createElement("h2",null,"Enkel datovelger basert p\xe5 react-day-picker")),r.a.createElement(c.Ingress,{style:{marginBottom:".5rem"}},"Eksempel:"),r.a.createElement(b,null,r.a.createElement(ue,null)))},he=[{path:"frontpage",title:"Forside",renderContent:function(){return r.a.createElement(de,null)}}],me=function(e,t){return t.indexOf(e)>=0},ve=g("lenke"),pe=function(){var e=Object(h.d)().location.pathname;return r.a.createElement("div",{className:"leftMenu"},he.map((function(t){return r.a.createElement(u.b,{key:t.path,to:t.path,className:ve.classNames(ve.block,ve.modifierConditional("active",me(t.path,e)))},t.title)})))},ge=function(e){var t=function(e){return he.find((function(t){return me(t.path,e)}))}(Object(h.d)().location.pathname);return r.a.createElement(r.a.Fragment,null,r.a.createElement("aside",{className:"asideContent"},r.a.createElement(pe,null)),r.a.createElement("article",{style:{maxWidth:"1000px"},className:"mainContent"},t?t.renderContent():r.a.createElement(de,null)))},fe=(n(99),function(){return r.a.createElement("main",{className:"devPage"},r.a.createElement("header",{className:"header"},r.a.createElement("span",{className:"navLogo"},r.a.createElement(d,null)),r.a.createElement("span",{className:"header__title"},r.a.createElement(c.Systemtittel,null,"nav-datovelger"))),r.a.createElement("div",{className:"contentWrapper"},r.a.createElement(u.a,null,r.a.createElement(ge,null))))}),be=(n(100),function(){return r.a.createElement(c.Normaltekst,{tag:"div"},r.a.createElement(fe,null))});s.a.setAppElement("#root"),i.a.render(r.a.createElement(be,null),document.getElementById("root"))},49:function(e,t,n){e.exports=n(101)},79:function(e,t,n){},99:function(e,t,n){}},[[49,1,2]]]);
//# sourceMappingURL=main.ffb2f53b.chunk.js.map
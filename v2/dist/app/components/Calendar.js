"use strict";
/**
 * @module Calendar.js
 * @author Chris Davies <https://github.com/chrisdavies>
 * @remarks кое-что правил wlr986 <wayloggerman@gmail.com>
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateRangePicker = void 0;
// import { firstDateIsSelect, secondDateIsSelect, firstDate, secondDate, isDateShouldBeDisabled, datePreview, hideCal, setFirstDate, dropFirstDate, setSecondDate, dropSecondDate } from './handlers'
// import { dataFromServer } from './state/dataFromServer'
var jquery_1 = __importDefault(require("jquery"));
var bidPreview_1 = require("./bidPreview");
var dateRangePicker = 0;
var myState;
var num = 0;
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.DateRangePicker = {});
}(this, function (t) {
    "use strict";
    function o() {
        var t = new Date;
        return t.setHours(0, 0, 0, 0), t;
    }
    function h(t, e) {
        return (t && t.toDateString()) === (e && e.toDateString());
    }
    function v(t, e, n) {
        var a = (t = new Date(t)).getDate(), o = t.getMonth() + e;
        return t.setDate(1), t.setMonth(n ? (12 + o) % 12 : o), t.setDate(a), t.getDate() < a && t.setDate(0), t;
    }
    function i(t, e) {
        return (t = new Date(t)).setFullYear(t.getFullYear() + e), t;
    }
    function r(n) {
        return function (t) {
            return e = "string" == typeof t ? n(t) : t, (e = new Date(e)).setHours(0, 0, 0, 0), e;
            var e;
        };
    }
    function l(t, e, n) {
        return t < e ? e : n < t ? n : t;
    }
    function f(t, e) {
        var n = void 0;
        return function () {
            clearTimeout(n), n = setTimeout(e, t);
        };
    }
    function p() { }
    function g() {
        for (var t = arguments, e = t[0], n = 1; n < t.length; ++n) {
            var a = t[n] || {};
            for (var o in a)
                e[o] = a[o];
        }
        return e;
    }
    var s = {
        days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        today: "Сегодня",
        clear: "Очистить",
        close: "Закрыть"
    };
    function u(t) {
        t = t || {};
        var n, a, e = r((t = g({
            lang: s,
            mode: "dp-modal",
            hilightedDate: o(),
            format: function (t) {
                return t.getMonth() + 1 + "/" + t.getDate() + "/" + t.getFullYear();
            },
            parse: function (t) {
                var e = new Date(t);
                return isNaN(e) ? o() : e;
            },
            dateClass: function () { },
            inRange: function () {
                return !0;
            }
        }, t)).parse);
        return t.lang = g(s, t.lang), t.parse = e, t.inRange = (a = (n = t).inRange, function (t, e) {
            return a(t, e) && n.min <= t && n.max >= t;
        }), t.min = e(t.min || i(o(), -100)), t.max = e(t.max || i(o(), 100)), t.hilightedDate = t.parse(t.hilightedDate), t;
    }
    var m = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        enter: 13,
        esc: 27
    };
    function D(t, e, n) {
        return e.addEventListener(t, n, !0),
            function () {
                e.removeEventListener(t, n, !0);
            };
    }
    var y = function () {
        var t = window.CustomEvent;
        "function" != typeof t && ((t = function (t, e) {
            e = e || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), n;
        }).prototype = window.Event.prototype);
        return t;
    }();
    var b = {
        day: {
            onKeyDown: function (t, e) {
                var n = t.keyCode, a = n === m.left ? -1 : n === m.right ? 1 : n === m.up ? -7 : n === m.down ? 7 : 0;
                n === m.esc ? e.close() : a && (t.preventDefault(), e.setState({
                    hilightedDate: (o = e.state.hilightedDate, r = a, (o = new Date(o)).setDate(o.getDate() + r), o)
                }));
                var o, r;
            },
            onClick: {
                "dp-day": function (t, e) {
                    var dt = new Date(parseInt(t.target.getAttribute("data-date")));
                    if (myState.isFirstDateOfRangeWasSelect()) {
                        var days = jquery_1.default(".dp-day").toArray();
                        days = days.filter(function (item) { return jquery_1.default(item).hasClass('dr-in-range'); });
                        var bad = '';
                        days.forEach(function (item) {
                            var d = jquery_1.default(item).hasClass('dp-day-disabled');
                            if (d)
                                bad = true;
                        });
                        if (bad)
                            return;
                    }
                    ;
                    e.setState({
                        selectedDate: dt,
                    });
                    /**
                     * @author wlr986
                    */
                    if (myState.isFirstDateOfRangeWasSelect() && myState.isSecondDateOfRangeWasSelect()) {
                        myState.dropFirstDateOfRange();
                        myState.dropSecondDateOfRange();
                    }
                    if (myState.isFirstDateOfRangeWasSelect()) {
                        jquery_1.default('#dp-close-btn').html('Сохранить');
                        myState.setSecondDateOfRange(dt);
                        return;
                    }
                    myState.setFirstDateOfRange(dt);
                },
                "dp-next": function (t, e) {
                    var n = e.state.hilightedDate;
                    e.setState({
                        hilightedDate: v(n, 1)
                    });
                    t.stopPropagation();
                },
                "dp-prev": function (t, e) {
                    var n = e.state.hilightedDate;
                    e.setState({
                        hilightedDate: v(n, -1)
                    });
                    t.stopPropagation();
                },
                "dp-today": function (t, e) {
                    e.setState({
                        selectedDate: o()
                    });
                },
                "dp-clear": function (t, e) {
                    myState.dropFirstDateOfRange();
                    myState.dropSecondDateOfRange();
                    bidPreview_1.bidPreview(myState);
                    // dataFromServer.clickedCars = [];
                    e.setState({
                        selectedDate: null
                    });
                    t.stopPropagation();
                },
                "dp-close": function (t, e) {
                    e.close();
                },
                "dp-cal-month": function (t, e) {
                    e.setState({
                        view: "month"
                    });
                    t.stopPropagation();
                },
                "dp-cal-year": function (t, e) {
                    e.setState({
                        view: "year"
                    });
                    t.stopPropagation();
                }
            },
            render: function (r) {
                var i = r.opts, t = i.lang, e = r.state, n = t.days, a = i.dayOffset || 1, s = e.selectedDate, u = e.hilightedDate, d = u.getMonth(), c = o().getTime();
                var weekStr = "\n\t\t\t\t" + n.map(function (t, e) {
                    return "<span class=\"dp-col-header\"> " + n[(e + a) % n.length] + " </span>";
                }).join("") + "\n\t\t\t\t\t";
                var header = "\n\t\t\t\t\t<div class=\"dp-cal\"> \n\t\t\t\t\t<header class=\"dp-cal-header\"> \n\t\t\t\t\t\t<button tabindex=\"-1\" type=\"button\" class=\"dp-prev\">Prev</button> \n\t\t\t\t\t\t<button tabindex=\"-1\" type=\"button\" class=\"dp-cal-month\" id=\"dp-cal-month-text\">\n\t\t\t\t\t" + t.months[d] + " </button>\n\t\t\t\t\t\t<button tabindex=\"-1\" type=\"button\" class=\"dp-cal-year\">\n\t\t\t\t\t " + u.getFullYear() + " \n\t\t\t\t\t</button>\n\t\t\t\t\t\t<button tabindex=\"-1\" type=\"button\" class=\"dp-next\">Next</button>\n\t\t\t\t\t\t</header>\n\t\t\t\t\t\t<div class=\"dp-days\">\n\t\t\t\t\t";
                var select = '';
                var closeOrSaveName = myState.isFirstDateOfRangeWasSelect() && myState.isSecondDateOfRangeWasSelect() ? "Сохранить" : "Закрыть";
                var footer = "\n\t\t\t\t</div>\n\t\t\t\t<footer class=\"dp-cal-footer\">\n\t\t\t\t\n\t\t\t\t<button tabindex=\"-1\" type=\"button\" class=\"dp-clear\">  " + t.clear + " </button>\n\t\t\t\t</script>\n\t\t\t\t<button onClick=\"\n\t\t\t\tdocument.querySelector('.ex-inputs-picker').classList.remove('ex-inputs-picker-visible');\" tabindex=\"-1\" type=\"button\" class=\"dp-close\" id=\"dp-close-btn\">" + closeOrSaveName + "</button>\n\n\t\t\t\t</footer>\n\t\t\t\t</div>";
                function resHTML(timestamp, e, n) {
                    var res = "";
                    var newDate = new Date(timestamp);
                    newDate.setDate(1);
                    newDate.setDate(1 - newDate.getDay() + e);
                    e && newDate.getDate() === e + 1 && newDate.setDate(e - 6);
                    for (var r = 0; r < 42; ++r) {
                        var r_1 = n(newDate);
                        res += r_1;
                        newDate.setDate(newDate.getDate() + 1);
                    }
                    return res;
                }
                /**
                 * @function
                 * @param {Date}
                 * @returns {HTMLButtonElement}
                 * @description смысл функции в том, что она принимает timestamp и возвращает разметку HTML кнопки с необходимыми стилями: пограничный день(pg-edge-day), текущий день (dp-day-today),
                 * неактивный день (dp-day-disabled), а также текущий и выбранный день (dp-current, dp-select)
                */
                function dayHTML(t) {
                    var currentMonth = d;
                    // e === true if currenthMonth не равен t.Month(). Смысл переменной в том, что она используется для установления класса пограничного дня
                    var onBorder = t.getMonth() !== currentMonth; //Boolean
                    // var n = !i.inRange(t);//Boolean 
                    var shouldToDisabled = myState.isDateBusy(t);
                    var attr = shouldToDisabled ? 'disabled' : '';
                    // Если а установлено, то дата помечается как сегодняшнее число
                    var isToday = shouldToDisabled ? false : t.getTime() === c; //Boolean
                    //итоговая разметка кнопки
                    var res = "dp-day"; //String
                    var isCurrent = false; //shouldToDisabled ? false : (t.getTime() === c) && (d === new Date().getMonth() + 1)
                    var isSelected = false; //shouldToDisabled ? false : h(t, s);
                    res += onBorder ? " dp-edge-day" : "";
                    res += isCurrent ? " dp-current" : "";
                    res += isSelected ? " dp-selected" : "";
                    res += shouldToDisabled ? " dp-day-disabled" : "";
                    res += isToday ? " dp-day-today" : "";
                    return "\n\t\t\t\t\t<button " + attr + " tabindex=\"-1\" type=\"button\" class=\"" + (res += " " + i.dateClass(t, r)) + "\" data-date=\" " + t.getTime() + " \" id=\"day-" + t.getDate() + " \"> " + t.getDate() + " </button>\n\t\t\t\t\t";
                }
                var body = resHTML(u, a, dayHTML);
                return header + select + weekStr + body + footer;
            }
        },
        year: {
            render: function (t) {
                var e = t.state, n = e.hilightedDate.getFullYear(), a = e.selectedDate.getFullYear();
                return '<div class="dp-years">' + function (t, e) {
                    for (var n = "", a = t.opts.max.getFullYear(); a >= t.opts.min.getFullYear(); --a)
                        n += e(a);
                    return n;
                }(t, function (t) {
                    var e = "dp-year";
                    return e += t === n ? " dp-current" : "", '<button tabindex="-1" type="button" class="' + (e += t === a ? " dp-selected" : "") + '" data-year="' + t + '">' + t + "</button>";
                }) + "</div>";
            },
            onKeyDown: function (t, e) {
                var n = t.keyCode, a = e.opts, o = n === m.left || n === m.up ? 1 : n === m.right || n === m.down ? -1 : 0;
                if (n === m.esc)
                    e.setState({
                        view: "day"
                    });
                else if (o) {
                    t.preventDefault();
                    var r = i(e.state.hilightedDate, o);
                    e.setState({
                        hilightedDate: l(r, a.min, a.max)
                    });
                }
            },
            onClick: {
                "dp-year": function (t, e) {
                    e.setState({
                        hilightedDate: (n = e.state.hilightedDate, a = parseInt(t.target.getAttribute("data-year")), (n = new Date(n)).setFullYear(a), n),
                        view: "day"
                    });
                    var n, a;
                    t.stopPropagation();
                }
            }
        },
        month: {
            onKeyDown: function (t, e) {
                var n = t.keyCode, a = n === m.left ? -1 : n === m.right ? 1 : n === m.up ? -3 : n === m.down ? 3 : 0;
                n === m.esc ? e.setState({
                    view: "day"
                }) : a && (t.preventDefault(), e.setState({
                    hilightedDate: v(e.state.hilightedDate, a, !0)
                }));
            },
            onClick: {
                "dp-month": function (t, e) {
                    e.setState({
                        hilightedDate: (n = e.state.hilightedDate, a = parseInt(t.target.getAttribute("data-month")), v(n, a - n.getMonth())),
                        view: "day"
                    });
                    var n, a;
                    t.stopPropagation();
                }
            },
            render: function (t) {
                var e = t.opts.lang.months, a = t.state.hilightedDate.getMonth();
                return '<div class="dp-months">' + e.map(function (t, e) {
                    var n = "dp-month";
                    return '<button tabindex="-1" type="button" class="' + (n += a === e ? " dp-current" : "") + '" data-month="' + e + '">' + t + "</button>";
                }).join("") + "</div>";
            }
        }
    };
    function d(o, r, a) {
        var t, i, e, n, s, u, d = !1, c = {
            el: void 0,
            opts: a,
            shouldFocusOnBlur: !0,
            shouldFocusOnRender: !0,
            state: {
                get selectedDate() {
                    return i;
                },
                set selectedDate(t) {
                    /**update input here !!!  */
                    t && !a.inRange(t) || (t ? (i = new Date(t), c.state.hilightedDate = i) : i = t, c.updateInput(i), r("select"), c.close());
                },
                view: "day"
            },
            adjustPosition: p,
            containerHTML: '<div class="dp"></div>',
            attachToDom: function () {
                document.body.appendChild(c.el);
            },
            updateInput: function (t) {
                var e = new y("change", {
                    bubbles: !0
                });
                e.simulated = !0, o.value = t ? a.format(t) : "", o.dispatchEvent(e);
            },
            computeSelectedDate: function () {
                return a.parse(o.value);
            },
            currentView: function () {
                return b[c.state.view];
            },
            open: function () {
                var t, e, n;
                d || (c.el || (c.el = (t = a, e = c.containerHTML, (n = document.createElement("div")).className = t.mode, n.innerHTML = e, n), function (a) {
                    var t = a.el, e = t.querySelector(".dp");
                    function n(n) {
                        n.target.className.split(" ").forEach(function (t) {
                            var e = a.currentView().onClick[t];
                            e && e(n, a);
                        });
                    }
                    t.ontouchstart = p, D("blur", e, f(150, function () {
                        a.hasFocus() || a.close(!0);
                    })), D("keydown", t, function (t) {
                        t.keyCode === m.enter ? n(t) : a.currentView().onKeyDown(t, a);
                    }), D("mousedown", e, function (t) {
                        t.target.focus && t.target.focus(), document.activeElement !== t.target && (t.preventDefault(), w(a));
                    }), D("click", t, n);
                }(c)), i = l(c.computeSelectedDate(), a.min, a.max), c.state.hilightedDate = i || a.hilightedDate, c.state.view = "day", c.attachToDom(), c.render(), r("open"));
            },
            isVisible: function () {
                return !!c.el && !!c.el.parentNode;
            },
            hasFocus: function () {
                var t = document.activeElement;
                return c.el && c.el.contains(t) && t.className.indexOf("dp-focuser") < 0;
            },
            shouldHide: function () {
                return c.isVisible();
            },
            close: function (t) {
                var e = c.el;
                if (c.isVisible()) {
                    if (e) {
                        var n = e.parentNode;
                        n && n.removeChild(e);
                    }
                    var a;
                    d = !0, t && c.shouldFocusOnBlur && ((a = o).focus(), /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && a.blur()), setTimeout(function () {
                        d = !1;
                    }, 100), r("close");
                }
            },
            destroy: function () {
                c.close(), t();
            },
            render: function () {
                if (c.el) {
                    var t = c.hasFocus(), e = c.currentView().render(c);
                    e && (c.el.firstChild.innerHTML = e), c.adjustPosition(), (t || c.shouldFocusOnRender) && w(c);
                }
            },
            setState: function (t) {
                for (var e in t) {
                    c.state[e] = t[e];
                }
                r("statechange"), c.render();
            }
        };
        return e = o, n = c, s = f(5, function () {
            n.shouldHide() ? n.close() : n.open();
        }), u = [D("blur", e, f(150, function () {
                n.hasFocus() || n.close(!0);
            })), D("mousedown", e, function () {
                e === document.activeElement && s();
            }), D("focus", e, s), D("input", e, function (t) {
                var e = n.opts.parse(t.target.value);
                isNaN(e) || n.setState({
                    hilightedDate: e
                });
            })], t = function () {
            u.forEach(function (t) {
                t();
            });
        }, c;
    }
    function w(t) {
        var e = t.el.querySelector(".dp-current");
        return e && e.focus();
    }
    function c(S, t, e) {
        var x = d(S, t, e);
        return x.shouldFocusOnBlur = !1, Object.defineProperty(x, "shouldFocusOnRender", {
            get: function () {
                return S !== document.activeElement;
            }
        }), x.adjustPosition = function () {
            var t, e, n, a, o, r, i, s, u, d, c, l, f, p, h, v, g, m, D, y, b, w;
            c = x, l = S.getBoundingClientRect(), f = window, t = l, e = f, n = c.el, a = e.pageYOffset, o = a + t.top, r = n.offsetHeight, i = o + t.height + 8, u = 0 < (s = o - r - 8) && i + r > a + e.innerHeight, d = u ? s : i, n.classList && (n.classList.toggle("dp-is-above", u), n.classList.toggle("dp-is-below", !u)), n.style.top = d + "px", p = l, h = f, v = c.el, g = h.pageXOffset, m = p.left + g, D = h.innerWidth + g, y = v.offsetWidth, b = D - y, w = D < m + y && 0 < b ? b : m, v.style.left = w + "px", c.el.style.visibility = "";
        }, x;
    }
    function S(t, e, n) {
        return t = t && t.tagName ? t : document.querySelector(t), "dp-modal" === n.mode ? (o = d(a = t, e, n), a.readonly = !0, o.containerHTML += '<a href="#" class="dp-focuser">.</a>', o) : "dp-below" === n.mode ? c(t, e, n) : "dp-permanent" === n.mode ? ((s = d(r = t, e, i = n)).close = p, s.destroy = p, s.updateInput = p, s.shouldFocusOnRender = i.shouldFocusOnRender, s.computeSelectedDate = function () {
            return i.hilightedDate;
        }, s.attachToDom = function () {
            r.appendChild(s.el);
        }, s.open(), s) : void 0;
        var a, o, r, i, s;
    }
    function x() {
        var a = {};
        function n(t, e) {
            (a[t] = a[t] || []).push(e);
        }
        return {
            on: function (t, e) {
                return e ? n(t, e) : function (t) {
                    for (var e in t)
                        n(e, t[e]);
                }(t), this;
            },
            emit: function (e, n) {
                (a[e] || []).forEach(function (t) {
                    t(e, n);
                });
            },
            off: function (t, e) {
                return t ? a[t] = e ? (a[t] || []).filter(function (t) {
                    return t !== e;
                }) : [] : a = {}, this;
            }
        };
    }
    function F(t, e) {
        var n = x(), a = S(t, function (t) {
            n.emit(t, o);
        }, u(e)), o = {
            get state() {
                return a.state;
            },
            on: n.on,
            off: n.off,
            setState: a.setState,
            open: a.open,
            close: a.close,
            destroy: a.destroy
        };
        return o;
    }
    var e = F;
    function C(t) {
        return 12 * t.getYear() + t.getMonth();
    }
    t.TinyDatePicker = e, dateRangePicker = t.DateRangePicker = function (t, e, mstate) {
        myState = mstate;
        e = e || {};
        var o, n = x(), a = (c = t, "string" == typeof c && (c = document.querySelector(c)), c.innerHTML = '<div class="dr-cals"><div class="dr-cal-start"></div><div class="dr-cal-end"></div></div>', c.querySelector(".dr-cals")), r = {
            start: void 0,
            end: void 0
        }, i = F(a.querySelector(".dr-cal-start"), g({}, e.startOpts, {
            mode: "dp-permanent",
            dateClass: p
        })), s = F(a.querySelector(".dr-cal-end"), g({}, e.endOpts, {
            mode: "dp-permanent",
            hilightedDate: v(i.state.hilightedDate, 1),
            dateClass: p
        })), u = {
            statechange: function (t, e) {
                var n, a = i.state.hilightedDate, o = s.state.hilightedDate;
                1 != (n = a, C(o) - C(n)) && (e === i ? s.setState({
                    hilightedDate: v(e.state.hilightedDate, 1)
                }) : i.setState({
                    hilightedDate: v(e.state.hilightedDate, -1)
                }));
            },
            select: function (t, e) {
                var n = e.state.selectedDate;
                !r.start || r.end ? l({
                    start: n,
                    end: void 0
                }) : l({
                    start: n > r.start ? r.start : n,
                    end: n > r.start ? n : r.start
                });
            }
        }, d = {
            state: r,
            setState: l,
            on: n.on,
            off: n.off
        };
        var c;
        function l(t) {
            for (var e in t)
                r[e] = t[e];
            n.emit("statechange", d), f();
        }
        function f() {
            i.setState({}), s.setState({});
        }
        function p(t) {
            var e, n, a;
            return ((r.end || o) && r.start && (e = t, n = r.end || o, a = r.start, e < a && n <= e || e <= n && a < e) ? "dr-in-range " : "") + (h(t, r.start) || h(t, r.end) ? "dr-selected " : "");
        }
        a.addEventListener("click", function (t) {
            if (t.target.classList.contains("dp-day")) {
                // var e = new Date(parseInt(t.target.dataset.date));
                f();
                t.stopPropagation();
                // h(e, o) && (o = e, f())
            }
        });
        a.addEventListener("touchstart", function (t) {
            if (t.target.classList.contains("dp-day")) {
                // var e = new Date(parseInt(t.target.dataset.date));
                f();
                t.stopPropagation();
                // h(e, o) && (o = e, f())
            }
        });
        return i.on(u), s.on(u), /iPhone|iPad|iPod/i.test(navigator.userAgent) || a.addEventListener("mouseover", function (t) {
            if (t.target.classList.contains("dp-day")) {
                // var e = new Date(parseInt(t.target.dataset.date));
                // !h(e, o) && (o = e, f())
            }
        }),
            d;
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    });
});
exports.DateRangePicker = dateRangePicker;

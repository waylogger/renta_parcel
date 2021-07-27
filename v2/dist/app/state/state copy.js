"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingState = exports.State = void 0;
/**
 * @module state.ts
*/
var date_fns_1 = require("date-fns");
require("regenerator-runtime/runtime");
var querySender_1 = require("../CORS/querySender");
var sharedActions_1 = require("../shared/sharedActions");
var eachMinuteOfInterval_1 = __importDefault(require("date-fns/eachMinuteOfInterval"));
var lodash_1 = __importDefault(require("lodash"));
function numberOfEl(el, arr) {
    var n = arr.filter(function (d) { return d === el; }).length;
    return n;
}
var State = /** @class */ (function () {
    function State() {
        this.places = { result_code: 0, places: [] };
        this.cars = { result_code: 0, cars: [] };
        this.selectedCar = [];
        this.selectedPeriods = [];
        this.customersPhone = '';
        this.customersName = '';
        this.carPeriods = []; //free periods
        this.busyCarPeriods = [];
        this.fullbusyDates = [];
        this.busyTimestamps = [];
    }
    /**
     * @description сервер принимет дату в виде "2021-11-01 10:00Z", поэтому timestamp требуется постоянно переводить в этот формат, для чего служит эта функция
    */
    State.prototype.reformatDate = function (dt) {
        return dt.toLocaleDateString().split('.').reverse().join('-') + " " + dt.toLocaleTimeString() + "Z";
    };
    State.prototype.splitPeriodBorder = function (start, direction) {
        var hours = start.getHours();
        var mins = start.getMinutes();
        if (hours === 0 && mins === 0) {
            return []; //если время 00:00 то это не пограничный элемент
        }
        if (direction === 'forward') {
            var nextDay = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, 0, 0, 0);
            return eachMinuteOfInterval_1.default({ start: start, end: nextDay }, { step: 15 });
        }
        else if (direction === 'backward') {
            var startOfDay = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
            return eachMinuteOfInterval_1.default({ start: startOfDay, end: start }, { step: 15 });
        }
        throw new Error("State::splitPeriodBorder: unexpected dirrection!");
    };
    State.prototype.splitPeriodBody = function (start, end) {
        var roundStart = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, 0, 0); //мы берем следующий день как начало тела периода, потому что дробные части мы учли в startborder
        var roundEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0); //мы берем начало дня как конец тела периода, потому что дробные части мы учли в endBorder
        // console.log({ roundStart, roundEnd });
        return date_fns_1.eachDayOfInterval({ start: roundStart, end: roundEnd }, { step: 1 });
    };
    State.prototype.fillBusy = function () {
        var _this = this;
        this.busyCarPeriods.forEach(function (carAndPeriod) {
            carAndPeriod.car_periods.forEach(function (period) {
                var startBorder = _this.splitPeriodBorder(new Date(period.begin), 'forward');
                var endBorder = _this.splitPeriodBorder(new Date(period.end), 'backward');
                _this.busyTimestamps = __spreadArray(__spreadArray(__spreadArray([], _this.busyTimestamps), startBorder), endBorder);
                var periodBody = _this.splitPeriodBody(new Date(period.begin), new Date(period.end));
                _this.fullbusyDates = __spreadArray(__spreadArray([], _this.fullbusyDates), periodBody);
            });
        });
        var group = Object.values(lodash_1.default.groupBy(this.busyTimestamps)).filter(function (it) { return it.length === _this.selectedCar.length; });
        this.busyTimestamps.splice(0, this.busyTimestamps.length);
        group.forEach(function (it) {
            _this.busyTimestamps = __spreadArray(__spreadArray([], _this.busyTimestamps), it);
        });
        this.busyTimestamps = lodash_1.default.uniq(this.busyTimestamps);
        var dtGroup = Object.values(lodash_1.default.groupBy(this.fullbusyDates)).filter(function (it) { return it.length === _this.selectedCar.length; });
        this.fullbusyDates.splice(0, this.fullbusyDates.length);
        dtGroup.forEach(function (it) {
            _this.fullbusyDates = __spreadArray(__spreadArray([], _this.fullbusyDates), it);
        });
        this.fullbusyDates = lodash_1.default.uniq(this.fullbusyDates);
    };
    State.prototype.fetchPeriods = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [];
                        this.selectedCar.forEach(function (car) { return __awaiter(_this, void 0, void 0, function () {
                            var begDate, endDate, req, periods;
                            return __generator(this, function (_a) {
                                begDate = new Date(new Date().getFullYear(), 0, 1);
                                endDate = new Date(new Date().getFullYear() + 1, 0, 1);
                                req = {
                                    car_id: car.car_id,
                                    begin: this.reformatDate(begDate),
                                    end: this.reformatDate(endDate),
                                    include_idles: true,
                                    include_reserves: true,
                                };
                                periods = querySender_1.getCarPeriodList(req);
                                promises.push(periods);
                                return [2 /*return*/];
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        res = _a.sent();
                        res.forEach(function (period, inx) {
                            var splitPeriods = [];
                            period.car_periods.forEach(function (period) {
                                //убираем завершающий символ Z, чтобы избежать несвоевременного перевода в UTC
                                period.begin = period.begin.toString().slice(0, period.begin.toString().length - 1);
                                period.end = period.end.toString().slice(0, period.end.toString().length - 1);
                                splitPeriods.push(new Date(period.begin));
                                splitPeriods.push(new Date(period.end));
                            });
                            //убираем первый begin и последний end, для того, чтобы получить периоды занятости авто, а не свободы
                            splitPeriods.splice(0, 1);
                            splitPeriods.splice(splitPeriods.length - 1, 1);
                            var busyPeriods = new Array(splitPeriods.length / 2);
                            for (var i = 0; i < splitPeriods.length; i += 2) {
                                busyPeriods.push({
                                    begin: splitPeriods[i],
                                    end: splitPeriods[i + 1],
                                });
                            }
                            _this.busyCarPeriods.push(__assign(__assign({}, _this.selectedCar[inx]), { car_periods: busyPeriods }));
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    State.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var places, _a, carName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, querySender_1.getPlaceList()];
                    case 1:
                        places = _b.sent();
                        places.places.splice(0, 3); //смысл убрать первые 3 элемента в том, что об этот попросил заказчик
                        this.places = places;
                        _a = this;
                        return [4 /*yield*/, querySender_1.getCarList()];
                    case 2:
                        _a.cars = _b.sent();
                        console.log(this.cars);
                        carName = location.hash.replace('#', '');
                        return [4 /*yield*/, this.selectCar(carName)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    State.prototype.getPlaces = function () {
        var places = this.places;
        return { result_code: places.result_code, places: places.places };
    };
    State.prototype.savePhone = function (num) {
        this.customersPhone = num;
    };
    State.prototype.getPhone = function () {
        return new String(this.customersPhone).toString();
    };
    State.prototype.saveName = function (name) {
        this.customersName = name;
    };
    State.prototype.getName = function () {
        return new String(this.customersName).toString();
    };
    State.prototype.getCars = function () {
        var res = this.cars;
        return { result_code: res.result_code, cars: res.cars };
    };
    State.prototype.selectCar = function (carStr) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        res = this.cars.cars.filter(function (car) {
                            return sharedActions_1.formatCarModel(car.model).trim().replace(/\s/g, '_').toLowerCase() === carStr;
                        });
                        this.busyCarPeriods.splice(0, this.busyCarPeriods.length);
                        this.fullbusyDates.splice(0, this.fullbusyDates.length);
                        this.busyTimestamps.splice(0, this.busyTimestamps.length);
                        this.selectedCar = res;
                        return [4 /*yield*/, this.fetchPeriods()];
                    case 1:
                        _a.sent();
                        this.fillBusy();
                        return [2 /*return*/];
                }
            });
        });
    };
    State.prototype.getSelectedCars = function () {
        return this.selectedCar.map(function (item) {
            return { car_id: item.car_id, model: item.model, year: item.year };
        });
    };
    State.prototype.isDateBusy = function (dt) {
        // if ( isPast(dt) ) return true;
        if (this.fullbusyDates.find(function (d) { return date_fns_1.isSameDay(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0), d); })) {
            return true;
        }
        return false;
    };
    return State;
}());
exports.State = State;
var BookingState = function () { return (new State()).init(); };
exports.BookingState = BookingState;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BussinesDay = void 0;
//BussinesDay.ts
/**
 * @module BussinesDay.ts
 * @descriptionx смысл модуля в том, чтобы предоставить внешней логике класс для управления одним днем года
 * @author wlr986 <wayloggerman@gmail.com>
*/
var BussinesTimeSlot_1 = require("./BussinesTimeSlot");
var date_fns_1 = require("date-fns");
/**
 * @remark класс дня, он включает в себя 96 отрезков по 15 минут и методы для обеспечания работы каждого из отрезков, а также пречень машин, которые заняты в этот день
 * ```
 * 	const instance = new BussinesDay(new Date(Date.now()));
 * ```
*/
var BussinesDay = /** @class */ (function () {
    /**
     * @description смысл действий по инициализации нового объекта сводятся к тому, чтобы обнулить timestamp, а потом разбить день на отрезки по 15 минут, после чего сформировать вокруг каждого отрезка объект BussinesTimeSlot
    */
    function BussinesDay(timestamp) {
        var _this = this;
        /**
         * @description массив содержит 96 отрезков по 15 минут
        */
        this.timeslotsOfDay = [];
        this.carsIncludedInDay = [];
        this.timestamp = this.roundTime(timestamp);
        var slots = date_fns_1.eachMinuteOfInterval({ start: this.timestamp, end: date_fns_1.addHours(this.timestamp, 24) }, { step: 15 });
        slots.forEach(function (slot) { return _this.timeslotsOfDay.push(new BussinesTimeSlot_1.BussinesTimeSlot(slot)); });
    }
    /**
     * @param timestamp текущего дня
     * @returns тот же timestamp, но временем равным 00:00:00
     * ```
     * 	const time: Date = new Date(2021,07,11,15,30);
     * 	console.log(roundTime(time).toLocaleString());
     * 	//expect 07.11.2021, 00:00:00
     * ```
    */
    BussinesDay.prototype.roundTime = function (timestamp) {
        return new Date(timestamp.getFullYear(), timestamp.getMonth(), timestamp.getDate(), 0, 0, 0);
    };
    /**
     * @description принимает timestamp и выбрасывает исключение в случае неправильного времени (до текущей даты или после, либо время не кратно 15 минутам)
    */
    BussinesDay.prototype.checkTimestamp = function (timestamp) {
        if (timestamp.getMinutes() % 15 != 0)
            throw new Error('BussinesDay::bookingCar()  receive timestamp not multiple of 15');
        if (date_fns_1.isAfter(timestamp, date_fns_1.addHours(new Date(this.timestamp), 24)))
            throw new Error('BussinesDay::bookingCar() receive timestamp after booking day');
        if (date_fns_1.isBefore(timestamp, this.timestamp))
            throw new Error('BussinesDay::bookingCar() receive timestamp before booking day');
    };
    /**
     * @description возращаем сохраненный timestamp (округленный)
     * ```
     * 	const day = new BussinesDay(new Date(2021,07,11,15,30,55));
     * 	console.log(day.getTimestamp().toLocaleString());
     * 	//expect 07.11.2021, 00:00:00
     * ```
    */
    BussinesDay.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    /**
     * @descriptrion ищем слот по timestamp
    */
    BussinesDay.prototype.getTimeSlot = function (timestamp) {
        this.checkTimestamp(timestamp);
        return this.timeslotsOfDay.find(function (item) {
            return date_fns_1.isEqual(item.getTimestamp(), timestamp);
        });
    };
    /**
     * @param car - авто для установления брони
     * @param timestamp - время для бронирования
     * @returns true в случае успешного установленя брони
     * @description side-effect при успехе авто сохраняется в carIncludedInDay
    */
    BussinesDay.prototype.bookingCar = function (car, timestamp) {
        var _this = this;
        this.checkTimestamp(timestamp);
        /**
         * теперь мы знаем, что полученная дата кратная 15 минутам и находится в границах текущего дня
        */
        var res = false;
        this.timeslotsOfDay.forEach(function (item) {
            if (date_fns_1.isEqual(item.getTimestamp(), timestamp)) {
                item.bookingCar(car);
                res = true;
                _this.carsIncludedInDay.push(car);
            }
        });
        return res;
    };
    /**
     * @param car - проверяем есть ли бронь на эту машину в этот день
     * @returns true если авто найдено
    */
    BussinesDay.prototype.carIsBusy = function (car) {
        return this.carsIncludedInDay.findIndex(function (item) { return car === car; }) >= 0 ? true : false;
    };
    return BussinesDay;
}());
exports.BussinesDay = BussinesDay;

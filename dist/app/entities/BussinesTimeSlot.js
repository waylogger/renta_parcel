"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BussinesTimeSlot = void 0;
/**
 * @public
 * @remarks  класс содержит операции и данные для одной временной ячейки внутри временной линии
*/
var BussinesTimeSlot = /** @class */ (function () {
    //----------------------------------------------------------------------
    function BussinesTimeSlot(timestamp) {
        this.timestamp = timestamp;
        this.carsInBook = [];
    }
    /**
     *@remarks функция возвращает штамп времени текущего слота
    */
    BussinesTimeSlot.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    /**
     * @remarks функция возвращает массив машин, забранированных в этом слоте
    */
    BussinesTimeSlot.prototype.getCarInBook = function () {
        return this.carsInBook;
    };
    /**
     * @remarks функция помещает авто в список забронированных
    */
    BussinesTimeSlot.prototype.bookingCar = function (car) {
        if (this.carsInBook.push(car))
            return true;
        return false;
    };
    /**
     * @remark функция извлекает авто из списка забронированных
    */
    BussinesTimeSlot.prototype.releaseCar = function (car) {
        var carInx = this.carsInBook.findIndex(function (item) {
            return item.car_id === car.car_id;
        });
        if (carInx < 0)
            return false;
        return this.carsInBook.splice(carInx).length > 0 ? true : false;
    };
    return BussinesTimeSlot;
}());
exports.BussinesTimeSlot = BussinesTimeSlot;

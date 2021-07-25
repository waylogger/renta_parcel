"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BussinesYear = void 0;
/**
 * @description ключевой класс для работы формы бронирования, его основной смысл получить из базы данных сведения о машинах и свободных периодов, а затем создать массив дней, где каждому занятому timeSlost будет задан списоок машин, занятых в это время
 *
 * Также этот класс должен давать возможность получить полный список  забронированных timestamp, так и отфильтрованный список по car_id
 *
 * Кроме того, класс должен давать возможность осуществлять бронирование авто
*/
var BussinesYear = /** @class */ (function () {
    /**
     * @param firstDay параметр определяющий точку отсчета внутри года и до его конца с округлением времени. То есть конструкция вида:
     * ```
     * 	new BussinesYear(new Date(2021,06,21,15,30,55));
     * ```
     * приводит к формированию периода с 21.06.2021 00:00:00 до 01.01.2022 00:00:00
     * */
    function BussinesYear(firstDay) {
        this.bussinesDays = [];
        this.BookingPeriods = [];
        this.FreePeriods = [];
    }
    BussinesYear.prototype.fetchCars = function () { };
    BussinesYear.prototype.fetchPeriods = function () { };
    BussinesYear.prototype.convertFreeToBusy = function () { };
    BussinesYear.prototype.getAllBusyTimestamps = function () { };
    BussinesYear.prototype.BookingCar = function () { };
    return BussinesYear;
}());
exports.BussinesYear = BussinesYear;

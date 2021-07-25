"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module BussinesDay.spec.ts
*/
var addHours_1 = __importDefault(require("date-fns/addHours"));
var eachMinuteOfInterval_1 = __importDefault(require("date-fns/eachMinuteOfInterval"));
var BussinesDay_1 = require("../BussinesDay");
//-------------------------------------------------------------------------------------------------
describe('BussinesDay shold pass all tests', function () {
    var time = new Date(2021, 6, 24, 15, 30);
    var roundTime = new Date(2021, 6, 24, 0, 0);
    var car = {
        id: 0,
        model: "13",
    };
    var day = new BussinesDay_1.BussinesDay(time);
    var slots = eachMinuteOfInterval_1.default({ start: roundTime, end: addHours_1.default(roundTime, 24) }, { step: 15 });
    // -----------------------------------------------------------------------------------------	
    test('Constructor should: round timestamp and create 96 slots', function () {
        expect(day.getTimestamp()).toEqual(roundTime);
        slots.forEach(function (item) {
            expect(day.getTimeSlot(item)).toBeDefined();
        });
    });
    // -------------------------------------------------------------------------------------------
    test('Booking car should put car in timeslot', function () {
        expect(day.bookingCar(car, time)).toBe(true);
        expect(day.carIsBusy(car)).toBe(true);
    });
});

"use strict";
/**
 * @module BussinesTimeSlot.spec.ts
*/
Object.defineProperty(exports, "__esModule", { value: true });
var BussinesTimeSlot_1 = require("../BussinesTimeSlot");
describe('Name of the group', function () {
    var date = new Date(Date.now());
    var slot = new BussinesTimeSlot_1.BussinesTimeSlot(date);
    var car = { id: 0, model: 'test' };
    test('constructor should save timestamp', function () {
        expect(slot.getTimestamp()).toEqual(date);
    });
    test('property carInBook should be clear', function () {
        expect(slot.getCarInBook().length).toBe(0);
    });
    test('release car should retun false, becouse carInBook is empty', function () {
        expect(slot.releaseCar(car)).toBe(false);
    });
    test('booking car should return true', function () {
        expect(slot.bookingCar(car)).toBe(true);
    });
    test('property carInBook should not be clear', function () {
        expect(slot.getCarInBook().length).toBeGreaterThan(0);
    });
    test('release car should return true, becouse carInBook is not empty', function () {
        expect(slot.releaseCar(car)).toBe(true);
    });
});

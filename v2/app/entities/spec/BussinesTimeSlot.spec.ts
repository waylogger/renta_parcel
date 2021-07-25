
/**
 * @module BussinesTimeSlot.spec.ts
*/


import { BussinesTimeSlot } from '../BussinesTimeSlot';
import { Car } from '../Car';





describe('Name of the group', () => {

	let date: Date = new Date(Date.now());
	const slot: BussinesTimeSlot = new BussinesTimeSlot(date);
	const car: Car = { id: 0, model: 'test' };
	test('constructor should save timestamp', () => {
		expect(slot.getTimestamp()).toEqual(date);
	});

	test('property carInBook should be clear', () => {
		expect(slot.getCarInBook().length).toBe(0);
	})

	test('release car should retun false, becouse carInBook is empty', () => {
		expect(slot.releaseCar(car)).toBe(false);
	})

	test('booking car should return true', () => {
		expect(slot.bookingCar(car)).toBe(true);
	})


	test('property carInBook should not be clear', () => {
		expect(slot.getCarInBook().length).toBeGreaterThan(0);
	})

	test('release car should return true, becouse carInBook is not empty', () => {
		expect(slot.releaseCar(car)).toBe(true);
	})

});
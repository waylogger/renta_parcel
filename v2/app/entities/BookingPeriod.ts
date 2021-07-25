

/**
 * @module BookingPeriod.ts
*/
import { Car } from "./Car";


/**
 * @description способ хранения периодов времени полученных от сервера
*/
export interface BookingPeriod{
	begin: Date;
	end: Date;
	car: Car;
}

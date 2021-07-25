/**
 * @module BussinesTimeSlot.ts
*/
import {Car} from './Car'



/**
 * @public
 * @remarks  класс содержит операции и данные для одной временной ячейки внутри временной линии
*/
export class BussinesTimeSlot {
	/**
	 * @remarks штамп времени, присваиваемый временному слоту
	*/
	private timestamp: Date;
	/**
	 * @remarks массив автомобилей, которые в это время заняты
	*/
	private carsInBook: Array<Car>;
	//----------------------------------------------------------------------
	public constructor(timestamp: Date) {
		this.timestamp = timestamp;
		this.carsInBook = [];
	}

	/**
	 *@remarks функция возвращает штамп времени текущего слота 
	*/
	public getTimestamp(): Date {
		return this.timestamp;
	}
	/**
	 * @remarks функция возвращает массив машин, забранированных в этом слоте
	*/
	public getCarInBook(): Array<Car> {
		return this.carsInBook;
	}
	/**
	 * @remarks функция помещает авто в список забронированных
	*/
	public bookingCar(car: Car): Boolean {
		if (this.carsInBook.push(car))
			return true;
		return false;
	}
	/**
	 * @remark функция извлекает авто из списка забронированных
	*/

	public releaseCar(car: Car): Boolean {
		const carInx = this.carsInBook.findIndex((item): Boolean => {
			return item.id === car.id;
		});
		if (carInx < 0) return false;

		return this.carsInBook.splice(carInx).length > 0 ? true : false;
	}
}


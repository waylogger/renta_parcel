/**
 * @module BussinesYear.ts;
 * 
*/
import { BookingPeriod } from "./BookingPeriod";
import { BussinesDay } from "./BussinesDay";
import { Car } from "./Car";



/**
 * @description ключевой класс для работы формы бронирования, его основной смысл получить из базы данных сведения о машинах и свободных периодов, а затем создать массив дней, где каждому занятому timeSlost будет задан списоок машин, занятых в это время
 * 
 * Также этот класс должен давать возможность получить полный список  забронированных timestamp, так и отфильтрованный список по car_id
 * 
 * Кроме того, класс должен давать возможность осуществлять бронирование авто
*/
export class BussinesYear {

	private bussinesDays: BussinesDay[];
	private BookingPeriods: BookingPeriod[];
	private FreePeriods: BookingPeriod[];

	/**
	 * @param firstDay параметр определяющий точку отсчета внутри года и до его конца с округлением времени. То есть конструкция вида:
	 * ```
	 * 	new BussinesYear(new Date(2021,06,21,15,30,55));
	 * ```
	 * приводит к формированию периода с 21.06.2021 00:00:00 до 01.01.2022 00:00:00
	 * */ 
	constructor(firstDay: Date){
		this.bussinesDays = [];
		this.BookingPeriods = [];
		this.FreePeriods = [];
	}

	private fetchCars(): void {}
	private fetchPeriods(): void {}
	private convertFreeToBusy():void {}
	public getAllBusyTimestamps():void{}
	public BookingCar():void{}
	/**
	 * constructor from db
	 * booking car
	 * get all busy days
	*/
}
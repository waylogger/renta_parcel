/**
 * @module state.ts
*/
import 'regenerator-runtime/runtime';
import { CarListResponse, FreePeriodResponse, PlacesResponse, SingleCar, SinglePeriod } from "../CORS/entities/apiExchange/serverTypes"
import { getCarList, getPlaceList, getCarPeriodList } from "../CORS/querySender";
import { SingleCarWithPeriods } from '../entities/carPeriods';
import { formatCarModelFromBaseToSelect, formatCarModelFromHashToSelect, dateForServer, currentYearForServer, nextYearForServer} from '../shared/sharedActions';
import eachMinuteOfInterval from 'date-fns/eachMinuteOfInterval';
import _ from 'lodash'
import { PeriodsRequest } from '../CORS/entities/apiExchange/clientTypes';
import { isThisSecond } from 'date-fns';




const defultCarListResponse: CarListResponse = { result_code: 0, cars: [] };
const defaultPlacesResponse: PlacesResponse = { result_code: 0, places: [] }


// const convertFreePeriodsToBusyPeriods = function (singleCarWithFreePeriods: SingleCarWithPeriods): SingleCarWithPeriods {


// 	console.log(Object.values(singleCarWithFreePeriods.car_periods));
// }


export class State {

	/**
	 * @description адреса места для выдачи и возврата арендованных авто
	*/
	private placesForReceiveAndReturnCars: PlacesResponse = { result_code: 0, places: [] };
	/**
	 * @description все авто, доступные для бронирования у заказчика
	*/
	private allCarsForRent: CarListResponse = defultCarListResponse;
	/**
	 * @description все авто одной модели, которая бронируется в настоящее время
	*/
	private allCarsForCurrentBooking: SingleCar[] = [];
	/**
	 * @description телефон арендатора
	*/
	private customersPhone: string | undefined = '';
	/**
	 * @description телефон имя арендатора
	*/
	private customersName: string | undefined = '';
	/**
	 * массив данных, который содержит данные о периодах брони в отношении allCarsForCurrentBooking
	*/
	private busyPeriodsForCurrentBookingCar: SingleCarWithPeriods[] = [];
	/**
	 * @description массив данных, который содержит исходные значения периодов для текущих машин
	*/
	private freePeriodsForCurrentBookingCar: SingleCarWithPeriods[] = [];

	/**
	 * @description массив данных, который содержит исходные значения периодов для всех машин
	*/
	private freePeriodsForAllBookingCar: SingleCarWithPeriods[] = [];
	/**
	 * Массив дней, которые полностью недоступны для брони всех allCarsForCurrentBooking
	*/
	private fulldaysNotAvaivableForBooking: Date[] = [];
	/**
	 * Массив дней, которые частично недоступны для брони всех allCarsForCurrentBooking - ключи, значения - это массив недоступных отрезков по 15 мину
	*/
	private partedDayNotAvaiableForBooking: Date[][] = [];

	/**
	 * @description сервер принимет дату в виде "2021-11-01 10:00Z", поэтому timestamp требуется постоянно переводить в этот формат, для чего служит эта функция
	*/
	private reformatDate(dt: Date): string {
		return `${dt.toLocaleDateString().split('.').reverse().join('-')} ${dt.toLocaleTimeString()}Z`;
	}

	private async fetchFreePeriodsForAllCars(): Promise<void> {

		const carsIdOfAllCars: number[] = [];
		const promisesForFetctFreePeriodsDate: Promise<FreePeriodResponse>[] = [];
		this.allCarsForRent.cars.forEach((car)=>{carsIdOfAllCars.push(car.car_id)});
	
		const beginDateForAllCars = currentYearForServer();
		const endDateForAllCars = nextYearForServer();
		
		carsIdOfAllCars.forEach(
			(id) => {
				const requestForFreePeriods: PeriodsRequest = {
					car_id: id,
					begin: beginDateForAllCars,
					end: endDateForAllCars,
					include_idles: true,
					include_reserves: true
				}
				promisesForFetctFreePeriodsDate.push(
					getCarPeriodList(requestForFreePeriods)
				);
			}
		)

		const resultOfFetchFreePeriods = await Promise.all(promisesForFetctFreePeriodsDate);
		resultOfFetchFreePeriods.forEach(
			(res,inx) => {
				this.freePeriodsForAllBookingCar.push({...this.allCarsForRent.cars[inx], car_periods: res.car_periods })
			}
		);
		this.freePeriodsForCurrentBookingCar = this.freePeriodsForAllBookingCar.filter(
			(carPeriodItem: SingleCarWithPeriods) => {
				return this.allCarsForCurrentBooking.find((item: SingleCar,inx:number) => item.car_id === carPeriodItem.car_id)  ? true : false;
			}
		);
	}


	constructor() { }

	/**
	 * @description инициализация данных через асинхронные запросы
	*/
	public async init(): Promise<State> {
		// --------------------------------------------------
		// список мест
		const places: PlacesResponse = await getPlaceList();
		places.places.splice(0, 3);//смысл убрать первые 3 элемента в том, что об этот попросил заказчик
		this.placesForReceiveAndReturnCars = places;
		//список машин
		// --------------------------------------------------
		this.allCarsForRent = await getCarList();
		const carNameFromHash = location.hash.replace('#', '');
		this.selectCar(formatCarModelFromHashToSelect(carNameFromHash));
		//периоды свободы и занятости авто
		await this.fetchFreePeriodsForAllCars();

		// convertFreePeriodsToBusyPeriods
		return this;
	}


	public getPlacesForReceiveAndReturnCars(): PlacesResponse {
		const places = this.placesForReceiveAndReturnCars;
		return { result_code: places.result_code, places: places.places };
	}

	public saveCustomersPhone(num: string | undefined): void {
		this.customersPhone = num;
	}

	public getCustomersPhone(): String | undefined {
		return new String(this.customersPhone).toString();
	}

	public saveCustomersName(name: string | undefined): void {
		this.customersName = name;

	}

	public getCustomersName(): String | undefined {
		return new String(this.customersName).toString();

	}

	public getAllCarsForRent(): CarListResponse {
		const res = this.allCarsForRent;
		return { result_code: res.result_code, cars: res.cars };

	}

	public async selectCar(nameOfCarFromCarSelectOrHash: string | undefined): Promise<void> {
		if (!nameOfCarFromCarSelectOrHash)
			throw new Error('State::selectCar: badArg');
		//localdata			
		const carModelNamesForCompare: string[] = [];
		//step0 преобразуем имена для сравнения
		this.getAllCarsForRent().cars.forEach(
			(car) => { carModelNamesForCompare.push(formatCarModelFromBaseToSelect(car.model)) }
		);

		//step1 фильтруем массив по совпадению с select
		this.allCarsForCurrentBooking = this.allCarsForRent.cars.filter(
			(_, inx) => {
				return carModelNamesForCompare[inx] === nameOfCarFromCarSelectOrHash
			}
		);
	}


	public isDateBusy(dt: Date): Boolean {
		// if ( isPast(dt) ) return true;

		// if (this.fullbusyDates.find(
		// 	(d) => isSameDay(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0), d))) {

		// 	return true;
		// }
		// return false;
		return false;

	}

}
export const BookingState = () => (new State()).init();
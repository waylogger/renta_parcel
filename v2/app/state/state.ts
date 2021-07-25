/**
 * @module state.ts
*/
import 'regenerator-runtime/runtime';
import { CarListResponse, PlacesResponse, SingleCar } from "../CORS/entities/apiExchange/serverTypes"
import { getCarList, getPlaceList } from "../CORS/querySender";
import { Car } from '../entities/Car';
import { formatCarModel } from '../shared/sharedActions';

export class State {

	private places: PlacesResponse = {result_code: 0, places:[]};
	private cars: CarListResponse = {result_code: 0, cars:[]};
	private selectedCar: SingleCar[] = [];
	private customersPhone: string | undefined = '';
	private customersName: string | undefined = '';
	constructor() {}

	public async init(): Promise<State> {
		const places: PlacesResponse = await getPlaceList();
		places.places.splice(0,3);
		this.places = places;

		const cars: CarListResponse = await getCarList();
		this.cars = cars;
		return this;
	}


	public getPlaces(): PlacesResponse {
		const places = this.places;
		return {result_code: places.result_code,places: places.places};
	}

	public savePhone(num: string | undefined): void {
		this.customersPhone = num;
	}

	public getPhone(): String | undefined {
		return new String(this.customersPhone);
	}

	public saveName(name: any): void{
		this.customersName = name;
		
	}
		
	public getName(): String | undefined {
		return new String(this.customersName);
	}

	public getCars(): CarListResponse {
		const res = this.cars;
		return {result_code: res.result_code, cars: res.cars};
		
	}

	public selectCar(carStr: string): void {
		const res = this.cars.cars.filter(
			(car) => {
				return formatCarModel(car.model).trim().replace(/\s/g,'_').toLowerCase() === carStr
			}
		)
		this.selectedCar = res;
	}

	public getSelectedCars(): SingleCar[] {
		const a: SingleCar[] = [...this.selectedCar];
		return a;
	}
}
export const BookingState = () => (new State()).init();
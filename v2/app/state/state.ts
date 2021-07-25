/**
 * @module state.ts
*/
import 'regenerator-runtime/runtime';
import { PlacesResponse } from "../CORS/entities/apiExchange/serverTypes"
import { getPlaceList } from "../CORS/querySender";

export class State {

	private places: PlacesResponse = {result_code: 0, places:[]};
	constructor() {}

	public async init(): Promise<State> {
		const places: PlacesResponse = await getPlaceList();
		places.places.splice(0,3);
		this.places = places;
		return this;
	}


	public getPlaces(): PlacesResponse {
		const places = this.places;
		return {result_code: places.result_code,places: places.places};
	}
		
}
export const BookingState = () => (new State()).init();
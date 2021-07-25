/**
 * @module placeSelect.ts
 * @description генерирует разметку для выбора места получения и возврата авто
*/

import { PlacesResponse } from "../CORS/entities/apiExchange/serverTypes";
import { option } from "../shared/sharedActions";

export function placeOptions (places:PlacesResponse): string {
	let resStr: string = '';
	places.places.forEach(
		(place) => resStr += option(`${place.title} + ${place.delivery_cost} ₽`)
	);	
	return resStr;
}







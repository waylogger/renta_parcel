/**
 * @module placeSelect.ts
 * @description генерирует разметку для выбора места получения и возврата авто
*/

import { PlacesResponse } from "../CORS/entities/apiExchange/serverTypes";
import { option } from "../shared/sharedActions";
import * as shared from '../shared/sharedData';
import $ from 'jquery'
import {State} from '../state/state';

export function placeOptions (state:State): string {
	let resStr: string = '';
	state.getPlaces().places.forEach(
		(place) => resStr += option(`${place.title} + ${place.delivery_cost} ₽`)
	);	
	$(`#${shared.domElementId.returnPlaceSelectId}`).html(resStr);
	$(`#${shared.domElementId.receivePlaceSelectId}`).html(resStr);
	return resStr;
}

export const selectPlace = (state: State): void => {
	$(`#${shared.domElementId.receivePlaceSelectId}`).on(
		'change',
		() => {
			const txt: any = $(`#${shared.domElementId.receivePlaceSelectId}`).val();

			
		}
	);
}







/**
 * @module bitText.ts
*/


import $ from 'jquery';
import { State } from '../state/state';
import * as shared from '../shared/sharedData';
import { translateDate } from '../shared/sharedActions';
import { BidCostRequest } from '../CORS/entities/apiExchange/clientTypes';
import { BidCostResponse, PlacesResponse, SingleCar, SinglePlace } from '../CORS/entities/apiExchange/serverTypes';
import { getCost } from '../CORS/querySender';


export async function bidPreview(state: State): Promise<void> {
	let resStr: string = '';
	const carModel: string | undefined = $(`#${shared.domElementId.carSelectId}`).val()?.toString();
	const leftDate: string | undefined = $(`#${shared.domElementId.receiveDataId}`).val()?.toString();
	const leftTime: string | undefined = $(`#${shared.domElementId.selectReceiveTimeId}`).val()?.toString();
	const leftPlace: string | undefined = $(`#${shared.domElementId.receivePlaceSelectId}`).val()?.toString();
	const rightDate: string | undefined = $(`#${shared.domElementId.returnDataId}`).val()?.toString();
	const rightTime: string | undefined = $(`#${shared.domElementId.selectReturnTimeId}`).val()?.toString();
	const rightPlace: string | undefined = $(`#${shared.domElementId.returnPlaceSelectId}`).val()?.toString();


	if (carModel) {
		resStr += `<span id="${shared.domElementId.carNameId}">Аренда: ${carModel}</span>`;
	}

	if (leftDate && leftTime && rightDate && rightDate) {
		const d1: string = `${leftDate.split('.').reverse().join('-')} ${leftTime}Z`;
		const d2: string = `${rightDate.split('.').reverse().join('-')} ${rightTime}Z`;

		const placeBegin: SinglePlace = state.getPlacesForReceiveAndReturnCars().places.filter(a => a.title === leftPlace?.split(' + ')[0])[0];
		const placeEnd: SinglePlace = state.getPlacesForReceiveAndReturnCars().places.filter(a => a.title === rightPlace?.split(' + ')[0])[0];

		resStr += `<span id="${shared.domElementId.periodRentId}"> на ${translateDate(new Date(d1), new Date(d2), leftTime, rightTime)}</span>`;

		const bidRequest: BidCostRequest = {
			car_id: 9,//state.getSelectedCars()[0].car_id,
			begin: d1,
			end: d2,
			begin_place_id: placeBegin.place_id,
			end_place_id: placeEnd.place_id,
			services: [],
		}

		const bidCost: BidCostResponse = await getCost(bidRequest);
		const cost: number = bidCost.cost;
		const deposit: number = bidCost.deposit;

		const deliveryCost = placeEnd.delivery_cost + placeBegin.delivery_cost;

		if (deliveryCost > 0)
			resStr += `<span id="${shared.domElementId.bidCostId}"> cтоимость аренды ${cost - deliveryCost} ₽ + доставка авто ${deliveryCost} ₽`
		else
			resStr += `<span id="${shared.domElementId.bidCostId}"> cтоимость аренды ${cost} ₽`

		resStr += ` + залог ${deposit} ₽ (возвращаем полностью по окончанию аренды).</span><br>`;

		resStr += `<span id="${shared.domElementId.costResolutionId}">Итого: ${cost + deposit} ₽</span>`;

	}

	$(`#${shared.domElementId.bidTextId}`).html(resStr);
}

export function onPreview(state: State): void {

	const onChangeList: string[] = [
		`${shared.domElementId.carSelectId}`,
		`${shared.domElementId.selectReceiveTimeId}`,
		`${shared.domElementId.selectReturnTimeId}`,
		`${shared.domElementId.receivePlaceSelectId}`,
		`${shared.domElementId.returnPlaceSelectId}`,
	];

	const onFocusList: string[] = [
		`${shared.domElementId.receiveDataId}`,
		`${shared.domElementId.returnDataId}`,
	]
	onChangeList.forEach((id: string) => {
		$(`#${id}`).on('change', () => {
			bidPreview(state);
		});
	});
	onFocusList.forEach((id: string) => {
		$(`#${id}`).on('change', () => {
			bidPreview(state);
		});
	});
}


/**
 * 	<span id="carName"></span>
	<span id="periodRent"></span>
	<br>
	<span id="bidCost"></span>
	<span id="deposit"></span>
	<br>
	<span id="resolution"></span>
*/



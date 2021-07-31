import { State } from "../state/state";
import * as shared from '../shared/sharedData'
import { BidCostResponse, BidCreateResponse, SinglePlace } from "../CORS/entities/apiExchange/serverTypes";
import { BidCreateRequest } from "../CORS/entities/apiExchange/clientTypes";
import $ from 'jquery'
import { sendRequest } from "../CORS/querySender";

export async function createBid(state: State) {

	let resStr: string = '';
	const leftDate: string | undefined = $(`#${shared.domElementId.receiveDataId}`).val()?.toString();
	const leftTime: string | undefined = $(`#${shared.domElementId.selectReceiveTimeId}`).val()?.toString();
	const leftPlace: string | undefined = $(`#${shared.domElementId.receivePlaceSelectId}`).val()?.toString();
	const rightDate: string | undefined = $(`#${shared.domElementId.returnDataId}`).val()?.toString();
	const rightTime: string | undefined = $(`#${shared.domElementId.selectReturnTimeId}`).val()?.toString();
	const rightPlace: string | undefined = $(`#${shared.domElementId.returnPlaceSelectId}`).val()?.toString();
	const fio: string | undefined = $(`#${shared.domElementId.custonersNameId}`).val()?.toString();
	const phone: string | undefined = $(`#${shared.domElementId.customersPhoneId}`).val()?.toString();

	const ageAgree: boolean = $(`#${shared.domElementId.ageAgree}`).is(':checked');
	const policyAgree: boolean = $(`#${shared.domElementId.policyAgree}`).is(':checked');

	const placeBegin: SinglePlace = state.getPlacesForReceiveAndReturnCars().places.filter(a => a.title === leftPlace?.split(' + ')[0])[0];
	const placeEnd: SinglePlace = state.getPlacesForReceiveAndReturnCars().places.filter(a => a.title === rightPlace?.split(' + ')[0])[0];

	let otherReceivePlace: string | undefined = $(`#${shared.domElementId.receiveCustomPlaceInputId}`).val()?.toString();
	let otherReturnPlace: string | undefined = $(`#${shared.domElementId.returnCustomPlaceInputId}`).val()?.toString();

	if (leftDate && leftTime && rightTime && rightDate && fio && phone && policyAgree && ageAgree && placeBegin && placeEnd) {
		let fileArr: File | string = '';



		if (placeBegin.place_id === 179 && otherReceivePlace === '' || placeEnd.place_id === 179 && otherReturnPlace === '' ) return;
		else if (placeBegin.place_id === 179 && otherReceivePlace != '' && placeEnd.place_id === 179 && otherReturnPlace != '') {
			if (otherReturnPlace && otherReceivePlace)
			fileArr = new File([otherReceivePlace,otherReturnPlace], 'получение-возврат');
		}

		let d1: string = `${leftDate.split('.').reverse().join('-')} ${leftTime}Z`;
		let d2: string = `${rightDate.split('.').reverse().join('-')} ${rightTime}Z`;

		const bidRequest: BidCreateRequest = {
			car_id: state.getMainCar(),
			begin: d1,
			end: d2,
			fio: fio,
			phone: phone,
			begin_place_id: placeBegin.place_id,
			end_place_id: placeEnd.place_id,
			file:fileArr,
		}

		const form = new FormData();
		const keys = Object.keys(bidRequest);
		const vals = Object.values(bidRequest);

		keys.forEach(
			(key,inx) => {
				form.append(key,vals[inx]);
			}
		);
		const bid: BidCreateResponse = await sendRequest(form);
		if (bid.error_message == null){
			$(`#${shared.domElementId.formInputId}`).html('');
			$(`#${shared.domElementId.bookSelectDivId}`).html('');
			$(`#${shared.domElementId.bidTextId}`).addClass(shared.domElementId.bigBidTextClass);
			return;
		}

	}

}


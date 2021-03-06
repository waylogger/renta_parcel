import { State } from "../state/state";
import * as shared from '../shared/sharedData'
import { BidCostResponse, BidCreateResponse, SinglePlace } from "../CORS/entities/apiExchange/serverTypes";
import { BidCreateRequest } from "../CORS/entities/apiExchange/clientTypes";
import $ from 'jquery'
import { sendRequest } from "../CORS/querySender";
import { validateChecker, validateField } from "../shared/sharedActions";
import _ from "lodash";



function validateForm(): boolean {
	const validateArr: boolean[] = [];
	validateArr.push(validateChecker(shared.domElementId.ageAgree, shared.domElementId.proofOfAgeId));
	validateArr.push(validateChecker(shared.domElementId.policyAgree, shared.domElementId.proofOfPolicyId));
	validateArr.push(validateField(shared.domElementId.receiveDataId, shared.domElementId.receiveDateTextId));
	validateArr.push(validateField(shared.domElementId.returnDataId, shared.domElementId.returnDateTextId));
	validateArr.push(validateField(shared.domElementId.customersPhoneId, shared.domElementId.customersPhoneTextId));
	validateArr.push(validateField(shared.domElementId.custonersNameId, shared.domElementId.customersNameTextId));
	return validateArr.indexOf(false) >= 0 ? false : true;
}


export async function createBid(state: State) {

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

	///???????????? ??????????
	let customPlace: boolean = true;
	if (placeBegin.place_id === 179) {
		customPlace = validateField(shared.domElementId.receiveCustomPlaceInputId, shared.domElementId.receiveCustomTextId) ? true : false;
	}

	if (placeEnd.place_id === 179) {
		customPlace = validateField(shared.domElementId.returnCustomPlaceInputId, shared.domElementId.returnCustomTextId) ? true : false;
	}

	if (!validateForm()) return;
	if (!customPlace) return;

	if (leftDate && leftTime && rightTime && rightDate && fio && phone && policyAgree && ageAgree && placeBegin && placeEnd) {
		let fileArr: File | string = '';

		if (placeBegin.place_id === 179 && otherReceivePlace === '' || placeEnd.place_id === 179 && otherReturnPlace === '') return;
		else if (placeBegin.place_id === 179 && otherReceivePlace != '' || placeEnd.place_id === 179 && otherReturnPlace != '') {
			const fArr: string[] = [];
			if (otherReturnPlace) fArr.push(otherReturnPlace)
			if (otherReceivePlace) fArr.push(otherReceivePlace)
			fileArr = new File(fArr, '??????????????????-??????????????');
		}

		
		let d1: string = `${leftDate.split('.').reverse().join('-')} ${leftTime}`;
		let d2: string = `${rightDate.split('.').reverse().join('-')} ${rightTime}`;

		const bidRequest: BidCreateRequest = {
			car_id: state.getMainCar(),
			begin: d1,
			end: d2,
			fio: fio,
			phone: phone,
			begin_place_id: placeBegin.place_id,
			end_place_id: placeEnd.place_id,
			file: fileArr,
		}

		const form = new FormData();
		const keys = Object.keys(bidRequest);
		const vals = Object.values(bidRequest);


		keys.forEach(
			(key, inx) => {
				form.append(key, vals[inx]);
			}
		);

		$(`#${shared.domElementId.bookButtonId}`).attr('disabled','disabled');
		const bid: BidCreateResponse = await sendRequest(form);

		// const bid: BidCreateResponse = { bid_id: 2, bid_number: 1, error_message: null }
		// $(`#${shared.domElementId.bookButtonId}`).attr('disabled',null);
			
		if (bid.error_message == null) {

			const thankStr = `<div class="thankyou__book">???????? ???????????? ???? ???????????????????????? ${$(`#${shared.domElementId.carNameId}`).html().split(':')[1]} ${$(`#${shared.domElementId.periodRentId}`).html()} ??????????????. <br><br>???????? ?????? ???????????? ???????????????????????? ?? ????????, ???????????????????? ?????????????????? ?????????????????? (?????????????? ?? ???????????????????????? ??????????????????????????) ???? <a href="https://wa.me/+79915151515" target="_blank">WhatsApp ???? ?????????? +7 (991) 515-15-15</a><br> </div><a href="https://wa.me/+79915151515" target="_blank"><div class="book__btn" style="display: flex;
justify-content: center;
align-items: center;text-decoration: none;">?????????????????? ??????????????????</div></a>`

			$(`#${shared.domElementId.formInputId}`).html(thankStr);
			$(`#${shared.domElementId.bookSelectDivId}`).html('');
			$(`#${shared.domElementId.bidTextId}`).addClass(shared.domElementId.bigBidTextClass);
			return;
		}
		const thankStr = `<div class="thankyou__book" style="color: red;">???????? ???????????? ???? ???????????????????????? ${$(`#${shared.domElementId.carNameId}`).html().split(':')[1]} ${$(`#${shared.domElementId.periodRentId}`).html()} ???? ??????????????. ????????????????????, ???????????????????? ??????????????.`

		$(`#${shared.domElementId.formInputId}`).html(thankStr);
		$(`#${shared.domElementId.bookSelectDivId}`).html('');
		$(`#${shared.domElementId.bidTextId}`).addClass(shared.domElementId.bigBidTextClass);
		return;



	}
}


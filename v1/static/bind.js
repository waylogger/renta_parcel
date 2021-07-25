import 'regenerator-runtime/runtime'
import $ from 'jquery';
import { bookCar, transferReceiveTime, transferReturnTime, datePreview, lawAgreementHandlerAgeExpr, lawAgreementHandlerAgreePolicy, receivePlaceHandle, costPreview, showCustomReceivePlaceInput, returnPlaceHandle, showCustomReturnPlaceInput, carPreview, inputHandler, phoneAdditional, checkingReceiveTime, checkingReturnTime, getFreeReceiveTime, offReceiveTime, offReturnTime, saveReceiveTime } from './handlers'
import { whenDataLoad } from './loadData';
import { customerName, customerPhone, proofOfAgeAndExperience, agreementWithPolicy } from './namespaces';
import { validationName, validationPhone } from './validators';

export async function binding() {
	$.when($.ready).then(
		() => {
			$('#bookButtonId').bind('click', bookCar);
			$(`#${customerPhone.id}`).bind('change', inputHandler(customerPhone, validationPhone));
			$(`#${customerPhone.id}`).bind('focusin', phoneAdditional);
			$(`#${customerName.id}`).bind('change', inputHandler(customerName, validationName));
			$(`#${proofOfAgeAndExperience.id}`).bind('click', lawAgreementHandlerAgeExpr());
			$(`#${agreementWithPolicy.id}`).bind('click', lawAgreementHandlerAgreePolicy());
			$(`#receivePlaceSelect`).bind('change', receivePlaceHandle);
			$(`#receivePlaceSelect`).bind('change', costPreview);
			$(`#receivePlaceSelect`).bind('change', showCustomReceivePlaceInput);
			$(`#returnPlaceSelect`).bind('change', returnPlaceHandle);
			$(`#returnPlaceSelect`).bind('change', costPreview);
			$(`#returnPlaceSelect`).bind('change', showCustomReturnPlaceInput);

			$('#dateListener').click(carPreview);
			$('#leftDate').on('focusin', datePreview);
			$('#leftDate').on('focusout', datePreview);
			$('#rightDate').on('focusin', costPreview);
			$('#rightDate').on('focusout', costPreview);
			$(`#selectReturnDate`).on('click',offReturnTime);
			$(`#selectReceiveDate`).on('click',saveReceiveTime);
		}
	);
}
